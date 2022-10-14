import React, { useEffect, useState, useRef, useMemo } from 'react'
import { reviewContent } from '../../../../dummy/review'
import StarScore from './StarScore'
import Content from './Content'
import AddPicture from './AddPicture'
import Button from '../../../common/Button'
import { useAddProductReviewMutation } from '../../../../store/api/reviewApiSlice'

const index = () => {
  const [count, setCount] = useState(0)
  const [userValue, setUserValue] = useState({
    title: null,
    images: [],
    id: null,
    content: null,
    product: null,
    member: null,
    star: 0,
    createdDate: null,
  })
  const FileRef = useRef()
  const [imageFile, setImageFile] = useState([])
  const [addProductReview] = useAddProductReviewMutation()
  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setUserValue({
      ...userValue,
      [name]: value,
    })
    name === 'content' && setCount(value.length)
  }
  const uploadedImage = useRef(null)
  const imageUploader = useRef(null)

  // const handleImageUpload = (e) => {
  //   const [file] = e.target.files
  //   if (file) {
  //     const reader = new FileReader()
  //     const { current } = uploadedImage
  //     current.file = file
  //     reader.onload = (e) => {
  //       current.src = e.target.result
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }
  const handleImageUpload = (e) => {
    const fileList = e.target.files

    console.log(imageFile.length)
    if (imageFile.length > 1) {
      let currentImages = imageFile.slice(1, 2)
      setImageFile([
        ...currentImages,
        URL.createObjectURL(fileList[fileList.length - 1]),
      ])
      let currentFiles = userValue.images.slice(1, 2)
      setUserValue({
        ...userValue,
        images: [...currentFiles, fileList[fileList.length - 1]],
      })
    } else {
      setImageFile([
        ...imageFile,
        URL.createObjectURL(fileList[fileList.length - 1]),
      ])
      setUserValue({
        ...userValue,
        images: [...userValue.images, fileList[fileList.length - 1]],
      })
    }
  }
  const AddReviewHandler = () => {
    setUserValue({
      ...userValue,
      createdDate: new Date(),
    })

    const formData = new FormData()
    for (const key in userValue) {
      if (Array.isArray(userValue[key])) {
        formData.append(
          key,
          new Blob([JSON.stringify(userValue[key])], {
            type: 'application/json',
          }),
        )
      } else {
        formData.append(key, userValue[key])
      }
    }
    addProductReview(formData)
  }
  const removeThumbnail = (idx) => {
    imageFile.length === 1
      ? setImageFile([])
      : setImageFile(imageFile.splice(idx, 1))
  }
  const showImage = useMemo(() => {
    return (
      <>
        {imageFile?.map((item, idx) => (
          <div className="relative flex gap-2" key={idx}>
            <div
              className="relative w-[86px] h-[86px] bg-cover rounded overflow-hidden shawdow-md"
              style={{
                backgroundImage: `url(${imageFile[idx]})`,
              }}
              onClick={() => removeThumbnail(idx)}
            ></div>
            <div className="absolute -right-2 -top-2">
              <CloseIcon
                fill="#000"
                size="8"
                className="bg-black-200 p-1 rounded-full"
              />
            </div>
          </div>
        ))}
      </>
    )
  })

  useEffect(() => {
    console.log(userValue)
  }, [userValue])

  const reviewData = reviewContent

  return (
    <div className="px-5 mt-[38px]">
      <ul>
        {reviewData.map((review, index) => (
          <li
            className="flex items-center pb-5 border-b border-black-200"
            key={index}
          >
            <div
              className="w-[4.125rem] h-[4.125rem] bg-no-repeat bg-[length:100%_auto] rounded overflow-hidden mr-3"
              style={{ backgroundImage: `url(${review.brand_img_url})` }}
            ></div>
            <ul className="grow">
              <li className="text-xs flex flex-col justify-center gap-2">
                <p className="font-bold">{review.brand}</p>
                <p>{review.product_name}</p>
                <p className="text-black-600">옵션: {review.product_option}</p>
              </li>
            </ul>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center justify-center py-[1.875rem] mb-[1.875rem] border-b border-black-200 gap-4">
        <p>상품에 대한 별점을 매겨주세요</p>
        <StarScore userValue={userValue} setUserValue={setUserValue} />
      </div>
      <AddPicture
        uploadThumbnail={uploadThumbnail}
        showImage={showImage}
        ref={FileRef}
        count={imageFile.length === 0 ? 0 : imageFile.length}
      />
      <Content count={count} onChangeHandler={onChangeHandler} />
      <Button
        classprop="text-sm mt-9 mb-5 bg-primary text-white"
        onClick={AddReviewHandler}
      >
        등록하기
      </Button>
    </div>
  )
}

export default index

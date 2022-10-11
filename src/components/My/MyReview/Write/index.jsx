import React, { useEffect, useState, useRef } from 'react'
import { reviewContent } from '../../../../dummy/review'
import StarScore from './StarScore'
import Content from './Content'
import AddPicture from './AddPicture'
import Button from '../../../common/Button'
const index = () => {
  const [count, setCount] = useState(0)
  const [userValue, setUserValue] = useState({
    title: '',
    content: '',
    thumbnailBase64: '',
  })
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

  const handleImageUpload = (e) => {
    const [file] = e.target.files
    if (file) {
      const reader = new FileReader()
      const { current } = uploadedImage
      current.file = file
      reader.onload = (e) => {
        current.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  useEffect(() => {
    console.log(userValue)
  }, [userValue])

  const reviewData = reviewContent
  return (
    <div className="px-5">
      <ul>
        {reviewData.map((review, index) => (
          <li
            className="flex items-center py-5 border-b border-black-200"
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
        <StarScore />
      </div>
      <AddPicture
        handleImageUpload={handleImageUpload}
        uploadedImage={uploadedImage}
        imageUploader={imageUploader}
      />
      <Content count={count} onChangeHandler={onChangeHandler} />
      <Button classprop="text-sm mt-9 mb-5 bg-primary text-white">
        등록하기
      </Button>
    </div>
  )
}

export default index

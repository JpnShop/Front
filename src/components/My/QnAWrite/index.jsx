import React, { useState, useMemo, useRef, useEffect } from 'react'
import { types } from '../../../utils/questions'
import Type from './Type'
import Content from './Content'
import AddPicture from './AddPicture'
import QnABtn from './QnABtn'
import Modal from '../../common/Modal'
import CloseIcon from '../../common/CloseIcon'
import useModalControl from '../../../hook/useModalControl'
import { useAddQuestionMutation } from '../../../store/api/questionSlice'
import { Outlet } from 'react-router-dom'

const index = () => {
  const [count, setCount] = useState(0)
  const [userValue, setUserValue] = useState({
    type: types[0],
    title: null,
    content: null,
    privateYn: false,
    password: null,
    images: [],
  })
  const [imageFile, setImageFile] = useState([])
  const [isOpen, ModalControlHandler] = useModalControl()
  const [addQuestion] = useAddQuestionMutation()
  const FileRef = useRef()
  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setUserValue({
      ...userValue,
      [name]: value,
    })
    name === 'content' && setCount(value.length)
  }

  const onChangeCheckedHandler = (idx) => {
    setUserValue({
      ...userValue,
      type: types[idx],
    })
  }

  const privateYnHandler = () => {
    setUserValue({
      ...userValue,
      privateYn: !userValue.privateYn,
    })
  }

  const addPassword = (e) => {
    setUserValue({
      ...userValue,
      password: e.target.value,
    })
  }

  const uploadThumbnail = (e) => {
    const fileList = e.target.files

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
  const AddQuestionHandler = () => {
    if (!userValue.title || !userValue.content) {
      ModalControlHandler()
    }
    const formData = new FormData()

    for (const key in userValue) {
      if (Array.isArray(userValue[key])) {
        formData.append(key, JSON.stringify(userValue[key]))
      } else {
        formData.append(key, userValue[key])
      }
    }
    //api연결 로직
    addQuestion(formData)
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
          <div className="relative flex gap-2">
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
    console.log('imageFile', imageFile)
    console.log('userValue', userValue)
  }, [imageFile, userValue])

  return (
    <>
      <Type
        types={types}
        userValue={userValue}
        onChangeCheckedHandler={onChangeCheckedHandler}
      />
      <div className="w-full h-[10px] bg-white-200 my-4"></div>
      <Content
        count={count}
        privateYn={userValue['privateYn']}
        onChangeHandler={onChangeHandler}
        privateYnHandler={privateYnHandler}
        addPassword={addPassword}
      />
      <div className="w-full h-[10px] bg-white-200 my-4"></div>
      <AddPicture
        uploadThumbnail={uploadThumbnail}
        showImage={showImage}
        ref={FileRef}
        count={imageFile.length === 0 ? 0 : imageFile.length}
      />
      <QnABtn onClick={AddQuestionHandler} />
      {isOpen && (
        <Modal
          onClick={ModalControlHandler}
          title="제목과 내용은 필수로 입력해야합니다."
        />
      )}
      <Outlet />
    </>
  )
}

export default index

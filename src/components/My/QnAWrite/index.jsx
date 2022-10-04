import React, { useState, useMemo } from 'react'
import { types } from '../../../utils/questions'
import Type from './Type'
import Content from './Content'
import AddPicture from './AddPicture'
import QnABtn from './QnABtn'

const index = () => {
  const [count, setCount] = useState(0)
  const [userValue, setUserValue] = useState({
    type: types[0],
    title: null,
    content: null,
  })

  const [imageFile, setImageFile] = useState({
    file: null,
    thumbnail: null,
    type: null,
  })

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

  const uploadThumbnail = (e) => {
    const fileList = e.target.files
    if (fileList && fileList[0]) {
      setImageFile({
        file: fileList[0],
        thumbnail: URL.createObjectURL(fileList[0]),
        type: fileList[0].type.slice(0, 5),
      })
    }
  }

  const removeThumbnail = () => {
    setImageFile(null)
  }

  const showImage = useMemo(() => {
    if (imageFile.thumbnail === null) return

    return (
      <div
        className="relative w-[86px] h-[86px] bg-cover rounded overflow-hidden "
        style={{
          backgroundImage: `url(${imageFile.thumbnail})`,
        }}
        onClick={removeThumbnail}
      ></div>
    )
  })

  const AddQuestionHandler = () => {
    if (!userValue.title || !userValue.content) {
      alert('제목과 내용은 필수로 입력해야합니다.')
    }

    const data = {
      ...userValue,
      image: imageFile.thumbnail,
    }
    //api연결(question등록)
    console.log(data)
  }

  return (
    <div className="px-5">
      <Type
        types={types}
        userValue={userValue}
        onChangeCheckedHandler={onChangeCheckedHandler}
      />
      <Content count={count} onChangeHandler={onChangeHandler} />
      <AddPicture uploadThumbnail={uploadThumbnail} showImage={showImage} />
      <QnABtn onClick={AddQuestionHandler} />
    </div>
  )
}

export default index

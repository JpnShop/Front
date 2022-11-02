import React from 'react'

const Slide = ({ item }) => {
  const { src, description, title } = item
  return (
    <>
      <img className="w-full h-[100vw]" src={src} alt="슬라이드" />
      <div className="absolute bottom-10 mx-5">
        <h3 className="whitespace-pre-wrap text-3xl font-medium text-white drop-shadow-md mb-3 ">
          {title}
        </h3>
        <p className="text-sm font-medium text-white drop-shadow-md">
          {description}
        </p>
      </div>
    </>
  )
}

export default Slide

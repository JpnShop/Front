import React from 'react'
import heartOn from '/public/assets/heart_icon_full.svg'
import heartOff from '/public/assets/heart_icon_empty.svg'

export const Card = ({ data }) => {
  const { userId, profile, liked } = data
  return (
    <div className="w-full [&:nth-child(2n)]:border-l-2 border-primary box-content">
      <div className="flex justify-center align-items-center">
        <div className="w-full bg-cover rounded-full overflow-hidden relative justify-center m-5 after:content('') after:block after:pb-[100%]">
          <img src={profile} alt={userId} className="absolute" />
        </div>
      </div>
      <div className="flex justify-between px-5 py-3.5 border-y-2 border-primary text-primary text-sm">
        <div>@ {userId}</div>
        {liked ? (
          <img src={heartOn} alt="heart on" className="w-5" />
        ) : (
          <img src={heartOff} alt="heart off" className="w-5" />
        )}
      </div>
    </div>
  )
}
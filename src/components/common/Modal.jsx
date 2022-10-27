import React, { useState } from 'react'

const Modal = ({ title, onClick, children, className }) => {
  return (
    <>
      <div
        id="backdrop"
        className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>
      <div className="absolute top-[50%] right-[50%] translate-x-2/4 -translate-y-2/4 bg-white p-5 rounded min-w-[300px]">
        <svg
          aria-hidden="true"
          className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div className="flex flex-col items-center gap-5">
          <h3 className={`w-full px-5 text-center ${className}`}>{title}</h3>
          <div>
            <div
              className="border border-black-200 px-3 py-1 rounded"
              onClick={onClick}
            >
              확인
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal

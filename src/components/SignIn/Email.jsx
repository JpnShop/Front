import React, { useState } from 'react'

//조사체크하는 함수!!
function checkPostposition(name) {
  //name의 마지막 음절의 유니코드(UTF-16)
  const charCode = name.charCodeAt(name.length - 1)

  //유니코드의 한글 범위 내에서 해당 코드의 받침 확인
  const consonantCode = (charCode - 44032) % 28

  if (consonantCode === 0) {
    //0이면 받침 없음 -> 를
    return `${name}를`
  }
  //1이상이면 받침 있음 -> 을
  return `${name}을`
}
const Email = ({ onChange, alret, htmlFor, title }) => {
  return (
    <>
      <div>
        <label htmlFor={htmlFor}>{title}</label>
        <div className="mt-4 mb-3 relative flex box-border border border-neutral-200 rounded items-center border-box">
          <input
            name={htmlFor}
            placeholder={`${checkPostposition(title)} 입력 해 주세요.`}
            className="px-3 h-[3rem] border-none flex-initial box-border w-full py-[0.75rem] rounded text-[0.875rem] transition shadow-white"
            onChange={onChange}
          />
        </div>
        {alret && (
          <p className="mt-[8px] font-[11px] text-red-600 text-[12px]">
            {alret}
          </p>
        )}
      </div>
    </>
  )
}

export default Email

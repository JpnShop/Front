import React from 'react'
import { useEffect } from 'react'
import { cls } from '../../utils'

function Tab({ item, isActive, setCategory }) {
  useEffect(() => {
    if (!isActive) return
    setCategory(item)
  }, [isActive])
  return (
    <div>
      <span>{item}</span>
      <div
        className={cls(
          isActive &&
            'relative after:w-0.5 after:h-[79px] after:bg-primary after:absolute after:top-[100%] after:left-[calc(50%-2px)] before:absolute before:w-2.5 before:h-2.5 before:bg-primary before:rounded-full before:top-[70px] before:left-[calc(50%-6px)]',
        )}
      ></div>
    </div>
  )
}

export default Tab

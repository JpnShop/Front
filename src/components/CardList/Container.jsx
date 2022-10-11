import React, { useState } from 'react'
import Card from './Card'
import product from '~/dummy/dummy/product.json'

function Container({ list, search }) {
  return (
    <div className={search ? '' : 'pt-56'}>
      <div className="w-full grid grid-cols-2 gap-1">
        {list.map((item, idx) => (
          <Card key={idx} data={item} />
        ))}
      </div>
    </div>
  )
}

export default Container

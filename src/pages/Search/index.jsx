import React, { useState } from 'react'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AfterSearch from './AfterSearch'
import BeforeSearch from './BeforeSearch'
import SearchHeader from './SearchHeader'

function Search() {
  const [goSearch, setGoSearch] = useState(false)

  return (
    <div>
      <SearchHeader setGoSearch={setGoSearch} />
      <Outlet goSearch={goSearch} />
    </div>
  )
}

export default Search

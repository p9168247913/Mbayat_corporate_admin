import React from 'react'
import { FaSistrix } from 'react-icons/fa'
import './search.css'

function Search() {
  return (
    <div className='container_search'>
      <input type='text' placeholder='Search Twitter' className='Input_search'
        onChange={(e) => e.target.value}
      />
      <FaSistrix className='icon_search' />

    </div>
  )
}

export default Search

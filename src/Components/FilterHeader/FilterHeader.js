import React from 'react'
 import head from './inner_bg (1).png'
import filter from './FilterHeader.module.css'

function FilterHeader() {
  return (
    <>
        <div className={filter.header}>
        { <img src={head} alt='dsa'/>}

    </div>
    </>

  )
}

export default FilterHeader
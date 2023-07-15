import React from 'react'
import FilterFilter from '../FilterFilter/FilterFilter'
import Cards from '../Cards/Cards'
import  Style from './FilterMain.module.css'

function FilterMain() {
  return (
    <div className={Style.main}>
        <div className={Style.container}>
          <div className={Style.main__content}>
            <FilterFilter />
            <Cards />
          </div></div></div>
  )
}

export default FilterMain
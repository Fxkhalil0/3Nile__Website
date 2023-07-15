import React from 'react'
import style from './FilterSearch.module.css'

function FilterSearch() {
  return (
    <div className={style["search"]}>
              <div  className={style["container"]}>
                <div  className={style["search__content"]}>
                  <input type="text" placeholder="search..." />
                  <div  className={style["search__buttons"]}>
                    <a >filter</a>
                    <a >clear</a>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default FilterSearch
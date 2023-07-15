import React from 'react'
import Cardf from '../card -filter-desc/Card'
import style from './Card.module.css'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import { useEffect , useState } from 'react'
import { getAllBoats  ,getCategoryOne ,getCategoryTwo,getCategoryThree} from '../../redux/slices/UserSlice'
import { useParams } from "react-router-dom";

function Cards() {
  const dispatch =useDispatch()
  const param = useParams();
  // console.log(param)
 
  const { filteredcategoryOne } = useSelector(state => state.UserSlice)
  const { filteredcategoryTwo } = useSelector(state => state.UserSlice)
  const { filteredcategoryThree } = useSelector(state => state.UserSlice)
  let [category , setCategory] = useState([])
  
  let boat = [...category] || []
  useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps

    dispatch(getAllBoats());
    dispatch(getCategoryOne())
    dispatch(getCategoryTwo())
    dispatch(getCategoryThree())
    
    
}, [dispatch])

return (
  <>
    <div className={style.cards}>
      {param.num === '1' &&
        filteredcategoryOne.map((item) => {
          return <Cardf key={item.id} data={item} />;
        })}
      {param.num === '2' &&
        filteredcategoryTwo.map((item) => {
          return <Cardf key={item.id} data={item} />;
        })}
      {param.num === '3' &&
        filteredcategoryThree.map((item) => {
          return <Cardf key={item.id} data={item} />;
        })}
    </div>
  </>
);
}

export default Cards;







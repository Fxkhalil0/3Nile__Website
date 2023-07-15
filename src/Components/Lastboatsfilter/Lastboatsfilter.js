import React, { useState } from 'react';
import secStyle from './Lastboats.module.css';
import style from '../card/Card.module.css';
import Cardf from '../card -filter-desc/Card';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllBoats, getCategoryOne, getCategoryTwo, getCategoryThree, getSwvl } from '../../redux/slices/UserSlice';
import { useParams } from 'react-router-dom';
import NileBusCard from '../3NileBusCard/NileBusCard';
import {motion} from 'framer-motion'
function Lastboatsfilter() {
  const dispatch = useDispatch();
  const param = useParams();
  const { filteredswvl, filteredcategoryOne, filteredcategoryTwo } = useSelector((state) => state.UserSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const [length, setLength] = useState(1);
  const itemsPerPage = 6 ;

  let currentItems = [];

  useEffect(() => {
    window?.scrollTo({ top: 0, behavior: 'smooth' }); 

    dispatch(getAllBoats());
    dispatch(getCategoryOne());
    dispatch(getCategoryTwo());
    dispatch(getCategoryThree());
    dispatch(getSwvl());
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    switch (param?.num) {
      case '1':

        setLength(filteredcategoryOne?.length)
        break;
      case '2':
        setLength(filteredcategoryTwo?.length)
        break;
      case '3':
        setLength(filteredswvl?.length)
        break;
      default:
        break;
    }
    // Reset current page when param.num changes
  }, [param?.num]);

  switch (param?.num) {
    case '1':
      const indexOfLastItemCat1 = currentPage * itemsPerPage;
      const indexOfFirstItemCat1 = indexOfLastItemCat1 - itemsPerPage;
      currentItems = filteredcategoryOne.slice(indexOfFirstItemCat1, indexOfLastItemCat1);
      break;
    case '2':
      const indexOfLastItemCat2 = currentPage * itemsPerPage;
      const indexOfFirstItemCat2 = indexOfLastItemCat2 - itemsPerPage;
      currentItems = filteredcategoryTwo.slice(indexOfFirstItemCat2, indexOfLastItemCat2);
      break;
    case '3':
      const indexOfLastItemCat3 = currentPage * itemsPerPage;
      const indexOfFirstItemCat3 = indexOfLastItemCat3 - itemsPerPage;
      currentItems = filteredswvl.slice(indexOfFirstItemCat3, indexOfLastItemCat3);
      break;
    default:
      break;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = Math.ceil(length/ itemsPerPage);
  const paginationButtons = [];

  for (let i = 1; i <= pageNumbers; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={currentPage !== i ? `${secStyle.paginatorBtn}` : `${secStyle.paginatorActive}`}
        // className={secStyle.paginatorBtn}
      >
        {i}
      </button>
    );
  }

  return (
    <>
      <div className={secStyle['filtered__boats__container']}>
        <motion.div 

        layout
     
          className={secStyle['here__our__filtered__boats']}>
          {param?.num === '1' &&
            currentItems?.map((item) => {
              return <Cardf key={item?.id} data={item} />;
            })}
          {param?.num === '2' &&
            currentItems?.map((item) => {
              return <Cardf key={item?.id} data={item} />;
            })}
          {param?.num === '3' &&
            currentItems?.map((item) => {
              return <NileBusCard key={
                item?.id} data={item} />;
              })}
          </motion.div>
        <div className={secStyle?.paginatorContainer}>
          {paginationButtons}
        </div>
        </div>
      </>
    );
  }
  
  export default Lastboatsfilter;
  
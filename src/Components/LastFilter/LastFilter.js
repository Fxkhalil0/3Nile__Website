import React from 'react';
import style from './LastFilter.module.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import { useDispatch } from 'react-redux';
import { change, changeTypeOne, changeTypeTwo, changeTypeThree, changeTwo, changeThree, changePeopleOne, changePeopleTwo, changePeopleThree, changePortOne, changePortTwo, changePortThree, search, resetFilteredData } from '../../redux/slices/UserSlice';
import { useParams } from "react-router-dom";

function LastFilter() {
  const param = useParams();
  const dispatch = useDispatch();

  // search
  function serch(e) {
    dispatch(search(e.target.value));
  }

  // start price filter
  const [price, setPrice] = React.useState([0, 1000]);
  const handlePrice = (event, newValue) => {
    setPrice(newValue);
    if (param?.num === 1) {
      dispatch(change(newValue));
    } else if (param?.num === 2) {
      dispatch(changeTwo(newValue));
    } else if (param?.num === 3) {
      dispatch(changeThree(newValue));
    }
  };
  function pricetext(value) {
    return `${value}°C`;
  }
  // end price filter

  // start type filter
  const [type, setType] = React.useState('');
  const handleType = (event) => {
    setType(event?.target.value);
    if (param?.num === 1) {
      dispatch(changeTypeOne(event?.target.value));
    } else if (param?.num === 2) {
      dispatch(changeTypeTwo(event?.target.value));
    } else if (param?.num === 3) {
      dispatch(changeTypeThree(event?.target.value));
    }
  };
  // end type filter

  // start number of people filter
  const [people, setPeople] = React.useState([1, 500]);
  const handlePeople = (event, newValue) => {
    setPeople(newValue);
    if (param?.num === 1) {
      dispatch(changePeopleOne(newValue));
    } else if (param?.num === 2) {
      dispatch(changePeopleTwo(newValue));
    } else if (param?.num === 3) {
      dispatch(changePeopleThree(newValue));
    }
  };
  function peopletext(value) {
    return `${value}°C`;
  }
  // end number of people filter

  // start port filter
  const [port, setPort] = React.useState('');
  const handlePort = (event) => {
    setPort(event?.target?.value);
    if (param?.num === 1) {
      dispatch(changePortOne(event?.target?.value));
    } else if (param?.num === 2) {
      dispatch(changePortTwo(event?.target?.value));
    } else if (param?.num === 3) {
      dispatch(changePortThree(event?.target?.value));
    }
  };
  // end filter port

  // Clear filter function
  const handleClearFilter = () => {
    setPrice([0, 1000]); // Reset the price range
    setType(''); // Reset the type
    setPeople([1, 500]); // Reset the number of people range
    setPort(''); // Reset the port

        // Reset the filtered data in Redux
    dispatch(resetFilteredData());
  };
  // Clear search function
  const handleClearSearch = () => {
    dispatch(search('')); // Reset the search query
  };

  return (
    <>
      <section className='filter'>
        <div className={style["filter__container"]}>
          {param?.num === 3 && (
            <div className='filter__search__bar'>
              <input className={style["filter__search__input"]} type="text" placeholder="search" onChange={(e) => serch(e)} />
              <button className={style["filter__search__button"]} type="submit" onClick={handleClearSearch}>RESET FILTER</button>
            </div>
          )}
          {param?.num !== 3 && (
            <div className={style["filter__options__menu"]}>
              <div className={style["filter__by__price"]}>
                <label className={style["filter__label__text"]}>Price</label>
                <Box sx={{ width: 300 }}>
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={price}
                    onChange={handlePrice}
                    valueLabelDisplay="auto"
                    getAriaValueText={pricetext}
                    name='price'
                    max={1000}
                  />
                </Box>
                {/* end price slider */}
              </div>

              <div className={style["filter__by__boattype"]}>
                {/* start type select */}
                <label className={style["filter__label__text"]}>Types</label>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Type"
                      name="type"
                      onChange={handleType}
                    >
                      <MenuItem value={"shera3"}>Sharaa</MenuItem>
                      <MenuItem value={"Dahabiya"}>Dahabiya</MenuItem>
                      <MenuItem value={"Felucca"}>Felucca</MenuItem>
                      <MenuItem value={"Houseboat"}>Houseboat</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {/* end type select */}
              </div>

              <div className={style["filter__by__peoplenum"]}>
                <label className={style["filter__label__text"]}>Number Of People</label>
                <Box sx={{ width: 300 }}>
                  <Slider
                    getAriaLabel={() => 'numberOfPeople'}
                    value={people}
                    onChange={handlePeople}
                    valueLabelDisplay="auto"
                    getAriaValueText={peopletext}
                    name='number'
                    max={500}
                    min={1}
                    step={1}
                  />
                </Box>
              </div>

              <div className={style["filter__by__portname"]}>
                <label className={style["filter__label__text"]}>Port Name</label>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Port</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={port}
                      label="Type"
                      name="type"
                      onChange={handlePort}
                    >
                      <MenuItem value={"KFC"}>KFC</MenuItem>
                      <MenuItem value={"MAC"}>MAC</MenuItem>
                      <MenuItem value={"Mahata"}>Mahata</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>

              <div className={style["filter__button__done"]}>
                <button className={style["filter__search__done__button"]} type="submit" onClick={handleClearFilter}>
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default LastFilter;

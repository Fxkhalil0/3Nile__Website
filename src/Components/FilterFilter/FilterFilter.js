// import React from 'react'
// import style from  './FilterFilter.module.css'
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Slider from '@mui/material/Slider';
// import { useDispatch } from 'react-redux'
// import { change , changeTypeOne , changeTypeTwo , changeTypeThree ,changeTwo , changeThree , changePeopleOne , changePeopleTwo , changePeopleThree , changePortOne , changePortTwo , changePortThree} from '../../redux/slices/UserSlice'
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";


//  function FilterFilter() {
//    const param = useParams();
//    const dispatch =useDispatch()
  

//    const [price, setPrice] = React.useState([0, 1000]);
  

//    const handlePrice = (event, newValue) => {
//      setPrice(newValue);
//      if(param.num == 1){
//       dispatch(change(newValue))
//      }
//      else if(param.num == 2){
//        dispatch(changeTwo(newValue))
//      }
//      else if(param.num == 3){
//        dispatch(changeThree(newValue))
//      }
//    };


//    function pricetext(value) {

//      return `${value}°C`;
//    }
  


 
//  }
  

//   //  end filter price


//   // *************************************************************


// //  start type filter

//     // the state 
//     const [type, setType] = React.useState('');
   
//     // handle type change 
//     const handleType = (event) => {
//      setType(event.target.value);
//      console.log(event.target.value);
//      if(param.num == 1){
//      dispatch(changeTypeOne(event.target.value))
//      }
//      else if(param.num == 2){
//        dispatch(changeTypeTwo(event.target.value))
//        }
//      else if(param.num == 3){
//        dispatch(changeTypeThree(event.target.value))
//        }
//    };

//   //  end filter type

//   // *************************************************************

//   //  start number of people filter
  
//   //  start and end for range
//    const [people, setPeople] = React.useState([1, 500]);
  
//   //  handle number of people change
//    const handlePeople = (event, newValue) => {
//      setPeople(newValue);
//      if(param.num == 1){
//        dispatch(changePeopleOne(newValue))
//      }
//      else if(param.num == 2){
//        dispatch(changePeopleTwo(newValue))
//      }
//      else if(param.num == 3){
//        dispatch(changePeopleThree(newValue))
//      }
//    };

//   //  read the value text
//    function peopletext(value) {
//      return `${value}°C`;
//    }

// //  end number of people filter

//   // *************************************************************


// //  start port filter

// //  the state 
//    const [port, setPort] = React.useState('');

//   //  handle port change 
//    const handlePort = (event) => {
//      setPort(event.target.value);
//      if(param.num == 1){
//      dispatch(changePortOne(event.target.value))
//      }
//      else if(param.num == 2){
//        dispatch(changePortTwo(event.target.value))
//        }
//        else if(param.num == 3){
//          dispatch(changePortThree(event.target.value))
//          }
//    };
//   //  end filter port
 
  
//    return (
//      <div className={style["filter"]}>
//          <h3>Filter</h3>

//          {/* start price slider */}
//          <label>Price</label>
        
//          <Box sx={{ width: 300 }}>
//        <Slider
//          getAriaLabel={() => 'Temperature range'}
//          value={price}
//          onChange={handlePrice}
//          valueLabelDisplay="auto"
//          getAriaValueText={pricetext}
//          name='price'
//          max={1000}
//        />
//      </Box>
//       {/* end price slider */}

//     {/* start type selsect */}
//          <label>Types</label>
//          <Box sx={{ minWidth: 120 }}>
//        <FormControl fullWidth>
//          <InputLabel id="demo-simple-select-label">Type</InputLabel>
//          <Select
//            labelId="demo-simple-select-label"
//            id="demo-simple-select"
//            value={type}
//            label="Type"
//            name="type"
//            onChange={handleType}
//          >
//            <MenuItem value={"shera3"}>shera3</MenuItem>
//            <MenuItem value={"type2"}>Type2</MenuItem>
//            <MenuItem value={"type3"}>Type3</MenuItem>
//          </Select>
//        </FormControl>
//      </Box>
//     {/* end type selsect */}

//      <label>Number Of People</label>
//      <Box sx={{ width: 300 }}>
//        <Slider
//          getAriaLabel={() => 'numberOfPeople'}
//          value={people}
//          onChange={handlePeople}
//          valueLabelDisplay="auto"
//          getAriaValueText={peopletext}
//          name='number'
//          max={500}
//          min={1}
//          step = {1}
//        />
//      </Box>
//      <label>Port Name</label>
//          <Box sx={{ minWidth: 120 }}>
//        <FormControl fullWidth>
//          <InputLabel id="demo-simple-select-label">Type</InputLabel>
//          <Select
//            labelId="demo-simple-select-label"
//            id="demo-simple-select"
//            value={port}
//            label="Type"
//            name="type"
//            onChange={handlePort}
//          >
//            <MenuItem value={"KFC"}>KFC</MenuItem>
//            <MenuItem value={"MAC"}>MAC</MenuItem>
//            <MenuItem value={"Mahata"}>Mahata</MenuItem>
//          </Select>
//        </FormControl>
//      </Box>
//        </div>
//    )


//  export default FilterFilter

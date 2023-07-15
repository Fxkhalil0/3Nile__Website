import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsPerson } from 'react-icons/bs';
import Styles from './seats.module.css';
import { decreament, increament } from '../../redux/slices/UserSlice';

const Seats = (props) => {
  const dispatch = useDispatch();

  const [seat, setSeat] = useState([
    'Front1', 'Front2',
    'Middle1', 'Middle2', 'Back6', 'Back2',
    'Back1', 'Back3', 'Back7', 'Back5', 'Back9', 'Back10',
    'Back11', 'Back12', 'Back13', 'Back14', 'Back15', 'Back16', 'Back17', 'Back18',
  ]);
  const [seatAvailable, setSeatAvailable] = useState([]);
  const [seatReserved, setSeatReserved] = useState([]);

  const onClickData = (selectedSeat) => {
    if (seatReserved.includes(selectedSeat)) {
      setSeatAvailable([...seatAvailable, selectedSeat]);
      setSeatReserved(seatReserved.filter((res) => res !== selectedSeat));
      console.log(seatAvailable)
      dispatch(decreament())
      console.log(props.state.availableSeats)
    } else {
      setSeatReserved([...seatReserved, selectedSeat]);
      setSeatAvailable(seatAvailable.filter((res) => res !== selectedSeat));
      console.log(seatAvailable)
      dispatch(increament())
    }
  };

  const renderSeatItem = ({ item, dis }) => {
    console.log(dis);
    const isReserved = seatReserved.includes(item);
  
    return (
      dis ? (
        <button
          disabled={true}
          className={Styles[`seat${isReserved ? 'reserved' : ''}`]}
          onClick={() => {
            onClickData(item);
          }}
        >
          <BsPerson size={20} />
        </button>
      ) : <button
      className={Styles[`seat${isReserved ? 'reserved' : ''}`]}
      onClick={() => {
        onClickData(item);
      }}
    >
      <BsPerson size={20} />
    </button>
    );
  };

  return (
    <div className="container">
      <div className={Styles['seatContainer']}>
        <div className={Styles['seatRow']}>
          {seat.slice(0, seat.length / 2).map((item,index) => (
            <div key={item} className={Styles['seatItem']}>
              {props.state.availableSeats-10 >= index+1 ?renderSeatItem({ item , dis:false }):renderSeatItem({ item ,dis:true })}
            </div>
          ))}
        </div>
        <div className={Styles['seatRow']}>
          {seat.slice(seat.length / 2).map((item,index) => (
            <div key={item} className={Styles['seatItem']}>
              {props.state.availableSeats >= index+1 ?renderSeatItem({ item , dis:false }):renderSeatItem({ item ,dis:true })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Seats;

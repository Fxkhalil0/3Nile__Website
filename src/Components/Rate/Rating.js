import { FaStar, FaRegStar } from 'react-icons/fa';

function Rating({ rating }) {
  console.log(rating);
  const MAX_RATING = 5;
  const filledStars = Math.round(Math.round(rating * MAX_RATING) / MAX_RATING);
  const emptyStars = MAX_RATING - filledStars;
  return (  
    <div style={{paddingTop:"20px"}}>
      {[...Array(filledStars)].map((_, index) => (
        <FaStar key={index} style={{color:'orange'}}/>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} />
      ))}
    </div>
  );
}

export default Rating;

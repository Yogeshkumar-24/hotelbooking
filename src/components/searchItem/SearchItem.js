import { Link } from 'react-router-dom'
import './searchItem.css'

const SearchItem = ({item}) => {
  return (
    <div className='searchItem'>
      <img src={item.photos[0]} alt="" className="img" />
      <div className="desc">
        <h1 className="title">{item.name}</h1>
        <span className="distance">{item.distance} from the Bus Stand</span>
        <span className="taxiOption">Free Taxi from station</span>
        <span className="subTitle">Room with Balcony</span>
        <span className='features'>{item.desc}</span>
        <span className="cancel">Free cancelation</span>
        <span className="cancelSubtitle">you can also cancel later , so Don't miss the great deal!</span>
      </div>
      <div className="details">
        {item.rating && <div className="ratings">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="detailText">
          <span>₹ {item.cheapestPrice}</span>
          <span id='gst'>*including gst</span>
         <Link to={`/hotels/${item._id}`}>
         <button className='detailTextButton'>See Availability</button>
         </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
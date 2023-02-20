import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import "./hotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Header } from "../../components/header/Header";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../reserve/Reserve";
import { CircularProgress } from "@mui/material";




const Hotel = () => {

  const location = useLocation()
  const id = location.pathname.split('/')[2]

  
  const {data,loading} = useFetch(`/hotels/find/${id}`)

  const {dates,option} = useContext(SearchContext)


  const millisecondPerDay = 1000*60*60*24;

  function dayDiffernce(date1,date2){
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const dayDiff = Math.ceil(timeDiff/millisecondPerDay)
    return dayDiff
  }
  const days = dayDiffernce(dates[0].endDate , dates[0].startDate)

  const [sliderNumber, setSliderNumber] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [openModel,setOpenModel] = useState(false)

  const handleSlider = (i) => {
    setSliderNumber(i);
    setOpenSlider(true);
  };

  const handleLeft = () => {
    if(sliderNumber !== 0){
      setSliderNumber(sliderNumber - 1)
    }
    else{
      setSliderNumber(data.photos.length - 1)
    }
  }

  const handleRight = () => {
    if(sliderNumber !== data.photos.length - 1){
      setSliderNumber(sliderNumber + 1)
    }
    else{
      setSliderNumber(0)
    }
  }

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClick = () => {
    if(user){
      setOpenModel(true)
    }
    else{
      navigate('/login')
    }
  }

  

  return (
    <div>
      <Navbar />
      <Header type="list"/>
      {loading ? <div className="fLoading"><CircularProgress /></div> : (

<div className="hotelContainer">
{openSlider && (
  <div className="slider">
    <FontAwesomeIcon icon={faCircleXmark}  className="close" onClick={() => setOpenSlider(false)}/>
    <FontAwesomeIcon  icon={faCircleArrowLeft} className="arrow" onClick={handleLeft}/>
    <div className="sliderWrapper">
      <img
        className="sliderImage"
        src={data.photos[sliderNumber]}
        alt=""
      />
    </div>
    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={handleRight}/>
  </div>
)}
<div className="hotelWrapper">
  <button className="reserveButton" onClick={handleClick}>Reserve Now</button>
  <h1 className="hotelTitle">{data.name}</h1>
  <div className="hotelAddress">
    <FontAwesomeIcon icon={faLocationDot} />
    <span>{data.address}</span>
  </div>
  <span className="distance">{data.distance}m from the Main Bus Stand</span>
  <span className="priceHighLight">
    Book a Hotel for Just ₹{data.cheapestPrice} with free Taxi from Station
  </span>
  <div className="images">
    {data.photos?.map((photo, id) => (
      <div key={id} className="hotelImageWrapper">
        <img 
          onClick={() => {
            handleSlider(id);
          }}
          className="image"
          src={photo}
          alt=""
        />
      </div>
    ))}
  </div>
  <div className="hotelDetails">
    <div className="hotelDetailText">
      <h1 className="hotelDetailTitle">{data.title}</h1>
      <p className="hotelDesc">
        {data.desc}
      </p>
    </div>
    <div className="hotelDetailPrice">
      <h1>Reserve your room now!</h1>
      <span>Starting from </span>
      <h2>
        <b>₹{(days === 0 ? 1 : days) * data.cheapestPrice * option.room}</b> ({days === 0 ? 1 :days} Night)
      </h2>
      <button className="bookNow" onClick={handleClick}>Book Now</button>
    </div>
  </div>
</div>
<MailList />
<Footer />
</div>
      )}
      {openModel && <Reserve setOpen = {setOpenModel} hotelId = {id} />}
    </div>
  );
};

export default Hotel;

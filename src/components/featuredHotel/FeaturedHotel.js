import "./featuredHotel.css";

import React from "react";
import useFetch from "../../hooks/useFetch";
import { CircularProgress } from "@mui/material";

const FeaturedHotel = () => {
  const { data, loading } = useFetch(
    "https://hotel-server-production.up.railway.app/api/hotels?featured=true"
  );


  return (
    <div className="fh">
      {loading? <div className="fLoading"><CircularProgress /></div> : 
      <div className="fSubbox">
      {
        data.map((item) => (
          <div className="fhItem" key={item._id}>
         <div className="fhImage">
         <img
            src= {item.photos[0]}
            alt=""
            className="fhImg"
          />
         </div>
          <span className="fhName">{item.name}</span>
          <span className="fhCity">{item.city}</span>
          <span className="fhPrice">₹ {item.cheapestPrice}</span>
          {item.rating && (
            <div className="rating">
            <button>item.rating</button>
            <span>Excellent</span>
          </div>
          )}
        </div>
        ))
      }
      </div>
      }
      
    </div>
  );
};

export default FeaturedHotel;

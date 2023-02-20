import React from "react";
import useFetch from "../../hooks/useFetch.js";
import "./featured.css";
import {CircularProgress} from "@mui/material"
const Featured = () => {

  const {data,loading,error} = useFetch("https://hotel-server-production.up.railway.app/api/hotels/countByCity?cities=karur,coimbatore,trichy")
 
  
 
  return (
    <div className="featured">
     {loading ? <div className="fLoading"><CircularProgress /></div> : (
      <> <div className="featuredItem">
      <img
        src="https://images.thrillophilia.com/image/upload/s--rI05Fz1R--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/004/128/original/1597144988_shutterstock_1328746604.jpg.jpg"
        alt=""
        className="featuredImg"
      />
      <div className="featuredTitle">
        <h2>Coimbatore</h2>
        <h3>{data[0]} hotels</h3>
      </div>
    </div>
    <div className="featuredItem">
      <img
        src="https://images.thrillophilia.com/image/upload/s--2Cu3wIBK--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/013/739/original/5044002628_ef7f8b27af_b.jpg.jpg"
        alt=""
        className="featuredImg"  
      />
      <div className="featuredTitle">
        <h2>Ooty</h2>
        <h3>{data[1]} hotels</h3>
      </div>
    </div>
    <div className="featuredItem">
      <img
        src="https://assets.telegraphindia.com/telegraph/2022/Aug/1660899518_kodai-lake-1.jpg"
        alt=""
        className="featuredImg"
      />
      <div className="featuredTitle">
        <h2>Kodaikanal</h2>
        <h3>{data[2]} hotels</h3>
      </div>
    </div></>
     )}
    </div>
  );
};

export default Featured;

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(`https://hotel-server-vpv3.onrender.com/api/hotels/room/${hotelId}`);

  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleChange = (e) => {
    const selected = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      selected
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate()

  const {dates} = useContext(SearchContext)

  const getDates = (start,end) => {
    const s = new Date(start)
    const e = new Date(end)
    const date = new Date(s.getTime());
    const list = []

    while (date <= e){
      list.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }
    return list
  }

  const allDates = getDates(dates[0].startDate , dates[0].endDate)

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => 
      allDates.includes(new Date(date).getTime())
    ) 
    // roomNumber.unavailableDates.map((date) =>(
    //   console.log(new Date(date).getTime())
    // ) )
    // console.log(allDates)

    return !isFound;
  }


  const handleClick = async() => {
    try {
      await Promise.all(selectedRooms.map((roomId) => {
        const res = axios.put(`https://hotel-server-vpv3.onrender.com/api/rooms/availability/${roomId}`, {dates:allDates})
      
        return res.data
      }));
      setOpen(false)
      navigate('/')
      
    } catch (error) {
      
    }
  }
 
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          className="rClose"
          onClick={() => setOpen(false)}
          icon={faCircleXmark}
        />
        <span>Select your room:</span>
        {loading ? <div className="fLoading"><CircularProgress /></div> :data.map((item,i) => (
          <div className="rItem" key={i}>
            <div className="rInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max People <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">
                Price <b>₹ {item.price}</b>
              </div>
            </div>
           <div className="selectedRoom">
           {item.roomNumber.map((rno,i) => (
              <div className="room" key={i}>
                <label htmlFor="">{rno.number} </label>
                <label htmlFor="rCB" className="rLabel"></label>
                <input
                className="rCheckBox"
                id = 'rCB'
                  type="checkbox"
                  value={rno._id}
                  onChange={handleChange}
                  disabled = {!isAvailable(rno)}
                />
              </div>
            ))}
           </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">Reserve Now</button>
      </div>
    </div>
  );
};

export default Reserve;

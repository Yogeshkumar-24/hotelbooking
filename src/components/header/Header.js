import {
  faBed,
  faCalendarDay,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

export const Header = ({type}) => {
  const [openDate, setOpenDate] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [dates, setDates] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);


  const {dispatch} = useContext(SearchContext)

  const [option, setOption] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [destination,setDestination] = useState('')

  const handleOption = (name,operation) => {
    setOption(prev => {return {
      ...prev , [name] : operation === 'd' ? option[name] - 1 : option[name] + 1
    }})
  }

  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH", payload:{destination,dates,option}})
    navigate('/hotels', {state : {destination,dates,option}})
  }

  const {user} = useContext(AuthContext)

  return (
    <div className="header">
      <div className= {type === 'list' ? "headerContainer listMode" : "headerContainer"} >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flight</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </div>
        </div>
        { type !== 'list' &&
          <>
            <h1 className="headerTitle">Simple Hotel Booking</h1>
        <p className="headerDesc">Easy Hotel Booking  </p>
        {!user && <button className="headerBtn">Sign In / Register</button>}
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder="Enter Place"
              className="headerSearchInput"
              onChange={(e) => setDestination(() => {
                e.target.value = e.target.value.toLowerCase()
              })}
            />
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDay} className="headerIcon" />
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
              dates[0].endDate,
              "dd/MM/yyyy" 
            )} `}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate= {new Date()}
              // ranges ={date}
              />
            )}
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span onClick={() => setOpenOption(!openOption)} className="headerSearchText">{`${option.adult} adults . ${option.children} children . ${option.room} rooms`}</span>
            { openOption &&
              <div className="options">
              <div className="optionItem">
                <span id="headerSearchText">Adults</span>
                <div className="item">
                  <button disabled = {option.adult <= 1} className="counterBtn" onClick={()=> handleOption("adult",'d')}>-</button>
                  <span>{`${option.adult}`}</span>
                  <button className="counterBtn" onClick={()=> handleOption("adult",'i')}>+</button>
                </div>
              </div>
              <div className="optionItem">
                <span id="headerSearchText">Children</span>
                <div className="item">
                  <button disabled ={option.children < 1} className="counterBtn" onClick={()=> handleOption("children",'d')}>-</button>
                  <span>{option.children}</span>
                  <button className="counterBtn" onClick={()=> handleOption("children",'i')}>+</button>
                </div>
              </div>
              <div className="optionItem">
                <span id="headerSearchText">Room</span>
                <div className="item">
                  <button disabled ={option.room <=1} className="counterBtn" onClick={()=> handleOption("room",'d')}>-</button>
                  <span>{option.room}</span>
                  <button className="counterBtn" onClick={()=> handleOption("room",'i')}>+</button>
                </div>
              </div>
            </div>}
          </div>
          <div className="headerSearchItem">
            <button onClick={handleSearch} id="headerBtn" className="headerBtn">Search</button>
          </div>
        </div>
          </>
        }
      </div>
    </div>
  );
};

import "./list.css";
import { Header } from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import useFetch from "../../hooks/useFetch.js";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { CircularProgress } from "@mui/material";
const List = () => {
  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [option, setOption] = useState(location.state.option);

  const [openDate, setOpenDate] = useState(false);

  const[min,setMin] = useState(undefined)
  const[max,setMax] = useState(undefined)

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 9999}`
  );
   
  const handleClick = () => {
    reFetch();
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listTitle">Search</h1>
            <div className="listItem">
              <label>Destination</label>
              <input onChange={e=> setDestination(e.target.value)} type="text" placeholder={destination} />
            </div>
            <div className="listItem">
              <label>Check-In Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {" "}
                {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="listItem">
              <label>Options</label>
              <div className="listOption">
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Min Price <small>per night</small>
                  </span>
                  <input onChange={e=> setMin(e.target.value)} type="number" className="listOptionInput" />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Max Price <small>per night</small>
                  </span>
                  <input onChange={e=> setMax(e.target.value)} type="number" className="listOptionInput" />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="listOptionInput"
                    placeholder={option.adult}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="listOptionInput"
                    placeholder={option.children}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="listOptionInput"
                    placeholder={option.room}
                  />
                </div>
              </div>
              <button className="button" onClick={handleClick}>Search</button>
            </div>
          </div>
          <div className="listResult">
           {loading ? <div className="fLoading"><CircularProgress /></div> : 
            <>
             {data.map(item => (
              <>
                <SearchItem item={item} key={item._id}/>
              </>
             ))}
            </>
           }
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

import { CircularProgress } from "@mui/material";
import React from "react";
import useFetch from "../../hooks/useFetch";
import "./propertyList.css";
const PropertyList = () => {
  
  const images = [
    "https://media-cdn.tripadvisor.com/media/photo-s/09/8c/63/a8/gem-park-ooty.jpg",
    "https://mediacdn.99acres.com/media1/19166/12/383332140M-1663833429281.jpg",
    "https://assets-news.housing.com/news/wp-content/uploads/2022/02/27121904/featured-compressed-67.jpg",
    "https://4.imimg.com/data4/BL/WA/MY-2599162/cottages-500x500.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Town_and_Country_fh000023.jpg"
  ];
  const { data, loading, error } = useFetch("/hotels/countByType");
    // console.log(data)

  return (
    <div className="pList">
      {loading ? (
        <div className="fLoading"><CircularProgress /></div>
      ) : (
        <div className="pSubContainer">
          {data &&
            images.map((img, i) => (
              <div className="pListItems" key={i}>
                <div className="pListImg">
                <img src={img} alt="" className="pListImage" />
                </div>
                <div className="pListTitle">
                  <h2>{data[i]?.type}</h2>
                  <h3>
                    {data[i]?.type} {data[i]?.count}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;

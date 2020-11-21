import React from "react";
import "./Beer.css";

const BeerDetail = (props) => {
  const { beer, beerImage } = props;
  return (
    <div>
      <div className="beerImage">
        <div>
          <img src={beerImage.image} alt="beerImage" />
        </div>
        <div>
          {Object.keys(beer).map((key) => (
            <li key={key}>{`${key}: ${beer[key]}`}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeerDetail;

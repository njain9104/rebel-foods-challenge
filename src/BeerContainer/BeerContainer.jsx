import React, { useEffect, useState } from "react";
import axios from "axios";
import BeerDetail from "./BeerDetail";
import "./Beer.css";

const BeerContainer = () => {
  const [beerList, setBeerList] = useState([]);
  const [beerImageList, setBeerImageList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchBeerList, setSearchBeerList] = useState([]);
  const [noSearchResult, setNoSearchResult] = useState(false);

  const baseURL = "https://s3-ap-southeast-1.amazonaws.com/he-public-data";

  useEffect(() => {
    axios
      .get(`${baseURL}/beercraft5bac38c.json`)
      .then((response) => setBeerList([...response.data]));
    axios
      .get(`${baseURL}/beerimages7e0480d.json`)
      .then((response) => setBeerImageList([...response.data]));
  }, []);

  const onSelectPageNumber = (page) => setPageNumber(page);

  const numberOfItemsPerPage = 20;
  const numberOfPages = Math.ceil(beerList.length / numberOfItemsPerPage);

  const getPages = () => {
    const pages = [];
    for (let i = 0; i < numberOfPages; i++) pages.push(i);
    return pages;
  };

  const renderPages = () => {
    const listOfPages = getPages();
    return listOfPages.map((page) => (
      <button type="button" onClick={() => onSelectPageNumber(page)} key={page}>
        {page}
      </button>
    ));
  };

  const onChange = (event) => setSearchText(event.target.value);

  const onSearch = () => {
    const beerListCopy = [...beerList];
    const searchResult = beerListCopy
      .slice(
        pageNumber * numberOfItemsPerPage,
        pageNumber * numberOfItemsPerPage + 20
      )
      .filter((list) =>
        list.name.toLowerCase().match(searchText.toLowerCase())
      );
    if (!searchResult.length) setNoSearchResult(true);
    else setNoSearchResult(false);
    setSearchBeerList([...searchResult]);
  };

  const onReset = () => {
    setSearchText("");
    setNoSearchResult(false);
    setSearchBeerList([]);
  };

  return (
    <div className="beerContainer">
      <div>
        <input
          type="text"
          value={searchText}
          onChange={onChange}
          placeholder="Enter Brand Name"
        />
        <button type="button" onClick={onSearch}>
          Search
        </button>
        <button type="button" onClick={onReset}>
          Reset Search
        </button>
      </div>
      <h1>Page Number: {pageNumber}</h1>
      {!searchBeerList.length && !noSearchResult ? (
        <>
          <div>{renderPages()}</div>
          <div>
            {!!beerList.length &&
              !!beerImageList.length &&
              beerList
                .slice(
                  pageNumber * numberOfItemsPerPage,
                  pageNumber * numberOfItemsPerPage + 20
                )
                .map((beer, index) => (
                  <BeerDetail
                    key={beer.id}
                    beer={beer}
                    beerImage={beerImageList[index % 5]}
                  />
                ))}
          </div>
          <div>{renderPages()}</div>
        </>
      ) : (
        <div>
          {!noSearchResult ? (
            searchBeerList.map((beer, index) => (
              <BeerDetail
                key={beer.id}
                beer={beer}
                beerImage={beerImageList[index % 5]}
              />
            ))
          ) : (
            <div> No Result Found </div>
          )}
        </div>
      )}
      <h1>Page Number: {pageNumber}</h1>
    </div>
  );
};

export default BeerContainer;

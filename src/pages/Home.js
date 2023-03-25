import CardListing from "../components/CardListing";
import SortFilter from "../components/SortFilter";
import React, { useState, useEffect }  from 'react';
import axios from 'axios';

function Home() {
   const [stocks, setStocks] = useState([]);
   const [orignalStocks, setOrignalStocks] = useState([]);
   const [toggleSort, settoggleSort] = useState(true); //true means assending order

    const sortListing = () => {
        var stocksName = [];
        if(toggleSort){
            stocksName = stocks.sort((a, b) => {
                return a.current - b.current;
            }); 
        } else{
            stocksName = stocks.sort((a, b) => {
                return b.current - a.current;
            }); 
        }
        console.log(stocksName);
        setStocks(stocksName);
        settoggleSort(prev => !prev);  
    };

    const filterListing = (value) => {
        var filterStocksName = [];
        filterStocksName = stocks.filter((item) => item.current > value);
        console.log(value)
        setStocks(filterStocksName);

    }

    useEffect(() => {
        axios.get(`http://localhost:3000/searchresult`)
            .then((response) => {
                setOrignalStocks(response.data);
                setStocks(response.data);
            })
    }, []);

    return (
      <div className="inner-page">
         <CardListing stocks = {stocks} />
         <SortFilter sortListing = {sortListing} filterListing = {filterListing} />
      </div>
    );
  }
  
  export default Home;
  
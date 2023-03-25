import Card from '@mui/material/Card';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Input  } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState, useEffect }  from 'react';
import axios from 'axios';

const Parentdiv = {
    height: '5px',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    overflow: 'hidden'
  }
  

function CardListing({stocks}) {

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  console.log('update');

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = stocks.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(stocks)
        }
    }


  return (
    <div>
        <Box>
            <AppBar position="fixed">
                <div className="seacrh-form">
                    <div className="form-control">
                        <Input id="my-input" aria-describedby="my-helper-text" onChange={(e) => searchItems(e.target.value)}x placeholder='Enter Stock name to Search' />
                        <IconButton size="large" aria-label="search" color="inherit" type="submit" className="search-btn" >
                            <SearchIcon />
                        </IconButton>
                    </div>
                </div>
            </AppBar>
        </Box>
        <Card itemsPerRow={3} style={{ marginTop: 20 }}>
            {searchInput.length > 1 ? (
                filteredResults.map((item, index) => {
                    return (
                        <Card key={index} className="card-box">
                        <h4>{item.companyname}</h4>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Price</TableCell>
                                    <TableCell align="left">Change</TableCell>
                                    <TableCell align="left">Position on 52wk</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="td" scope="row">
                                            {item.current}
                                        </TableCell>
                                        <TableCell component="td" scope="row">
                                        +{item.absolutechange} <span className="percentage-change">({item.percentChange}%)</span>
                                        </TableCell>
                                        <TableCell component="td" scope="row">
                                          <div style={Parentdiv}>
                                                <div className="Progresswidth" style={{width:item.fiftyTwoWeekHighPrice + '%'}}>
                                                </div>
                                            </div>
                                            <div className="change-value">
                                                <label>{item.fiftyTwoWeekLowPrice}</label>
                                                <label>{item.fiftyTwoWeekHighPrice}</label>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                    )
                })
            ) : (
                stocks.map((item, index) => {
                    return (
                        <Card key={index} className="card-box">
                        <h4>{item.companyname}</h4>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Price</TableCell>
                                    <TableCell align="left">Change</TableCell>
                                    <TableCell align="left">Position on 52wk</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="td" scope="row">
                                            {item.current}
                                        </TableCell>
                                        <TableCell component="td" scope="row">
                                        +{item.absolutechange} <span className="percentage-change">({item.percentChange}%)</span>
                                        </TableCell>
                                        <TableCell component="td" scope="row">
                                            <div style={Parentdiv}>
                                                <div className="Progresswidth" style={{width: ((item.fiftyTwoWeekHighPrice  - item.fiftyTwoWeekLowPrice) / item.fiftyTwoWeekLowPrice) * 100+ '%'}}>
                                                </div>
                                            </div>
                                            <div className="change-value">
                                                <label>{item.fiftyTwoWeekLowPrice}</label>
                                                <label>{item.fiftyTwoWeekHighPrice}</label>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                    )
                })
            )}
        </Card>

    </div>
  );
}

export default CardListing;

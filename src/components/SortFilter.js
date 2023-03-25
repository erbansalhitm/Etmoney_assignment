import * as React from 'react';
import Button from '@mui/material/Button';
import { useState }  from 'react';

export default function SortFilter({sortListing, filterListing}) {

  const [value, setValue] = useState('')
  
  const openModal = () => {
    document.getElementById('modal-filter').style.display = "flex";
  } 
  const closeModal = () => {
    document.getElementById('modal-filter').style.display = "none";
  } 
  return (
    <div>
        <div className="footer-menu">
            <div className="btn">
                <Button variant="outlined" onClick={sortListing}>
                    Sort
                </Button>
            </div>
            <div className="btn">
                <Button variant="outlined" onClick={openModal}>
                    Filter
                </Button>
                <div className="filterbox" id="modal-filter">
                    <div class="box">  
                        <h4>Filter By</h4>
                        <input type="text" 
                            value={value} 
                            onChange={e => setValue(e.target.value)} 
                        />
                        <div className="action-btn">
                            <Button onClick ={()=>filterListing(value)}>Go</Button>
                            <Button className="close" onClick={closeModal}>Close</Button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    
    </div>
  );
}
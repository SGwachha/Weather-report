import React, { useState, useEffect } from 'react';
import './Weather.css';
import Weatherform from './Weatherform';
import { useDispatch, useSelect } from '@wordpress/data';

const Weather = () => {
    const store = 'Weather-report';
    const location = useSelect((select) => select(store).getLocation());
    const [newLocation, setNewLoaction] = useState(location);

    const { setLocation } = useDispatch(store);

    const handleButtonClick = () =>{
        setLocation(newLocation)
    }

    return (
        <div>
            <div className='header'>
                <div className='searchbar'>
                    <input value={newLocation} onChange={(e) => setNewLoaction(e.target.value)} />
                    <button className='button' onClick={handleButtonClick}>Search</button>
                </div>
            </div>
            {location && <Weatherform />}
        </div>
    );
};

export default Weather;

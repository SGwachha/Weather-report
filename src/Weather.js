import React, { useState } from 'react';
import './Weather.css';
import Weatherform from './Weatherform';
import { useDispatch, useSelect } from '@wordpress/data';

const Weather = () => {
    const store = 'Weather-report';
    const location = useSelect((select) => select(store).getLocation());
    const [newLocation, setNewLoaction] = useState(location);

    const { setLocation } = useDispatch(store);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocation(newLocation)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='header'>
                    <div className='searchbar'>
                        <input value={newLocation} onChange={(e) => setNewLoaction(e.target.value)} />
                        <button className='button'>Search</button>
                    </div>
                </div>
                {location ? <Weatherform /> :
                    <h1>Please search the location you want to know the weather data</h1>
                }
            </form>
        </>
    );
};

export default Weather;

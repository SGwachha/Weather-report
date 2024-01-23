import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelect } from '@wordpress/data';

const Weatherform = () => {
    const [ weatherData, setWeatherData ] = useState({});
    const store = 'Weather-report';
    const currentLocation = useSelect((select) => select(store).getLocation());


    const fetchInfo = async () => {
        try {
            const url = `http://api.weatherapi.com/v1/forecast.json?key=57a6c8c0a4f0450fbe940939241601&q=${currentLocation}&days=5&aqi=no&alerts=no`;
            const res = await axios.get(url);
            setWeatherData(res.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, [currentLocation]);

    return (
        <div>
            <div className='weatherimage'>
                <div className='leftimage'>
                    <h2>Weather Outlook</h2>
                    <div className='leftcover'>
                        <div className='leftimage-container'>
                            {weatherData?.current?.condition && (
                                <>
                                    <div className='leftimage-container-left'>
                                        <img src={weatherData?.current?.condition?.icon} alt='weather icon' />
                                        <h5>{weatherData?.current?.condition?.text}</h5>
                                    </div>
                                    <div className='leftimage-container-right'>
                                        <p>wind: {weatherData?.current?.wind_mph} mph</p>
                                        <p>Precip: {weatherData?.current?.precip_in} in</p>
                                        <p>Pressure: {weatherData?.current?.pressure_in} in</p>
                                        <h1>{weatherData?.current?.feelslike_f} °F</h1>
                                    </div>
                                </>
                            )}
                        </div>
                        {weatherData?.forecast?.forecastday && (
                            <div className='leftimage-row'>
                                {weatherData?.forecast?.forecastday?.map((day) => (
                                    <div key={day.date}>
                                        <p>{day.date}</p>
                                        <img src={day.day.condition.icon} alt='cloud' style={{ height: '30%' }} />
                                        <p>{day.day.maxtemp_f} °F</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className='rightimage'>
                    <h2>Information</h2>
                    <div className='table'>
                        <table>
                            {weatherData?.location && (
                                <tbody>
                                    <tr>
                                        <td>Country:</td>
                                        <td>{weatherData?.location.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Region:</td>
                                        <td>{weatherData?.location.region}</td>
                                    </tr>
                                    <tr>
                                        <td>Lat/Lon:</td>
                                        <td>{weatherData?.location.lat}, {weatherData?.location.lon}</td>
                                    </tr>
                                    <tr>
                                        <td>Current time:</td>
                                        <td>{weatherData?.location.localtime}</td>
                                    </tr>
                                    <tr>
                                        <td>Time Zone ID:</td>
                                        <td>{weatherData?.location.tz_id}</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weatherform;
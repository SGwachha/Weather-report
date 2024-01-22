import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Weather.css';

const Weather = () => {
    const [data, setData] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [city, setCity] = useState('kathmandu');


    const fetchInfo = async () => {
        try {
            const url = `http://api.weatherapi.com/v1/forecast.json?key=57a6c8c0a4f0450fbe940939241601&q=${city}&days=5&aqi=no&alerts=no`;
            setIsLoading(true);
            const res = await axios.get(url);
            setData(res.data);
            setCity(res.data.location.name);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => { fetchInfo(); }, [])

    const handleSearch = () => {
        fetchInfo();
    }

    return (
        <div>
            <div className='header'>
                <div className='searchbar'>
                    <input onChange={(e) => setCity(e.target.value)} />
                    <button className='button' onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className='weatherimage'>
                <div className='leftimage'>
                    <h2>Weather Outlook</h2>
                    <div className='leftcover'>
                        <div className='leftimage-container'>
                            {isloading && <p>Loading....</p>}
                            {data.current?.condition &&
                                <>
                                    <div className='leftimage-container-left'>
                                        <img src={data.current?.condition?.icon} />
                                        <h5>{data.current?.condition?.text}</h5>
                                    </div>
                                    <div className='leftimage-container-right'>
                                        <p>wind: {data.current?.wind_mph} mph</p>
                                        <p>Precip: {data.current?.precip_in} in</p>
                                        <p>Pressure: {data.current?.pressure_in} in</p>
                                        <h1>{data.current?.feelslike_f} f</h1>
                                    </div>
                                </>
                            }
                        </div>
                        {isloading && <p>Loading....</p>}
                        {data.forecast?.forecastday && (
                            <div className='leftimage-row'>
                                {data.forecast.forecastday.map((day) => (
                                    <div>
                                        <p>{day.date}</p>
                                        <img src={day.day.condition.icon} alt='cloud' style={{ height: '30%' }} />
                                        <p>{day.day.maxtemp_f}°F</p>
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
                            {isloading && <p>Loading....</p>}
                            {data.location && (
                                <tbody>
                                    <tr>
                                        <td>country:</td>
                                        <td>{data.location.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Region:</td>
                                        <td>{data.location.region}</td>
                                    </tr>
                                    <tr>
                                        <td>Lat/Lon:</td>
                                        <td>{data.location.lat}, {data.location.lon}</td>
                                    </tr>
                                    <tr>
                                        <td>Current time:</td>
                                        <td>{data.location.localtime}</td>
                                    </tr>
                                    <tr>
                                        <td>Time Zone ID:</td>
                                        <td>{data.location.tz_id}</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather

// getlocation
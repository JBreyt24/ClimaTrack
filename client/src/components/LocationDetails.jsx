import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LocationDetails = (props) => {
    const { id } = useParams();
    const [oneLocation, setOneLocation] = useState({});
    const [weatherData, setWeatherData] = useState({});
    const [forecastData, setForecastData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/findOneLocation/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setOneLocation(res.data);
                // Get weather data for the location
                getWeatherData(res.data.cityName);
                // Get forecast data for the location
                getForecastData(res.data.cityName);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, [id]);

    const getWeatherData = (cityName) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6cd283b59c815e8a134a74eabcaf8334`)
            .then((res) => {
                console.log(res);
                // Update weather data state
                setWeatherData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const getForecastData = (cityName) => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=6cd283b59c815e8a134a74eabcaf8334`)
            .then((res) => {
                console.log(res);
                // Update forecast data state
                setForecastData(res.data.list);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/deleteLocation/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate('/dashboard');
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    // Convert Kelvin to Fahrenheit
    const kelvinToFahrenheit = (kelvin) => {
        return ((kelvin - 273.15) * 9 / 5 + 32).toFixed(0); // reference to w3schools.com
    };

    // Convert meters per second to miles per hour
    const mpsToMph = (mps) => {
        return (mps * 2.237).toFixed(0); //reference to w3schools.com
    };

    // Weather condition icon mapping
    const conditionIconMap = {
        'Clear': '01d',                 // Clear sky
        'Clouds': '03d',                // Few clouds
        'Rain': '10d',                  // Rain
        'Thunderstorm': '11d',          // Thunderstorm
        'Drizzle': '09d',               // Drizzle
        'Snow': '13d',                  // Snow
        'Mist': '50d',                  // Mist
        'Smoke': '50d',                 // Smoke
        'Haze': '50d',                  // Haze
        'Dust': '50d',                  // Dust
        'Fog': '50d',                   // Fog
        'Sand': '50d',                  // Sand
        'Ash': '50d',                   // Volcanic Ash
        'Squall': '50d',                // Squall
        'Tornado': '50d',               // Tornado
        'Atmosphere': '50d',            // Atmosphere
        'Clouds and Mist': '03d',       // Clouds and Mist
        'Clouds and Drizzle': '09d',    // Clouds and Drizzle
        'Clouds and Rain': '10d',       // Clouds and Rain
        'Thunderstorm with Light Rain': '11d', // Thunderstorm with Light Rain
        'Thunderstorm with Rain': '11d',       // Thunderstorm with Rain
        'Thunderstorm with Heavy Rain': '11d', // Thunderstorm with Heavy Rain
        'Thunderstorm with Drizzle': '11d',    // Thunderstorm with Drizzle
        'Thunderstorm with Light Drizzle': '11d', // Thunderstorm with Light Drizzle
        'Thunderstorm with Heavy Drizzle': '11d', // Thunderstorm with Heavy Drizzle
        'Thunderstorm with Hail': '11d',        // Thunderstorm with Hail
        'Light Thunderstorm': '11d',            // Light Thunderstorm
        'Heavy Thunderstorm': '11d',            // Heavy Thunderstorm
        'Ragged Thunderstorm': '11d',           // Ragged Thunderstorm
        'Thunderstorm with Light Drizzle and Rain': '11d',  // Thunderstorm with Light Drizzle and Rain
        'Thunderstorm with Drizzle and Rain': '11d',        // Thunderstorm with Drizzle and Rain
        'Thunderstorm with Heavy Drizzle and Rain': '11d',  // Thunderstorm with Heavy Drizzle and Rain
    };

    // Weather condition icon mapping for forecast
    const forecastConditionIconMap = {
        'Clear': '01d',                 // Clear sky
        'Clouds': '03d',                // Few clouds
        'Rain': '10d',                  // Rain
        'Thunderstorm': '11d',          // Thunderstorm
        'Drizzle': '09d',               // Drizzle
        'Snow': '13d',                  // Snow
        'Mist': '50d',                  // Mist
        'Smoke': '50d',                 // Smoke
        'Haze': '50d',                  // Haze
        'Dust': '50d',                  // Dust
        'Fog': '50d',                   // Fog
        'Sand': '50d',                  // Sand
        'Ash': '50d',                   // Volcanic Ash
        'Squall': '50d',                // Squall
        'Tornado': '50d',               // Tornado
        'Atmosphere': '50d',            // Atmosphere
        'Clouds and Mist': '03d',       // Clouds and Mist
        'Clouds and Drizzle': '09d',    // Clouds and Drizzle
        'Clouds and Rain': '10d',       // Clouds and Rain
        'Thunderstorm with Light Rain': '11d', // Thunderstorm with Light Rain
        'Thunderstorm with Rain': '11d',       // Thunderstorm with Rain
        'Thunderstorm with Heavy Rain': '11d', // Thunderstorm with Heavy Rain
        'Thunderstorm with Drizzle': '11d',    // Thunderstorm with Drizzle
        'Thunderstorm with Light Drizzle': '11d', // Thunderstorm with Light Drizzle
        'Thunderstorm with Heavy Drizzle': '11d', // Thunderstorm with Heavy Drizzle
        'Thunderstorm with Hail': '11d',        // Thunderstorm with Hail
        'Light Thunderstorm': '11d',            // Light Thunderstorm
        'Heavy Thunderstorm': '11d',            // Heavy Thunderstorm
        'Ragged Thunderstorm': '11d',           // Ragged Thunderstorm
        'Thunderstorm with Light Drizzle and Rain': '11d',  // Thunderstorm with Light Drizzle and Rain
        'Thunderstorm with Drizzle and Rain': '11d',        // Thunderstorm with Drizzle and Rain
        'Thunderstorm with Heavy Drizzle and Rain': '11d',  // Thunderstorm with Heavy Drizzle and Rain
    };

    // Get icon based on weather condition
    const getIconUrl = (condition) => {
        const iconCode = conditionIconMap[condition];
        if (iconCode) {
            return `http://openweathermap.org/img/wn/${iconCode}.png`;
        }
        return 'weather-icon'; // Return string if no icon code is found
    };
    // Get icon based on weather condition for forecast
    const getForecastIconUrl = (condition) => {
        const iconCode = forecastConditionIconMap[condition];
        if (iconCode) {
            return `http://openweathermap.org/img/wn/${iconCode}.png`;
        }
        return 'weather-icon'; // Return string if no icon code is found
    };




    // DETAILS DISPLAY


    return (
        <div className='displayOne-page'>
            <Link to={"/dashboard"}>
                <button className='home-btn'>Home</button>
            </Link>
            <Link to={`/location/updateLocation/${id}`}>
                <button className='update-rec-btn'>Update</button>
            </Link>
            <div className='display-one-main'>
                <h2 className='displayOne-header'>
                    {oneLocation.cityName}, {oneLocation.stateName}
                </h2>
                <p>ZIP Code: {oneLocation.zipCode}</p>
                {/* Display weather data */}
                <div>
                    {weatherData.main && (
                        <div>
                            <img src={getIconUrl(weatherData.weather[0].main)} alt="Weather Icon" />
                            <p>Temperature: {kelvinToFahrenheit(weatherData.main.temp)}°F</p>
                            <p>Conditions: {weatherData.weather[0].main}</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Wind Speed: {mpsToMph(weatherData.wind.speed)} mph</p>
                        </div>
                    )}
                </div>
            </div>
            {/* Display forecast data */}
            <h3>5-Day Forecast</h3>
            <div className='forecast-display'>
                {forecastData.slice(0, 5).map((forecast, currentDay) => {
                    // Get the index of the next day excluding current day
                    const nextDayIndex = (new Date().getDay() + currentDay + 1) % 7; // reference to developer.mozilla.org 
                    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const dayOfWeek = daysOfWeek[nextDayIndex];

                    return (
                        <div className='forecast-day-bx' key={currentDay}>
                            <p>{dayOfWeek}</p>
                            <img src={getForecastIconUrl(forecast.weather[0].main)} alt="weather-icon"/>
                            <p>Temperature: {kelvinToFahrenheit(forecast.main.temp)}°F</p>
                            <p>Conditions: {forecast.weather[0].description}</p>
                        </div>
                    );
                })}
            </div>
            <button className='delete-btn' onClick={deleteHandler}>Delete Location</button>
        </div>
    );
};

export default LocationDetails;
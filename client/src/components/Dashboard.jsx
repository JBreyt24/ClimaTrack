import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {
    const { locationList, setLocationList } = props;
    const [weatherData, setWeatherData] = useState({});
    const [ returnUserInfo, setReturnUserInfo ] = useState('')

    useEffect(() => {
        axios.get("http://localhost:8000/api/findAllLocations")
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setLocationList(res.data);
                // Get user data from back end
                setReturnUserInfo(res.data)
                // Get weather data for each location
                getWeatherDataForLocations(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const getWeatherDataForLocations = (locations) => {
        locations.forEach(location => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location.cityName}&appid=6cd283b59c815e8a134a74eabcaf8334`)
                .then((res) => {
                    console.log(res);
                    // Update weather data state
                    setWeatherData(prevState => ({
                        ...prevState,
                        [location._id]: res.data
                    }));
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    };

    // Convert Kelvin to Fahrenheit
    const kelvinToFahrenheit = (kelvin) => {
        return ((kelvin - 273.15) * 9 / 5 + 32).toFixed(0); // reference to w3schools.com
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

    // Get the icon based on weather condition
    const getIconUrl = (condition) => {
        const iconCode = conditionIconMap[condition];
        if (iconCode) {
            return `http://openweathermap.org/img/wn/${iconCode}.png`;
        }
        return 'weather-icon'; // Return string if no icon code is found
    };

    const logoutHandler = () => {
        axios.post('http://localhost:8000/api/logoutUser', null, { withCredentials: true })
        .then((res) => {
            console.log(res.data.message);
        })
        .catch((err) => {
            console.log(err);
        })
    }


    // LOCATION DISPLAY


    return (
        <div className='locations-container'>
            <h2>Welcome, {returnUserInfo.firstName}</h2>
            <Link to={"/addLocation"}>
                <button className='add-location-btn'>New Location</button>
            </Link>
            <Link to={"/"}>
                <button className='logout-btn' onClick={logoutHandler}>Logout</button>
            </Link>
            <h2>Your Locations</h2>
            {locationList.map((location, index) => (
                <div className='display-all-bx' key={location._id}>
                    <h2 className='dashboard-location-hdr'>
                        {location.cityName}, {location.stateName}
                    </h2>
                    {/* Display one location weather data */}
                    {weatherData[location._id] && (
                        <>
                            <img src={getIconUrl(weatherData[location._id].weather[0].main)} alt="weather-icon" />
                            <div>
                                <p>Temperature: {kelvinToFahrenheit(weatherData[location._id].main.temp)}°F</p>
                                <p>Conditions: {weatherData[location._id].weather[0].main}</p>
                            </div>
                        </>
                    )}
                    <Link to={`/location/updateLocation/${location._id}`}>
                        <button className='edit-btn'>Edit</button>
                    </Link>
                    <Link to={`/location/${location._id}`}>
                        <button className='details-btn'>Location Details</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
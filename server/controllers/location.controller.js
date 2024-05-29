const Location = require('../models/location.model')
const axios = require('axios')

module.exports = {
    // Read All
    findAllLocations: (req, res) => {
        Location.find()
            .then((allLocations) => {
                res.status(200).json(allLocations)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    // Read One (Finding by _id)
    findOneLocation: (req, res) => {
        console.log(req.params);
        Location.findOne({_id: req.params.id})
            .then((oneLocation) => {
                res.status(200).json(oneLocation)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    // Create
    addLocation: (req, res) => {
        console.log(req.body);
        Location.create(req.body)
            .then((newLocation) => {
                res.status(201).json(newLocation)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    // Update (Finding by _id)
    updateLocation: (req, res) => {
        Location.findOneAndUpdate({ _id: req.params.id },
            req.body,
            { new: true, runValidators: true })
            .then((updatedLocation) => {
                res.json(updatedLocation)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    // Delete (Finding by _id)
    deleteLocation: (req, res) => {
        Location.deleteOne({_id: req.params.id})
            .then((result) => {
                res.status(201).json(result)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    // Get weather data by city name
    getWeatherData: async (req, res) => {
        const { cityName } = req.params;
        const apiKey = process.env.OPENWEATHER_API_KEY; // targets stored API key in .env file
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
            const weatherData = response.data;
            res.status(200).json(weatherData);
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
            res.status(500).json({ error: 'Failed to fetch weather data' });
        }
    },
    // Get forecast data by city name
    getForecastData: async (req, res) => {
        const { cityName } = req.params;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`);
            const forecastData = response.data;
            res.status(200).json(forecastData);
        }
        catch (error) {
            console.error('Error fetching forecast data:', error);
            res.status(500).json({ error: 'Failed to fetch forecast data' });
        }
    }
};



// Fetch weather data by latitude and longitude
// getWeather: async (req, res) => {
//     const { latitude, longitude } = req.params;
//     try {
//         const weatherData = await fetchWeatherData(latitude, longitude);
//         res.status(200).json(weatherData);
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Error fetching weather data' });
//     }
// },
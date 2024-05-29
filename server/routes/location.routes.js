const locationController = require('../controllers/location.controller')

module.exports = (app) => {
    app.get('/api/findAllLocations', locationController.findAllLocations)
    app.get('/api/findOneLocation/:id', locationController.findOneLocation)
    app.post('/api/addLocation', locationController.addLocation)
    app.put('/api/updateLocation/:id', locationController.updateLocation)
    app.delete('/api/deleteLocation/:id', locationController.deleteLocation)
    // Route to get weather data for a location
    app.get('/api/weather/:cityName', locationController.getWeatherData)
    app.get('/api/forecast/:cityName', locationController.getForecastData)
}
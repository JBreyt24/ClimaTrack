const UserController = require('../controllers/user.controller')

module.exports = (app) => {
    app.post('/api/registerUser', UserController.registerUser)
    app.post('/api/loginUser', UserController.loginUser)
    app.post('/api/logoutUser', UserController.logoutUser)
}
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

module.exports = {
    registerUser: async (req, res) => {
        try {
            // Check if the user already exists 
            const potentialUser = await User.findOne({ email: req.body.email })
            if (potentialUser) {
                res.status(500).json({ message: 'This email already exists please log in' })
            }
            else {
                const newUser = await User.create(req.body)
                const userToken = jwt.sign({ id: newUser._id, email: newUser.email }, secretKey, { expiresIn: '2h' })
                console.log(userToken);
                res.status(201).cookie('userToken', userToken, {httpOnly: true}).json(newUser)
            }
        }
        catch (err) {
            res.status(500).json({ error: err })
        }
    },
    loginUser: async (req, res) => {
        try {
            console.log(req.body)
            // Check if email exist in DB 
            const potentialUser = await User.findOne({ email: req.body.email })
            if (potentialUser) {
                // If it does, check if the password hash matches 
                const passwordsMatch = await bcrypt.compare(req.body.password, potentialUser.password)
                if (passwordsMatch) {
                    const userToken = jwt.sign({ id: potentialUser._id, email: potentialUser.email }, secretKey, { expiresIn: '2h' })
                    // Creating a variable to pull user info to front end
                    const returnUserInfo = {firstName: potentialUser.firstName, lastName: potentialUser.lastName}
                    res.status(201).cookie('userToken', userToken, { httpOnly: true }).json(returnUserInfo)
                }else{
                    res.status(500).json({message:'Invalid Email/Password'})
                }
            }else{
                res.status(500).json({message:'Invalid Email/Password'})
            }
        }
        catch (err) {
            res.status(500).json({ error: err })
        }
    },
    logoutUser: (req, res) => {
        console.log('COOKIES LOGOUT ', req.cookies);
        // console.log(req.signedCookies);
        res.clearCookie('userToken')
        res.status(200).json({message:'User Logged Out'})
    },
    // Save location for user
    // saveLocation: async (req, res) => {
    //     const { userId } = req.params;
    //     const { locationId } = req.body;

    //     try {
    //         const user = await User.findById(userId);
    //         if (!user) {
    //             return res.status(404).json({ error: 'User not found' });
    //         }

    //         // Add location to user's saved locations
    //         user.savedLocations.push(locationId);
    //         await user.save();

    //         res.status(200).json({ message: 'Location saved successfully' });
    //     } catch (error) {
    //         console.error('Error saving location:', error);
    //         res.status(500).json({ error: 'Failed to save location' });
    //     }
    // },
    // // Retrieve saved locations for user
    // getSavedLocations: async (req, res) => {
    //     const { userId } = req.params;

    //     try {
    //         const user = await User.findById(userId).populate('savedLocations');
    //         if (!user) {
    //             return res.status(404).json({ error: 'User not found' });
    //         }

    //         res.status(200).json(user.savedLocations);
    //     } catch (error) {
    //         console.error('Error retrieving saved locations:', error);
    //         res.status(500).json({ error: 'Failed to retrieve saved locations' });
    //     }
    // }

}
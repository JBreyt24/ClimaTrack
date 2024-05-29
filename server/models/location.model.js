const mongoose = require ('mongoose');

const LocationSchema = mongoose.Schema({
    cityName:{
        type:String,
        required: [true, "City is required"],
        minLength: [1, "City name must be at least 1 character long"],
        maxLength: [40, "City name cannot be more than 40 characters long"]
    },
    stateName:{
        type:String,
        required: [true, "State is required"],
        minLength: [1, "State name must be at least 1 character long"],
        maxLength: [40, "State name cannot be more than 40 characters long"]
    },
    zipCode:{
        type:Number,
        required: [true, "Zip Code is required"],
        minLength: [5, "Zip Code must be at least 5 characters long"],
        maxLength: [6, "Zip Code cannot be longer than 6 characters"]
    }
    
    // For created at and updated at
}, {timestamps:true} )

module.exports = mongoose.model('Location', LocationSchema);
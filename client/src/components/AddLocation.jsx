import React, {useState} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddLocation = (props) => {
    const{locationList, setLocationList} = props;

    const [cityName, setCityName] = useState("");
    const [stateName, setStateName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
        const newLocation = {cityName, stateName, zipCode}
        axios.post("http://localhost:8000/api/addLocation", newLocation)
            .then((res) => {
                console.log(res)
                console.log(res.data);
                // These next 3 lines will reset the form to empty on refresh or submit
                setCityName("");
                setStateName("");
                setZipCode("");
                setErrors({})
                // Using the spread operator(...) to make a copy of everything inside state
                setLocationList([...locationList, res.data])
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors)
            })
    }

    return (

        // ADD LOCATION FORM

        <div className='add-location-form'>
            <Link to={"/dashboard"}><button className='home-btn'>Home</button></Link>
            <h2>Add Location</h2>
            <form onSubmit={submitHandler}>

                <div className='form-fields'>
                    <label>City: </label>
                    <input type="text" onChange={(e) => setCityName(e.target.value)} value={cityName}/>
                    {
                    errors.cityName?
                    <p className='errors'>{errors.cityName.message}</p>:
                    null
                }
                </div>

                <br/>

                <div className='form-fields'>
                    <label>State: </label>
                    <input type="text" onChange={(e) => setStateName(e.target.value)} value={stateName}/>
                    {
                    errors.stateName?
                    <p className='errors'>{errors.stateName.message}</p>:
                    null
                }
                </div>

                <br/>

                <div className='form-fields'>
                    <label>ZIP Code: </label>
                    <input type="number" onChange={(e) => setZipCode(e.target.value)} value={zipCode}/>
                    {
                    errors.zipCode?
                    <p className='errors'>{errors.zipCode.message}</p>:
                    null
                }
                </div>

                <br/>

                <button className='submit-btn'>Add Location</button>

            </form>
        </div>
)}

export default AddLocation;
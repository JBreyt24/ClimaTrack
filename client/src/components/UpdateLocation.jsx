import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const UpdateLocation = (props) => {
    // Calling id from app.jsx from the routes
    const {id} = useParams();
    const [cityName, setCityName] = useState("");
    const [stateName, setStateName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/findOneLocation/${id}`)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setCityName(res.data.cityName)
            setStateName(res.data.stateName)
            setZipCode(res.data.zipCode)
        })
        .catch ((err) => {
            console.log(err);
        })

    }, [id])


    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/updateLocation/${id}`, {
            cityName,
            stateName,
            zipCode,
        })
        .then((res) => {
            console.log(res);
            console.log(res.data)
            navigate('/dashboard')
        })
        .catch ((err) => {
            console.log(err);
            setErrors(err.response.data.errors)
        })
    }

    return (

        // UPDATE FORM

        <div className='update-form'>
            <Link to={"/dashboard"}><button className='home-btn'>Home</button></Link>
            <Link to={`/location/${id}`}><button className='details-btn'>Location Details</button></Link>
            <h2>Update Location</h2>
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

                <button className='submit-btn'>Update</button>

            </form>

        </div>
    )
}

export default UpdateLocation;
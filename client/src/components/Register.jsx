import React, {useState} from 'react';
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

const Register = (props) => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})

    const submitHandler = (e) => {
        console.log('Submitted');
        e.preventDefault()
        const newUser = {firstName, lastName, email, password, confirmPassword}
        axios.post('http://localhost:8000/api/registerUser', newUser, {withCredentials:true})
            .then((res) => {
                console.log(res);
                navigate('/login')
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.message)
            })
    }

    //REGISTER FORM 

    return (
        <div className='register-form'>
            <Link to={'/login'} className='sign-up-link'>Already have an account? Click here to login!</Link>
            <h2>Register</h2>
            <form onSubmit={submitHandler}>

                <div className='form-fields'>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    {/* {
                    errors?.firstName && 
                    <p className="error">{errors.firstName.message}</p>
                    } */}
                </div>
                <div className='form-fields'>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className='form-fields'>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form-fields'>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='form-fields'>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button className='submit-btn'>Register</button>
            </form>
        </div>
)}

export default Register;
import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = ( props ) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        const loginUser = {email, password};
        axios.post('http://localhost:8000/api/loginUser', loginUser, {withCredentials:true})
            .then((res) => {
                console.log(res)
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.message)
            })
    }


    //LOGIN FORM 

    return (
        <div className='login-form'>
                <Link to={'/'} className='login-link'>Don't have an account? Click here to register!</Link>
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                {
                    errors.length > 0 ? 
                    <p className='errors'>{errors}</p> :
                    null
                }
                <div className='form-fields'>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form-fields'>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='submit-btn'>Login</button>
                <br />
            </form>
        </div>
    )
}

export default Login;
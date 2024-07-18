import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../firebase';
import './Form.css';

function Login({onSuccess, handleClose }) {
    const [user, setUser] = useState({
        email: '',
        password: '',
        userType: {
            creator: false,
            business: false,
        },
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setUser((prevState) => ({
                ...prevState,
                userType: {
                    ...prevState.userType,
                    [name]: checked,
                },
            }));
        } else {
            setUser((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        db.ref('users').orderByChild('email').equalTo(user.email).once('value', (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userKey = Object.keys(userData)[0];
                if (userData[userKey].password === user.password) {
                //     alert('Login Successful');
                    handleClose(); 
                    localStorage.setItem('user', JSON.stringify(userData[userKey]));
                    navigate('/');
                    window.location.reload();
                } else {
                    alert('Incorrect Password');
                }
            } else {
                alert('User not found');
            }
        });
    };

    

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            <label>
                Email
                <input type="email" name="email" value={user.email} onChange={handleChange} required />
            </label>
            <label>
                Password
                <input type="password" name="password" value={user.password} onChange={handleChange} required />
            </label>
            <div className='d-flex justify-content-around'>
                <label>
                    <input type="checkbox" name="creator" checked={user.userType.creator} onChange={handleChange} />
                    Creator
                </label>
                <label>
                    <input type="checkbox" name="business" checked={user.userType.business} onChange={handleChange} />
                    Business
                </label>
            </div>
            <div className='d-flex justify-content-center mt-24px'>
                <button className='register-btn' type="submit">Login</button>
            </div>
        </form>
    );
}

export default Login;
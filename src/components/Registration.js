import React, { useState } from 'react';
import db from '../firebase';
import './Form.css';
import { useNavigate } from 'react-router-dom';

function Registration({onSuccess, handleClose }) {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        userType: {
            creator: false,
            business: false,
        },
    });

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

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        db.ref('users').push(user, (err) => {
            if (err) {
                console.log(err);
            } else {
                onSuccess(user);
                setUser({
                    username: '',
                    email: '',
                    password: '',
                    userType: {
                        creator: false,
                        business: false,
                    },
                });
                navigate('/');
                window.location.reload();

            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="forms reg-center">
            <h2 style={{ color: 'purple' }}>Register</h2>
            <label>
                Username
                <input type="text" name="username" value={user.username} onChange={handleChange} required />
            </label>
            <label>
                Email
                <input type="email" name="email" value={user.email} onChange={handleChange} required />
            </label>
            <label>
                Password
                <input className='form-control' type="password" name="password" value={user.password} onChange={handleChange} required />
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
                <button className='register-btn' type="submit">Register</button>
            </div>
        </form>
    );
}

export default Registration;
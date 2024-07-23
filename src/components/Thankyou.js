import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Thankyou.css';
import thankYouImage from '../assests/images/thankyou.png';

function ThankYou() {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="thank-you-container">
            <img src={thankYouImage} alt="Thank You" className="thank-you-image" />
            <h1>Thank you for submitting the form!</h1>
            <p>We will get back to you soon.</p>
            <div className="button-container">
                <button onClick={handleBackToHome}>Back to Home</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default ThankYou;
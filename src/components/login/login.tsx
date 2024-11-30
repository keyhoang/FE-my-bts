// src/pages/Login.tsx
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from "../../services/api";
import "./login.css";
import Swal from "sweetalert2";

const Login: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        await login(phoneNumber).then(() =>
            navigate('/otp', {state: {phoneNumber}})
        ).catch(
            (error) => {
                if (error.response){
                    Swal.fire({
                        icon: "error",
                        title: error.response.data.message,
                        text: "Pls contact to admin.",
                        confirmButtonText: "OK",
                    });
                }
            }
        );
    };

    return (
        <div className="login-container">
            {/* Left Section */}
            <div className="login-left">
                <div className="login-logo">
                    <img src="/images/logo.png" alt="Logo" className="logo-image"/>
                </div>
                <div className="login-content">
                    <h1 className="login-title">Sign in</h1>
                    <p className="login-subtitle">Enter your number to access your account</p>
                    <div className="input-container">
            <span className="input-icon">
              📱
            </span>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <button className="login-button" onClick={handleLogin}>Send OTP</button>
                </div>
            </div>

            {/* Right Section */}
            <div className="login-right">
                <div className="login-background">
                    {/* Background Design */}
                    <img src="/images/login-banner.png" alt="Background" className="background-image"/>
                </div>
                <div className="login-logo-large">
                    <img src="/images/logo-large.png" alt="Large Logo"/>
                </div>
            </div>
        </div>
    );
};

export default Login;

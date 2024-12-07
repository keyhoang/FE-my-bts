// src/pages/Login.tsx
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from "../../services/api";
import "./login.css";
import Swal from "sweetalert2";
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
    const { t} = useTranslation('translation');
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleLogin(); // Submit khi nhấn Enter
        }
    };

    return (
        <div className="login-container">
            {/* Left Section */}
            <div className="login-left">
                <div className="login-logo">
                    <img src="/images/logo.png" alt="Logo" className="logo-image"/>
                </div>
                <div className="login-content">
                    <h1 className="login-title">{t('login-title')}</h1>
                    <p className="login-subtitle">{t('login-subtitle')}</p>
                    <div className="input-container">
            <span className="input-icon">
              📱
            </span>
                        <input
                            type="text"
                            className="input-field"
                            placeholder={t('login-input-hover')}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                    </div>

                    <button className="login-button" onClick={handleLogin}>{t('login-button')}</button>
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

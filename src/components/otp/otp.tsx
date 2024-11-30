// src/pages/Otp.tsx
import React, {useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {getUserInfo, verifyOtp} from "../../services/api";
import {setAccessToken, setCurrentUser} from "../../utils/auth";
import "./otp.css";
import Swal from "sweetalert2"; // Import SweetAlert2

const Otp: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const phoneNumber = location.state?.phoneNumber;
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [otp, setOtp] = useState(Array(4).fill(''));

    const handleInputChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Chỉ cho phép nhập số

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus(); // Chuyển sang ô tiếp theo
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                inputRefs.current[index - 1]?.focus(); // Chuyển về ô trước đó
            }
        }

        if (event.key === "Enter") {
            handleVerifyOtp(); // Submit khi nhấn Enter
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = event.clipboardData.getData('Text').slice(0, 4).split('');
        if (pasteData.every((char) => /^\d$/.test(char))) {
            setOtp((prev) =>
                prev.map((_, i) => pasteData[i] || '')
            );
            inputRefs.current[pasteData.length - 1]?.focus(); // Focus vào ô cuối cùng
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await verifyOtp(phoneNumber, otp.join('')) ;
            setAccessToken(response.data.data.token);
            setCurrentUser(await getUserInfo())
            navigate('/');
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "OTP Invalid",
                text: "Pls check OTP code again or contact to admin.",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="login-container">
            {/* Left Section */}
            <div className="login-left">
                <div className="login-logo">
                    <img src="/images/logo.png" alt="Logo" className="logo-image"/>
                </div>
                {/* Nội dung chính */}
                <div className="login-content">
                    {/* Phần bên trái */}
                    <div className="login-left">
                        <h1 className="login-title">Enter OTP</h1>
                        <p className="login-subtitle">A 4 digit code has been sent to {phoneNumber}</p>
                        <div className="otp-input-container">
                            {otp.map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className="otp-input"
                                    value={otp[index]}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                />
                            ))}
                        </div>
                        <button className="otp-button" onClick={handleVerifyOtp}>Login</button>

                    </div>
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

export default Otp;

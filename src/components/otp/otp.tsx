// src/pages/Otp.tsx
import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {getUserInfo, login, verifyOtp} from "../../services/api";
import {setAccessToken, setCurrentUser} from "../../utils/auth";
import "./otp.css";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";

const Otp: React.FC = () => {
    const { t} = useTranslation('translation');
    const location = useLocation();
    const navigate = useNavigate();
    const phoneNumber = location.state?.phoneNumber;
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [otp, setOtp] = useState(Array(4).fill(''));
    const [counter, setCounter] = useState(60); // Thời gian đếm ngược
    const [, setIsDisabled] = useState(false); // Trạng thái nút resend OTP


    const handleResendOTP = () => {
        resendOtp();
        setCounter(60); // Đặt thời gian đếm ngược 60 giây
        setIsDisabled(true); // Disable nút
    };

    const resendOtp = async () => {
        try {
            await login(phoneNumber);
            navigate('/otp', {state: {phoneNumber}});
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: t('otp_invalid'),
                text: t('otp_invalid_des'),
                confirmButtonText: "OK",
            });
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (counter > 0) {
            timer = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);
        } else {
            setIsDisabled(false); // Enable nút khi hết thời gian
        }
        return () => {
            if (timer) clearInterval(timer);
            if (counter === 60) inputRefs.current[0]?.focus();
        };
    }, [counter]);
    const handleInputChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Chỉ cho phép nhập số

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus(); // Chuyển sang ô tiếp theo
        }

        // Tự động submit nếu đã nhập đủ 4 ký tự
        if (newOtp.every((char) => char !== '') && newOtp.length === 4) {
            handleVerifyOtp(newOtp);
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                inputRefs.current[index - 1]?.focus(); // Chuyển về ô trước đó
            }
        }

        if (event.key === "Enter") {
            handleVerifyOtp(otp); // Submit khi nhấn Enter
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

    const handleVerifyOtp = async (otp : any|null) => {
        try {
            const response = await verifyOtp(phoneNumber,  otp.join('')) ;
            setAccessToken(response.data.data.token);
            setCurrentUser(await getUserInfo())
            navigate('/');
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: t('otp_invalid'),
                text: t('otp_invalid_des'),
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
                        <h1 className="login-title">{t('otp_title')}</h1>
                        <p className="login-subtitle">{t('otp_subtitle',{phoneNumber})} </p>
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
                        <button className="otp-button" onClick={() => handleVerifyOtp(otp)}>{t('otp_button')}</button>

                        <p>
                            {counter > 0
                                ? t('otp_counting',{counter})
                                : t('otp_counting2')}
                            {counter === 0 && (
                                <span
                                    onClick={handleResendOTP}
                                    style={{color: "blue", cursor: "pointer", textDecoration: "underline"}}
                                >
                                {t('otp_resend')}
                                </span>
                            )}
                        </p>
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

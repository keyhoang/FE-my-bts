import React, { useState} from 'react';
import {changeLanguage} from "../../i18n";
import {logout} from "../../utils/auth";
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const languages = [
        {name: "Myanmar", imagePath: "/images/Flag_of_Myanmar.png",lang : "my"},
        {name: "English", imagePath: "/images/Flag_us.png",lang: "en"},
    ];
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const change = (lang : string) => {
        console.log(lang)
        // Thay đổi ngôn ngữ của ứng dụng
        changeLanguage(lang)
        // Áp dụng lại ngôn ngữ (có thể cần làm mới giao diện)
        window.location.reload();
    };

    return (
        <div className='wrapper-header'>
            <div className='image-logo'>
                <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo"/>
            </div>

            <div className='icon-language'
                 onClick={toggleDropdown}
                 style={{cursor: "pointer"}}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1_198)">
                        <path
                            d="M34 18.0006C34 26.8637 26.8344 34.0158 17.9713 34C9.13072 33.9832 1.99888 26.839 2 17.9983C2.00112 9.13412 9.16445 1.98429 18.0298 2.00003C26.8715 2.01576 34 9.15661 34 18.0006ZM23.997 17.0844C23.7946 15.3183 23.6013 13.623 23.4135 11.9817C19.7442 11.9817 16.2154 11.9817 12.5786 11.9817C12.392 13.6657 12.2031 15.3576 12.012 17.0844C16.0546 17.0844 19.9454 17.0844 23.997 17.0844ZM11.9805 18.9213C12.1908 20.5458 12.4044 22.1117 12.591 23.68C12.6326 24.0274 12.7787 24.1072 13.1002 24.0892C14.1097 24.0319 15.1204 23.9599 16.1299 23.9667C18.376 23.9813 20.6222 24.0352 22.8683 24.0892C23.2056 24.0971 23.3798 24.0408 23.4191 23.6597C23.4754 23.1044 23.6282 22.558 23.6867 22.0016C23.7935 20.9876 23.8621 19.969 23.9486 18.9202C19.9589 18.9213 16.067 18.9213 11.9805 18.9213ZM22.8807 10.156C22.531 8.7193 22.0308 7.49281 21.2922 6.38773C20.8211 5.68286 20.2804 4.98587 19.6396 4.43951C18.5615 3.52218 17.3598 3.56377 16.2727 4.48673C15.7657 4.91729 15.3216 5.44341 14.9338 5.9864C14.058 7.21288 13.5522 8.61137 13.107 10.156C16.3975 10.156 19.5913 10.156 22.8807 10.156ZM22.884 25.8958C19.5902 25.7058 16.3896 25.6855 13.0969 25.9104C13.288 26.4702 13.4217 26.9547 13.6151 27.4145C14.2458 28.9187 14.9023 30.4172 16.2198 31.4729C17.4913 32.4925 18.7605 32.4543 19.9544 31.3357C21.508 29.881 22.259 27.9778 22.884 25.8958ZM10.7788 11.7692C9.17119 11.5612 7.58159 11.3623 5.99536 11.1464C5.66036 11.1003 5.46475 11.215 5.3557 11.5208C4.92738 12.7293 4.4586 13.9254 4.08649 15.1508C3.90213 15.7556 3.8965 16.4155 3.80769 17.0686C6.01785 17.0686 8.12233 17.0686 10.2021 17.0686C10.3966 15.2778 10.5877 13.5241 10.7788 11.7692ZM32.1788 17.0743C32.0518 15.3396 31.6561 13.741 30.9759 12.211C30.4892 11.1172 30.488 11.1149 29.3245 11.2555C27.9575 11.4207 26.5916 11.5905 25.2223 11.7591C25.4146 13.5353 25.6046 15.289 25.7968 17.0731C27.8945 17.0743 29.9979 17.0743 32.1788 17.0743ZM10.7765 24.2331C10.5854 22.4681 10.3966 20.7144 10.2043 18.9393C8.09647 18.9393 5.97962 18.9393 3.82681 18.9393C3.96733 20.9842 4.50132 22.8694 5.45126 24.6322C5.51534 24.7513 5.75141 24.8593 5.89306 24.8424C7.51976 24.6535 9.14421 24.4399 10.7765 24.2331ZM25.219 24.2275C26.8333 24.4377 28.4049 24.6344 29.9732 24.8514C30.3295 24.9009 30.5375 24.7907 30.6578 24.4579C31.0423 23.3911 31.4829 22.3422 31.8056 21.2574C32.0248 20.521 32.0844 19.7363 32.2215 18.9415C29.9968 18.9415 27.881 18.9415 25.7968 18.9415C25.6012 20.7301 25.4112 22.4704 25.219 24.2275ZM22.3242 4.46762C22.8132 5.39395 23.3157 6.23934 23.7159 7.13082C24.1173 8.02792 24.4174 8.97111 24.7907 9.97276C26.2577 9.80751 27.7495 9.63888 29.3504 9.45789C27.464 7.02627 25.1706 5.39957 22.3242 4.46762ZM13.5623 31.4571C12.9923 30.2441 12.3942 29.0041 11.8288 27.7495C11.5871 27.2133 11.568 26.4073 11.1722 26.1577C10.7642 25.9003 10.0211 26.1487 9.42751 26.2128C8.53378 26.3095 7.64342 26.4376 6.70922 26.5579C8.13806 28.6972 11.4803 31.0479 13.5623 31.4571ZM22.4478 31.4931C25.1718 30.5971 27.4651 28.9727 29.3526 26.5377C27.736 26.3589 26.2319 26.1925 24.9154 26.0475C24.0476 27.9631 23.2505 29.7225 22.4478 31.4931ZM11.1981 9.96827C11.577 8.96437 11.8782 8.02342 12.2841 7.12857C12.6865 6.23934 13.1947 5.39845 13.6983 4.45862C10.826 5.40182 8.5349 7.02852 6.64964 9.45789C8.25386 9.63776 9.74678 9.80526 11.1981 9.96827Z"
                            fill="#7C94B5"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1_198">
                            <rect width="32" height="32" fill="white" transform="translate(2 2)"/>
                        </clipPath>
                    </defs>
                </svg>
                {/* Dropdown */}
                {isDropdownOpen && (
                    <div
                        style={{
                            position: "absolute",
                            top: "65px",
                            right: 0,
                            width: "240px",
                            background: "white",
                            boxShadow: "0px 4px 8px rgba(124, 148, 181, 0.50)",
                            borderRadius: "16px",
                            zIndex: 1000,
                        }}
                    >
                        {languages.map((language, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: "16px",
                                    borderBottom: "1px solid #D5DEE8",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "16px",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    change(language.lang);
                                    setDropdownOpen(false);
                                }}
                            >
                                <img
                                    src={language.imagePath}
                                    alt={language.name}
                                    style={{width: "28px", height: "28px", borderRadius: "50%"}}
                                />
                                <div
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: 700,
                                        color: "#434343",
                                        fontFamily: "Nunito Sans",
                                    }}
                                >
                                    {language.name}
                                </div>
                            </div>
                        ))}
                        <div
                            style={{
                                padding: "16px",
                                borderBottom: "1px solid #D5DEE8",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                cursor: "pointer",
                                backgroundColor : "#FD6D1A"
                            }}
                            onClick={() => {
                                logout()
                                setDropdownOpen(false); // Đóng dropdown nếu cần
                                navigate('/login');
                            }}
                        >
                            <img
                                src="/images/logout_icon.jpg"
                                alt="Logout"
                                style={{ width: "28px", height: "28px", borderRadius: "50%" }}
                            />
                            <div
                                style={{
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    color: "#434343",
                                    fontFamily: "Nunito Sans",
                                }}
                            >
                                Logout
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Header;
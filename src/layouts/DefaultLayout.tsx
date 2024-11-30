import React, { ReactNode } from 'react';
import Header from '../components/Header/Header';
import { ToastContainer } from 'react-toastify';

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                hideProgressBar
                theme="light"
            />
            <div>
                <Header />
                {children}
            </div>
        </>
    );
}

export default DefaultLayout;

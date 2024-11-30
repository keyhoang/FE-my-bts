// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/protectedRoute';
import Login from "./components/login/login";
import Otp from "./components/otp/otp";
import Detail from "./components/Detail/detail";
import HomePage from './components/HomePage/HomePage';
import "./assets/main.scss"; 
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route
              path="/"
              element={
                <ProtectedRoute>
                    <HomePage/>
                </ProtectedRoute>
              }
          />
            <Route path="/ticket-detail/:id" element={<Detail />} />
        </Routes>
      </Router>
  );
};

export default App;

// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/protectedRoute';
import Login from "./components/login/login";
import Otp from "./components/otp/otp";
import HomePage from './pages/HomePage';

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
        </Routes>
      </Router>
  );
};

export default App;

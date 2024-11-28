// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/protectedRoute';
import Login from "./components/login/login";
import Otp from "./components/otp/otp";
import {Homepage} from "./components/Homepage/Homepage";

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
                  <Homepage />
                </ProtectedRoute>
              }
          />
        </Routes>
      </Router>
  );
};

export default App;

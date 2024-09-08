import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

function App() {

  return (
      <Router>
          <Routes>

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />

          </Routes>
      </Router>
  );
}

export default App;

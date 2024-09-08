import React from 'react';
import { BrowserRouter as Router, Route, Switch,Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  return (
      <Router>
          <Routes>
          <Switch>
              <Route path="/login" element={Login} />
              <Route path="/signup" element={Signup} />

              <Route path="/user-dashboard" element={UserDashboard} />
              <Route path="/admin-dashboard" element={AdminDashboard} />
          </Switch>
          </Routes>
      </Router>
  );
}

export default App;

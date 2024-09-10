import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import QuestionForm from "./components/Admin/QuestionForm.jsx";
import QuestionList from "./components/Admin/QuestionList.jsx";
import UpdateQuestion from './components/Admin/UpdateQuestion.jsx';

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/questionsList" element={<QuestionList />} />
              <Route path="/createQuestion" element={<QuestionForm />} />
              <Route path="/questions/update/:id" element={<UpdateQuestion />} />


              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />

          </Routes>
      </Router>
  );
}

export default App;

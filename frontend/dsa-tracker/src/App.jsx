import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import QuestionForm from "./components/Admin/QuestionForm.jsx";
import QuestionList from "./components/Admin/QuestionList.jsx";
import UpdateQuestion from './components/Admin/UpdateQuestion.jsx';
import userDashboard from "./components/User/userDashboard.jsx";
import ArticlePage from "./components/User/ArticlePage.jsx";


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
              <Route path="/question" element={userDashboard}/>
              <Route path="/article/:questionId" element={<ArticlePage />} />



              <Route path="/user-dashboard" element={<StudentDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />

          </Routes>
      </Router>
  );
}

export default App;

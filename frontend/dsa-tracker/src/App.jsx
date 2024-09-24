import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import Login from './pages/Auth/Login.jsx';
import Signup from './pages/Auth/Signup.jsx';
import Home from './pages/Home.jsx';
import QuestionForm from "./components/Admin/QuestionForm.jsx";
import QuestionList from "./components/Admin/QuestionList.jsx";
import UpdateQuestion from './components/Admin/updateQuestion.jsx';
import userDashboard from "./components/User/userDashboard.jsx";
import ArticlePage from "./components/User/ArticlePage.jsx";
import Dashboard from "./components/User/dashboard.jsx";
import ForgetPassword from "./pages/Auth/ForgetPassword.jsx";
import Notify from "./pages/Auth/notify.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import ChangedPassword from "./components/User/ChangedPassword.jsx";
import CompletionPieChart from "./components/User/CompletionPieChart.jsx";
import Navbar from "./components/Navbar.jsx";
import AboutUs from "./pages/company/AboutUs.jsx";
import ContactUs from "./pages/company/ContactUs.jsx";
import PrivacyPolicy from "./pages/company/PrivacyPolicy.jsx";
import TermsConditions from "./pages/company/TermsCondition.jsx";
import Blog from "./pages/resource/Blog.jsx";
import Faq from "./pages/resource/Faq.jsx";
import CareerTips from "./pages/resource/CareerTips.jsx";
import InterviewPreparation from "./pages/resource/InterviewPreparation.jsx";
import CodingChallenges from "./pages/resource/CodingChallenges.jsx";
import ErrorPage from "./pages/Error.jsx";
import AdminRoute from "./components/Admin/AdminRoute.jsx";




function App() {

  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/questionsList" element={<AdminRoute><QuestionList /> </AdminRoute>} />
              <Route path="/createQuestion" element={<AdminRoute> <QuestionForm /></AdminRoute>} />
              <Route path="/questions/update/:id" element={<AdminRoute> <UpdateQuestion /></AdminRoute>} />
              <Route path="/question" element={<userDashboard />}/>
              <Route path="/article/:questionId" element={<ArticlePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/forgetpassword" element={<ForgetPassword />}  />
              <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
              <Route path="/changed-password" element={<ChangedPassword />}/>
              <Route path="/notify" element={<Notify/>}/>
              <Route path="/pie" element={<CompletionPieChart />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
              <Route path="/terms-conditions" element={<TermsConditions />}/>
              <Route path="/blogs" element={<Blog />} />
              <Route path="/faqs" element={<Faq />} />
              <Route path="/career-tips" element={<CareerTips />}/>
              <Route path="/interview-preparation" element={<InterviewPreparation />}/>
              <Route path="/coding-challenges" element={<CodingChallenges />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/dashboard/:sheet" element={<StudentDashboard />} />
              <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>}/>


          </Routes>
      </Router>
  );
}

export default App;

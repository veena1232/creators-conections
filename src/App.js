import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ContactPage from './Pages/ContactPage';
import SuccessStoriesPage from './Pages/SucessStoriesPage';
import Navbar from './components/Navbar'; 
import './App.css'; 
import DashboardPage from './Pages/DashboardPage';
import ThankYouPage from './Pages/ThankYouPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/thankyou" element={<ThankYouPage/>} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import SentimentAnalysis from './pages/SentimentAnalysis';
import Papers from './pages/Papers';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/sentiment-analysis" element={<SentimentAnalysis />} />
          <Route path="/papers" element={<Papers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

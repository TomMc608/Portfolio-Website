import React, { useState } from 'react';
import axios from 'axios';
import './SentimentAnalysis.css';

const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://portfolio-website-ldsk.onrender.com/analyze', { text });
      setResult(response.data);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
  };

  return (
    <div className="sentiment-analysis">
      <h2>Sentiment Analysis Tool</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Enter text to analyze..."
        />
        <button type="submit">Analyze</button>
      </form>
      {result && (
        <div className="result">
          <h3>Analysis Result</h3>
          <p>Label: {result.label}</p>
          <p>Score: {result.score}</p>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;

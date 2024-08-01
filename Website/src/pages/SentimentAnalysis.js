import React, { useState } from 'react';
import './SentimentAnalysis.css';

const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      const response = await query({ inputs: text });
      console.log(response); // Output the response to the console
      setResult(response[0][0]); // Assuming the first item in the first array is the result you need
    } catch (error) {
      setError(error.message);
    }
  };

  const apiKey = process.env.REACT_APP_HUGGING_FACE_API_KEY;

  const query = async (data) => {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/lxyuan/distilbert-base-multilingual-cased-sentiments-student",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Error: ${response.status} - ${errorDetails.error}`);
    }

    const result = await response.json();
    return result;
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
      {error && <p className="error">Error: {error}</p>}
      {result && (
        <div className="result">
          <h3>Analysis Result</h3>
          <p>Label: {result.label}</p>
          <p>Score: {result.score.toFixed(2)}</p> {/* Display score with 2 decimal places */}
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;

import React from 'react';
import NeuralNetwork from './NeuralNetwork';

const Home = () => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: '100vh', width: '100vw', background: '#282c34' }}>
      <NeuralNetwork />
      <div style={{ position: 'absolute', zIndex: 1, color: '#fff', textAlign: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px' }}>
        <h2>Home Page</h2>
        <p>Welcome to my portfolio.</p>
      </div>
    </div>
  );
};

export default Home;

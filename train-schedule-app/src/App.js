import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllTrains from './AllTrains';
import SingleTrain from './SingleTrain';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllTrains />} />
        <Route path="/trains/:trainNumber" element={<SingleTrain />} />
      </Routes>
    </Router>
  );
};

export default App;

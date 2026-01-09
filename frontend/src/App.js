import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navigation';
import LecturasList from './components/LecturasList';
import CreateLectura from './components/CreateLectura';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Routes>
          <Route path="/" element={<LecturasList />} />
          <Route path="/crear" element={<CreateLectura />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

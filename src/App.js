import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/srilakshmi-tailors-spa">Home</Link>
        <Link to="/srilakshmi-tailors-spa/#/about">About</Link>
      </nav>
      <Routes>
        <Route path="/srilakshmi-tailors-spa" element={<Home />} />
        <Route path="/srilakshmi-tailors-spa/#/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;


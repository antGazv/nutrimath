import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Calc from './Calc';

function Navigation() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Calc" element={<Calc />} />
      </Routes>
    </Router>
  );
}

export default Navigation;
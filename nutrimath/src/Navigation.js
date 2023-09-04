import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import CalculadoraNutricional from './CalculadoraNutricional';

function Navigation() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/CalculadoraNutricional" element={<CalculadoraNutricional />} />
      </Routes>
    </Router>
  );
}

export default Navigation;
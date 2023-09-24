import './App.css';
import { Home } from './pages/Home.jsx';
import { Download } from './pages/Download.jsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  // TODO: add footer
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/download" element={<Download />} />
    </Routes>
  );
}

export default App;

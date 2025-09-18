import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail';
import Menu from './pages/Menu';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
           <Route path="/menu/:type" element={<Menu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App

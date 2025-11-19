/* Removed unused React default import; the new JSX transform doesn't require it */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AllProperties from './pages/AllProperties';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/imoveis" element={<Properties />} />
            <Route path="/imovel/:id" element={<PropertyDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/catalogo" element={<AllProperties />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
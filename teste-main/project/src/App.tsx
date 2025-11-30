/* Removed unused React default import; the new JSX transform doesn't require it */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Home from './página/Home';
import Properties from './página/imoveis';
import PropertyDetail from './página/imoveisdetalhes';
import Login from './página/Login';
import Register from './página/registro';
import Profile from './página/perfil';
import AllProperties from './página/Todosimoveis';

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
            <Route path="/Todosimoveis" element={<AllProperties />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
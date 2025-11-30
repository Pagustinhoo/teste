import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MapPin, Star, TrendingUp, Search } from 'lucide-react';

// ==================== DADOS DOS IMÓVEIS (tudo aqui dentro) ====================
const properties = [
  { id: 10, tipo: "Sobrado 3 quartos Los Angeles", valor: 1600, categoria: "aluguel", endereco: "Rua Chicago, 426 - Maringá - Paraná", area: 304, banheiros: 2, quartos: 3, image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", rating: 4.9 },
  { id: 2, tipo: "Apartamento 2 quartos centro", valor: 1270000, categoria: "venda", endereco: "Rua xv de novembro, 1000 - Curitiba - Paraná", area: 1831, banheiros: 1, quartos: 2, image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg", rating: 4.7 },
  { id: 3, tipo: "Apartamento 2 quartos centro", valor: 1150000, categoria: "venda", endereco: "Rua Alagoas, 1432 - Londrina - Paraná", area: 934, banheiros: 2, quartos: 2, image: "https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg", rating: 4.6 },
  { id: 4, tipo: "Sobrado 3 quartos Lagoa da Conceição", valor: 2200, categoria: "aluguel", endereco: "Rua das palmeiras, 410 - Florianópolis - Santa Catarina", area: 332, banheiros: 2, quartos: 3, image: "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg", rating: 4.9 },
  { id: 5, tipo: "Casa 2 quartos Paranaguamirim", valor: 520000, categoria: "venda", endereco: "Av. beira-mar, 291 - Joinville - Santa Catarina", area: 161, banheiros: 2, quartos: 2, image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg", rating: 4.8 },
  // ... (pode colar os outros imóveis se quiser, mas esses 5 já são suficientes para testar)
];

// ==================== PÁGINA HOME ====================
const Home = () => {
  const featured = [10, 2, 3, 4, 5].map(id => properties.find(p => p.id === id)!);

  return (
    <div className="min-h-screen">
      {/* HERO COM IMAGEM DE FUNDO */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'ur[](https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1920)' }} />
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Encontre o Imóvel dos <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Seus Sonhos</span></h1>
          <p className="text-2xl mb-8">HeyHouse — Mais de {properties.length} imóveis esperando por você</p>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Imóveis em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map(p => (
              <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all">
                <div className="relative group">
                  <img src={p.image} alt={p.tipo} className="w-full h-48 object-cover group-hover:scale-110 transition" />
                  <span className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-bold ${p.categoria === 'aluguel' ? 'bg-blue-600' : 'bg-green-600'} text-white`}>
                    {p.categoria.toUpperCase()}
                  </span>
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {p.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{p.tipo}</h3>
                  <p className="text-gray-600 flex items-center gap-2"><MapPin className="w-4" /> {p.endereco}</p>
                  <p className="text-3xl font-bold text-blue-600 mt-4">
                    R$ {p.valor.toLocaleString('pt-BR')}{p.categoria === 'aluguel' && '/mês'}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600 mt-4">
                    <span>{p.quartos} quartos</span>
                    <span>{p.banheiros} banheiros</span>
                    <span>{p.area} m²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/todos" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 inline-flex items-center gap-3">
              Ver Todos os Imóveis <TrendingUp />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==================== PÁGINA TODOS OS IMÓVEIS ====================
const TodosImoveis = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Todos os Imóveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all">
              <div className="relative group">
                <img src={p.image} alt={p.tipo} className="w-full h-48 object-cover group-hover:scale-110 transition" />
                <span className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-bold ${p.categoria === 'aluguel' ? 'bg-blue-600' : 'bg-green-600'} text-white`}>
                  {p.categoria.toUpperCase()}
                </span>
                {p.rating && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {p.rating}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{p.tipo}</h3>
                <p className="text-gray-600 flex items-center gap-2 text-sm"><MapPin className="w-4" /> {p.endereco}</p>
                <p className="text-3xl font-bold text-blue-600 mt-4">
                  R$ {p.valor.toLocaleString('pt-BR')}{p.categoria === 'aluguel' && '/mês'}
                </p>
                <div className="flex justify-between text-sm text-gray-600 mt-4">
                  <span>{p.quartos} quartos</span>
                  <span>{p.banheiros} banheiros</span>
                  <span>{p.area} m²</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== APP PRINCIPAL ====================
function App() {
  return (
    <Router>
      <div className="font-sans">
        <nav className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold text-blue-600">HeyHouse</Link>
            <div className="space-x-8">
              <Link to="/" className="text-lg hover:text-blue-600">Início</Link>
              <Link to="/todos" className="text-lg hover:text-blue-600">Todos os Imóveis</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodosImoveis />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
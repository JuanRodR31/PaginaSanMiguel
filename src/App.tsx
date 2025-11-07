import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Players from './pages/Players';
import Events from './pages/Events';
import Videos from './pages/Videos';
import Donate from './pages/Donate';
import Login from './pages/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'players':
        return <Players />;
      case 'events':
        return <Events />;
      case 'videos':
        return <Videos />;
      case 'donate':
        return <Donate />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main>{renderPage()}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

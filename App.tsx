
import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import HomePage from './components/pages/HomePage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ExplorePage from './components/pages/ExplorePage';
import ServicesPage from './components/pages/ServicesPage';
import ReferralsPage from './components/pages/ReferralsPage';
import ProfilePage from './components/pages/ProfilePage';
import ComparteContenidoPage from './components/pages/ComparteContenidoPage';
import DiscreetPaymentsPage from './components/pages/DiscreetPaymentsPage';
import VerificationPage from './components/pages/VerificationPage';
import PremiumPage from './components/pages/PremiumPage';
import AgeVerificationModal from './components/AgeVerificationModal';
import PanicButton from './components/common/PanicButton';
import { Page } from './types';
import EntryGate from './components/EntryGate';
import LoginPage from './components/auth/LoginPage';

const App: React.FC = () => {
  const [userInteracted, setUserInteracted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showAgeGate, setShowAgeGate] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (userInteracted) {
      const splashTimer = setTimeout(() => {
        setShowSplash(false);
      }, 2000); // Splash screen for 2 seconds

      return () => clearTimeout(splashTimer);
    }
  }, [userInteracted]);
  
  const handleRegisterClick = () => setLoginOpen(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onRegisterClick={handleRegisterClick} />;
      case 'explore':
        return <ExplorePage />;
      case 'comparte_contenido':
        return <ComparteContenidoPage />;
      case 'discreet_payments':
        return <DiscreetPaymentsPage />;
      case 'verification':
        return <VerificationPage />;
      case 'premium':
        return <PremiumPage onNavigate={setCurrentPage} onRegisterClick={handleRegisterClick} />;
      case 'services':
        return <ServicesPage />;
      case 'referrals':
        return <ReferralsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={setCurrentPage} onRegisterClick={handleRegisterClick} />;
    }
  };

  if (!userInteracted) {
    return <EntryGate onEnter={() => setUserInteracted(true)} />;
  }

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="bg-brand-purple-dark min-h-screen text-white font-body relative">
      {/* Mandatory Age Verification Modal (+18) */}
      {showAgeGate && (
        <AgeVerificationModal
          onConfirm={() => setShowAgeGate(false)}
          onDecline={() => {
            alert('Debes ser mayor de 18 años para acceder a Mamacitos.');
            setUserInteracted(false);
            setShowSplash(true);
          }}
        />
      )}

      {/* Floating Emergency Panic Button */}
      <PanicButton />

      <Header onNavigate={setCurrentPage} current_page={currentPage} onRegisterClick={handleRegisterClick} />
      <main className="min-h-[80vh]">
        {renderPage()}
      </main>
      <Footer />
      {isLoginOpen && <LoginPage onClose={() => setLoginOpen(false)} />}
    </div>
  );
};

export default App;
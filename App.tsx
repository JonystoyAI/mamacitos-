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
import BlogPage from './components/pages/BlogPage';
import EditorialProfileView from './components/profile/EditorialProfileView';
import AgeVerificationModal from './components/AgeVerificationModal';
import PanicButton from './components/common/PanicButton';
import DiscretionModeBanner from './components/common/DiscretionModeBanner';
import { Page, Profile } from './types';
import EntryGate from './components/EntryGate';
import LoginPage from './components/auth/LoginPage';

const App: React.FC = () => {
  const [userInteracted, setUserInteracted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showAgeGate, setShowAgeGate] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isLoginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (userInteracted) {
      const splashTimer = setTimeout(() => {
        setShowSplash(false);
      }, 2000); // Splash screen for 2 seconds
      return () => clearTimeout(splashTimer);
    }
  }, [userInteracted]);

  // Scroll to top smoothly when switching pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleRegisterClick = () => setLoginOpen(true);

  const handleViewProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setCurrentPage('view_profile');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onRegisterClick={handleRegisterClick} />;
      case 'explore':
        return <ExplorePage onViewProfile={handleViewProfile} onNavigate={setCurrentPage} />;
      case 'blog':
        return (
          <BlogPage
            onNavigate={setCurrentPage}
            onViewProfile={(_authorId) => {
              setCurrentPage('view_profile');
            }}
          />
        );
      case 'view_profile':
        return (
          <EditorialProfileView
            profile={selectedProfile || undefined}
            onBack={() => setCurrentPage('explore')}
            onNavigateToBlog={() => setCurrentPage('blog')}
          />
        );
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
        return <ProfilePage onNavigate={setCurrentPage} />;
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

      {/* Floating Discretion Mode Privacy Layer Notification */}
      <DiscretionModeBanner />

      {/* Header bar (only hidden in the immersive editorial profile view if requested, or shown with consistent navigation) */}
      {currentPage !== 'view_profile' && (
        <Header onNavigate={setCurrentPage} current_page={currentPage} onRegisterClick={handleRegisterClick} />
      )}

      <main className="min-h-[80vh] overflow-x-hidden">
        <div key={currentPage} className="animate-page-fade-in">
          {renderPage()}
        </div>
      </main>

      {currentPage !== 'view_profile' && <Footer />}

      {isLoginOpen && <LoginPage onClose={() => setLoginOpen(false)} />}
    </div>
  );
};

export default App;
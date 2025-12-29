
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Deliverables from './components/Deliverables';
import BonusSection from './components/BonusSection';
import PricingCTA from './components/PricingCTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <Deliverables />
        <BonusSection />
        <PricingCTA />
      </main>

      <Footer />
    </div>
  );
};

export default App;

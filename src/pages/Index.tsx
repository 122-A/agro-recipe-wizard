
import React from 'react';
import Header from '@/components/Header';
import EducationalBanner from '@/components/EducationalBanner';
import ReceituarioForm from '@/components/ReceituarioForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <EducationalBanner />
      <main className="py-8">
        <div className="container mx-auto">
          <ReceituarioForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;


import React from 'react';
import { Leaf, Users } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Leaf className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AgroRA</h1>
              <p className="text-green-100 text-sm">Receituário Agronômico Digital</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-4 w-4" />
            <span>Hackathon Agro 4.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

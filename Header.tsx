
import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <i className="fa-solid fa-cloud-bolt text-lg"></i>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Nexus Cloud
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Products</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Solutions</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
          </div>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;

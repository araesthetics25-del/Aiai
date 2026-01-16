
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 relative selection:bg-blue-100">
      <Header />
      
      <main>
        <Hero />
        
        {/* Features Section Demo */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Optimized global edge networks ensure your users experience zero latency, no matter where they are.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Zero-Trust Security</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Military-grade encryption and automated threat detection keep your sensitive data locked tight.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-purple-200 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-brain"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">AI Powered</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Smart auto-scaling and predictive analytics built directly into your infrastructure dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-slate-800 pt-12">
          <p className="text-sm">© 2025 Nexus Cloud Solutions. All rights reserved.</p>
        </div>
      </footer>

      {/* Chat Toggle Button */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-50 group ${
          isChatOpen ? 'bg-slate-800 rotate-90 scale-90' : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'
        }`}
      >
        {isChatOpen ? (
          <i className="fa-solid fa-xmark text-white text-2xl"></i>
        ) : (
          <div className="relative">
            <i className="fa-solid fa-message text-white text-2xl group-hover:animate-pulse"></i>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Dialog */}
      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default App;

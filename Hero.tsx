
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full blur-[128px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8">
          Next Gen Cloud Platform
        </span>
        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Scaling Infrastructure <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            with Intelligence.
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed">
          The ultimate suite of cloud services designed for speed, security, and smart analytics. Manage everything from one intuitive interface.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
            Start Free Trial
          </button>
          <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all">
            View Documentation
          </button>
        </div>

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10 h-32 bottom-0"></div>
          <img 
            src="https://picsum.photos/seed/dashboard/1200/600" 
            alt="Dashboard Preview" 
            className="w-full max-w-5xl mx-auto rounded-3xl shadow-2xl border border-white/50"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

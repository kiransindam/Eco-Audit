import React from 'react';
import { Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-8 px-4 md:px-0">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-[#00F5A8] blur-md opacity-40 rounded-full animate-pulse"></div>
          <div className="bg-white/10 p-2.5 rounded-xl border border-white/20 relative z-10">
            <Leaf className="w-6 h-6 text-[#00F5A8]" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">EcoAudit</h1>
          <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Enterprise AI Auditor</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
        <span className="hover:text-white transition-colors cursor-pointer">How it works</span>
        <span className="hover:text-white transition-colors cursor-pointer">Enterprise</span>
        <button className="px-4 py-2 rounded-lg border border-white/10 hover:border-[#00F5A8] hover:text-[#00F5A8] transition-all bg-white/5">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
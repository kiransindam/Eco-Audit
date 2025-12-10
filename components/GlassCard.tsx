import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div
      className={`
        glass-panel rounded-2xl p-6 shadow-2xl relative overflow-hidden
        transition-all duration-300 ease-out
        ${hoverEffect ? 'hover:bg-white/5 hover:border-[#00F5A8]/30 hover:shadow-[#00F5A8]/10' : ''}
        ${className}
      `}
    >
      {/* Subtle sheen effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 pointer-events-none transition-opacity duration-500 hover:opacity-100" />
      {children}
    </div>
  );
};

export default GlassCard;
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`relative group ${className || ''}`}>
      <div className="relative flex items-center space-x-2">
        {/* Icon */}
        <div className="relative w-8 h-8 bg-primary rounded-sm transform rotate-45 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[225deg]">
          <div className="absolute inset-1 bg-white rounded-sm transform -rotate-45 flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-full" />
          </div>
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-secondary transform -rotate-45 group-hover:scale-x-110 transition-transform duration-300" />
        </div>

        {/* Text */}
        <div className="flex items-baseline">
          <span className="text-[1.7rem] font-commissioner font-bold tracking-wide text-primary">
            SPEED
          </span>
          <span className="text-[1.3rem] font-commissioner font-medium tracking-[0.2em] text-primary/80 uppercase ml-0.5 pt-0.5">
            ISHA
          </span>
        </div>

        {/* Hover Effects */}
        <div className="absolute -inset-1 -z-10 opacity-0 group-hover:opacity-100 transition-all duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 blur-xl" />
        </div>

        {/* Bottom Line */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </div>
  );
};

export default Logo;
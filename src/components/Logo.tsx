
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  type?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  variant = 'dark',
  type = 'full'
}) => {
  const sizes = {
    xs: 'h-6 md:h-8',
    sm: 'h-10 md:h-12',
    md: 'h-16 md:h-24',
    lg: 'h-28 md:h-40',
    xl: 'h-48 md:h-72'
  };

  const colors = {
    navy: '#112643',
    gold: '#c19a5b',
    white: '#ffffff'
  };

  const paraguayColor = variant === 'light' ? colors.white : colors.navy;
  const accentColor = colors.gold;

  if (type === 'icon') {
    return (
      <div className={`flex items-center justify-center ${sizes[size]} ${className}`}>
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-full w-auto"
          role="img"
          aria-labelledby="logo-icon-title"
        >
          <title id="logo-icon-title">Paraguay Concierge Icon</title>
          <g transform="translate(50, 50) scale(0.9)">
            <path d="M-30 30 L30 -30" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
            <path d="M22 -30 L30 -30 L30 -22" fill={accentColor} />
            <path d="M-28 18 L-15 31" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
            <path d="M-23 13 L-10 26" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
            <path d="M-18 8 L-5 21" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${sizes[size]} ${className}`}>
      <svg 
        viewBox="0 0 240 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto"
        role="img"
        aria-labelledby="logo-full-title"
      >
        <title id="logo-full-title">Paraguay Concierge Official Logo</title>
        {/* The Arrow (Top) */}
        <g transform="translate(120, 45) scale(1.1)">
          <path d="M-35 35 L35 -35" stroke={accentColor} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M25 -35 L35 -35 L35 -25" fill={accentColor} />
          <path d="M-32 20 L-18 34" stroke={accentColor} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M-26 14 L-12 28" stroke={accentColor} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M-20 8 L-6 22" stroke={accentColor} strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* Text: Paraguay */}
        <text 
          x="120" 
          y="125" 
          textAnchor="middle" 
          fill={paraguayColor} 
          style={{ font: 'bold 44px "Playfair Display", serif' }}
        >
          Paraguay
        </text>

        {/* Divider */}
        <line x1="50" y1="142" x2="190" y2="142" stroke={accentColor} strokeWidth="2" />

        {/* Text: Concierge */}
        <text 
          x="120" 
          y="178" 
          textAnchor="middle" 
          fill={accentColor} 
          style={{ font: 'italic 34px "Playfair Display", serif' }}
        >
          Concierge
        </text>
      </svg>
    </div>
  );
};

export default Logo;

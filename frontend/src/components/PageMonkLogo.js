// Create a simple PageMonk logo component
import React from 'react';

const PageMonkLogo = ({ className = "w-8 h-8", dark = false }) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Llama body */}
        <ellipse 
          cx="35" 
          cy="50" 
          rx="15" 
          ry="35" 
          fill={dark ? "#8B4513" : "#000000"}
        />
        
        {/* Llama head */}
        <ellipse 
          cx="35" 
          cy="25" 
          rx="12" 
          ry="15" 
          fill={dark ? "#000000" : "#8B4513"}
          stroke={dark ? "#8B4513" : "#000000"}
          strokeWidth="2"
        />
        
        {/* Ears */}
        <ellipse 
          cx="28" 
          cy="15" 
          rx="4" 
          ry="8" 
          fill={dark ? "#8B4513" : "#000000"}
          transform="rotate(-20 28 15)"
        />
        <ellipse 
          cx="42" 
          cy="15" 
          rx="4" 
          ry="8" 
          fill={dark ? "#8B4513" : "#000000"}
          transform="rotate(20 42 15)"
        />
        
        {/* Eyes */}
        <path 
          d="M30 22 C30 20, 32 20, 32 22" 
          stroke={dark ? "#8B4513" : "#000000"} 
          strokeWidth="1.5" 
          fill="none"
        />
        <path 
          d="M38 22 C38 20, 40 20, 40 22" 
          stroke={dark ? "#8B4513" : "#000000"} 
          strokeWidth="1.5" 
          fill="none"
        />
        
        {/* Nose */}
        <circle 
          cx="35" 
          cy="27" 
          r="1" 
          fill={dark ? "#8B4513" : "#000000"}
        />
        
        {/* Text - simplified */}
        <text 
          x="65" 
          y="35" 
          fontSize="14" 
          fontWeight="bold" 
          fill={dark ? "#8B4513" : "#000000"}
          fontFamily="Arial, sans-serif"
        >
          P
        </text>
        <text 
          x="65" 
          y="55" 
          fontSize="14" 
          fontWeight="bold" 
          fill={dark ? "#8B4513" : "#000000"}
          fontFamily="Arial, sans-serif"
        >
          M
        </text>
      </svg>
    </div>
  );
};

export default PageMonkLogo;
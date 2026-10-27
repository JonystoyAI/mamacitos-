import React from 'react';

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  style, 
  id = 'Capa_1',
  alt = 'Mamacitos'
}) => {
  return (
    <img 
      id={id}
      src="/assets/aistudio/loco-sitio-mamacitos_aa765503.png" 
      alt={alt}
      className={`object-contain ${className}`}
      style={style}
    />
  );
};

export default Logo;

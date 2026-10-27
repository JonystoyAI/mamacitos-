import React from 'react';

interface SiteIconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showPulse?: boolean;
  alt?: string;
}

const sizeClasses = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-14 h-14'
};

const SiteIcon: React.FC<SiteIconProps> = ({
  className = '',
  size = 'md',
  showPulse = false,
  alt = 'Mamacitos Icon'
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {showPulse && (
        <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
      )}
      <img
        src="/assets/aistudio/icono-del-sitio_c366d75b.png"
        alt={alt}
        className={`${sizeClasses[size]} object-contain drop-shadow`}
      />
    </div>
  );
};

export default SiteIcon;

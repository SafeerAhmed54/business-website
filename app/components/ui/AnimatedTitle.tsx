"use client";

import React from 'react';

interface AnimatedTitleProps {
  children: React.ReactNode;
  variant?: 'default' | 'double' | 'gradient';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function AnimatedTitle({ 
  children, 
  variant = 'default',
  className = '',
  as: Component = 'h2'
}: AnimatedTitleProps) {
  const getVariantClass = () => {
    switch (variant) {
      case 'double':
        return 'animated-line-double';
      case 'gradient':
        return 'animated-line text-gradient-green';
      default:
        return 'animated-line';
    }
  };

  return (
    <Component className={`${getVariantClass()} ${className}`}>
      {children}
    </Component>
  );
}
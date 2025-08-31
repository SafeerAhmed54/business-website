import React from 'react';
import { cn } from '@/app/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', padding = 'lg', container = true, children, ...props }, ref) => {
    const baseStyles = 'w-full';
    
    const variants = {
      default: 'bg-white',
      primary: 'bg-blue-50',
      secondary: 'bg-orange-50',
      dark: 'bg-gray-900 text-white'
    };

    const paddings = {
      none: '',
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-24'
    };

    const content = container ? (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    ) : (
      children
    );

    return (
      <section
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          className
        )}
        ref={ref}
        {...props}
      >
        {content}
      </section>
    );
  }
);

Section.displayName = 'Section';

// Section sub-components for better composition
const SectionHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-center mb-12', className)}
      {...props}
    />
  )
);
SectionHeader.displayName = 'SectionHeader';

const SectionTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-3xl md:text-4xl font-bold text-gray-900 mb-4', className)}
      {...props}
    />
  )
);
SectionTitle.displayName = 'SectionTitle';

const SectionSubtitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-lg text-gray-600 max-w-3xl mx-auto', className)}
      {...props}
    />
  )
);
SectionSubtitle.displayName = 'SectionSubtitle';

const SectionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('', className)}
      {...props}
    />
  )
);
SectionContent.displayName = 'SectionContent';

export { Section, SectionHeader, SectionTitle, SectionSubtitle, SectionContent };
export type { SectionProps };
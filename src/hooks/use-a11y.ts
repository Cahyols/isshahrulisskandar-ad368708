
import { useEffect } from 'react';

export const useA11y = () => {
  useEffect(() => {
    // Add skip-to-content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-background z-50 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary';
    skipLink.textContent = 'Skip to content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhance focus styles
    const style = document.createElement('style');
    style.textContent = `
      :focus {
        outline: 2px solid hsl(var(--primary)) !important;
        outline-offset: 2px !important;
      }
      
      .focus-visible:focus:not(:focus-visible) {
        outline: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Improve image accessibility
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
      if (img instanceof HTMLImageElement) {
        console.warn('Image missing alt text:', img.src);
        img.alt = ''; // Empty alt for decorative images
      }
    });
    
    return () => {
      if (skipLink.parentNode) {
        skipLink.parentNode.removeChild(skipLink);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);
  
  return null;
};

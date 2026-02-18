'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Reset navigation state when route changes
    const handleRouteChange = () => {
      setIsNavigating(false);
    };

    // Set a timeout to ensure loading never gets stuck
    let timeout;
    if (isNavigating) {
      timeout = setTimeout(() => {
        setIsNavigating(false);
      }, 5000); // Force clear after 5 seconds
    }

    handleRouteChange();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [pathname, searchParams]);

  // Listen for link clicks to show progress
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.href && !target.target && !e.ctrlKey && !e.metaKey) {
        const url = new URL(target.href);
        if (url.origin === window.location.origin && url.pathname !== pathname) {
          setIsNavigating(true);
        }
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname]);

  if (!isNavigating) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-blue-600"
      style={{
        animation: 'progressBar 2s ease-in-out infinite',
      }}
    >
      <style jsx>{`
        @keyframes progressBar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Mobile Navigation Fix
 * Handles issues where navigation gets stuck on mobile devices
 * This hook ensures scroll reset and cleanup on route changes
 */
export function useMobileNavigationFix() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change (important for mobile)
    window.scrollTo(0, 0);

    // Force reflow to ensure DOM is updated
    document.body.offsetHeight;

    // Clear any stuck loading states after navigation
    const clearLoadingTimeout = setTimeout(() => {
      // Remove any stuck loading overlays
      const loadingOverlays = document.querySelectorAll('[data-loading-overlay]');
      loadingOverlays.forEach(overlay => {
        if (overlay && overlay.parentNode) {
          overlay.remove();
        }
      });
    }, 100);

    return () => {
      clearTimeout(clearLoadingTimeout);
    };
  }, [pathname]);
}

/**
 * Mobile Navigation Guard Component
 * Place this in your layout to automatically handle mobile navigation issues
 */
export default function MobileNavigationGuard({ children }) {
  useMobileNavigationFix();

  return <>{children}</>;
}

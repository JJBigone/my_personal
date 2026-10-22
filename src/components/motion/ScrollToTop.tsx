import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Route-aware scroll manager:
 * - Resets scroll to top when pathname changes on regular navigation (PUSH/REPLACE).
 * - Preserves native scroll position on browser Back/Forward (POP).
 * - Smoothly scrolls to target element if a hash is present.
 * - Does NOT trigger on query param or search filter changes.
 */
export const ScrollToTop: React.FC = () => {
  const location = useLocation();
  const navType = useNavigationType();
  const prevPathname = useRef<string>(location.pathname);

  useEffect(() => {
    // If only query params or state changed, do not reset scroll
    if (prevPathname.current === location.pathname && !location.hash) {
      return;
    }

    prevPathname.current = location.pathname;

    // If there is an anchor hash, scroll to that element
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    // On POP navigation (browser Back / Forward), let browser restore scroll
    if (navType === 'POP') {
      return;
    }

    // Otherwise scroll smoothly to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [location.pathname, location.hash, navType]);

  return null;
};

export default ScrollToTop;

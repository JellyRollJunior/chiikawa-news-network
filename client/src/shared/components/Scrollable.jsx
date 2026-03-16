import SimpleBar from 'simplebar-react';
import { useEffect, useRef } from 'react';

const Scrollable = ({ className = '', onReachBottom, children }) => {
  const sentinelRef = useRef(null);
  const callbackRef = useRef(onReachBottom);

  // Ensures onReachBottom is latest value without rerendering component
  useEffect(() => {
    callbackRef.current = onReachBottom;
  }, [onReachBottom]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    const observerOptions = {
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('intersecting');
          callbackRef.current?.();
        }
      });
    }, observerOptions);

    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  return (
    <SimpleBar className={`h-full min-h-0 ${className}`}>
      {children}
      <div className="h-1" ref={sentinelRef} />
    </SimpleBar>
  );
};

export { Scrollable };

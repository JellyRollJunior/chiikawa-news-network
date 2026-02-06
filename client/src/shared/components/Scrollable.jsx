import SimpleBar from 'simplebar-react';
import { useEffect, useRef } from 'react';

const Scrollable = ({ className = '', onScrollToBottom, children }) => {
  const containerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const sentinel = sentinelRef.current;

    const observerOptions = {
      root: container,
      rootMargin: '0px',
      threshhold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onScrollToBottom();
        }
      });
    }, observerOptions);

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [onScrollToBottom]);

  return (
    <SimpleBar className={`h-full ${className}`}>
      <div className='h-full' ref={containerRef}>
        {children}
        <div className="h-1" ref={sentinelRef}></div>
      </div>
    </SimpleBar>
  );
};

export { Scrollable };

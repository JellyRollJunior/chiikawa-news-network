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
    <div
      className={`scrollbar-thin h-full overflow-y-scroll ${className}`}
      ref={containerRef}
    >
      {children}
      <div className="h-1" ref={sentinelRef}></div>
    </div>
  );
};

export { Scrollable };

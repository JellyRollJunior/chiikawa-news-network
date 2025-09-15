import { useState } from 'react';

const Avatar = ({ className, avatar, secondaryStyling = false }) => {
  const [error, setError] = useState(false);

  return (
    <div
      className={`shrink-0 overflow-clip rounded-full border-1 border-pink-300 bg-pink-50 ${className} ${secondaryStyling ? 'block-shadow border-yellow-500 bg-yellow-50' : ''}`}
    >
      {!error && avatar && (
        <img
          className="h-full w-full border-none object-cover"
          src={avatar}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

export { Avatar };

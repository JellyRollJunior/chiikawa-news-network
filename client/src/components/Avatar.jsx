import { useState } from 'react';

const Avatar = ({ avatar, size = 4 }) => {
  const [error, setError] = useState(false);

  return (
    <div
      style={{ height: `${size}rem`, width: `${size}rem` }}
      className="border-1 shrink-0 overflow-clip rounded-full border-amber-900 bg-pink-50"
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

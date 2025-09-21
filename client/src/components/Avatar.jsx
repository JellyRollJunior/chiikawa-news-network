import { useState } from 'react';

const Avatar = ({ className, avatar, background = 'pink-50' }) => {
  const [error, setError] = useState(false);

  return (
    // ${secondaryStyling ? 'block-shadow border-yellow-500 bg-yellow-50' : ''}
    <div
      className={`shrink-0 overflow-clip rounded-full border-3 border-dashed border-white p-0.5 ${className}`}
    >
      <div className={`size-full overflow-clip rounded-full bg-${background}`}>
        {!error && avatar && (
          <img
            className="size-full object-cover"
            src={avatar}
            onError={() => setError(true)}
          />
        )}
      </div>
    </div>
  );
};

export { Avatar };

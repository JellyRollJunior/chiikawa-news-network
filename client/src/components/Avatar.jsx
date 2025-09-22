import { useState } from 'react';

const Avatar = ({ className, avatar, background = 'pink-100' }) => {
  const [error, setError] = useState(false);

  return (
    <div
      className={`${className} shrink-0 overflow-clip rounded-full border-3 border-dashed  p-0.5`}
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

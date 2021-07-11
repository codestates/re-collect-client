import React, { useState, useEffect } from 'react';

export default function Toast({ text, dismissTime }) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (mounted) {
        setIsFading(true);
      }
    }, dismissTime - 500);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`notification__toast ${isFading ? 'fade-out' : ''}`}>
      {text}
    </div>
  );
}

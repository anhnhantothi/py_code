// src/components/TypingEffect.tsx
import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  pause?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 100,
  pause = 1000,
}) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let cancelled = false;
    let timer: number;

    const typeChar = (index: number) => {
      if (cancelled) return;
      setDisplayed(text.slice(0, index + 1));
      if (index + 1 < text.length) {
        timer = window.setTimeout(() => typeChar(index + 1), speed);
      } else {
        timer = window.setTimeout(() => {
          if (!cancelled) {
            setDisplayed('');
            typeChar(0);
          }
        }, pause);
      }
    };

    typeChar(0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [text, speed, pause]);

  return (
    <pre className="font-mono text-lg text-green-400 whitespace-pre-wrap">
      {displayed}
    </pre>
  );
};

export default TypingEffect;

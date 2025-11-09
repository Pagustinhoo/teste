import { useState, useEffect } from 'react';
import { KeyboardState } from '../types/GameTypes';

export const useKeyboard = () => {
  const [pressedKeys, setPressedKeys] = useState<KeyboardState>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPressedKeys(prev => ({
        ...prev,
        [event.code]: true
      }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setPressedKeys(prev => ({
        ...prev,
        [event.code]: false
      }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return { pressedKeys };
};
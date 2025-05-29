import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  trigger: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ trigger }) => {
  useEffect(() => {
    if (!trigger) return;

    const end = Date.now() + 2000;
    const colores = ['#bb0000', '#ffffff', '#00bb00', '#0000bb', '#ffbb00', '#ff00bb'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colores,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colores,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, [trigger]);

  return null;
};

export default Confetti;

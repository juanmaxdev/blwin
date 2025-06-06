import { createContext, useContext, useState } from 'react';

const Puntuacion = createContext<{
  score: number;
  incrementScore: () => void;
}>({
  score: 0,
  incrementScore: () => {},
});

export const useScore = () => useContext(Puntuacion);

export const ScoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState(0);

  const incrementScore = () => setScore(prev => prev + 10); // 10 puntos por nivel

  return (
    <Puntuacion.Provider value={{ score, incrementScore }}>
      {children}
    </Puntuacion.Provider>
  );
};

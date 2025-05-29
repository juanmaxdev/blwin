import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalTematicaProps {
  visible: boolean;
  tematica: string | null;
}

const ModalTematica = ({ visible, tematica }: ModalTematicaProps) => {
  // 🔊 Referencia al sonido
  const sonidoTematica = useRef<HTMLAudioElement | null>(null);

  // ▶️ Reproducir sonido al mostrarse el modal
  useEffect(() => {
    if (visible && tematica) {
      sonidoTematica.current?.play();
    }
  }, [visible, tematica]);

  return (
    <AnimatePresence>
      {visible && tematica && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 🔊 Reproductor de sonido oculto */}
          <audio ref={sonidoTematica} src="/sonidos/tematica.mp3" preload="auto" />

          <motion.div
            className="bg-white p-10 rounded-2xl shadow-xl text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <h2 className="text-5xl font-bold text-green-500 mb-4">🎉 ¡Te ha tocado!</h2>
            <p className="text-3xl font-semibold text-indigo-700">{tematica}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalTematica;

import { useState } from 'react';
import CodeQuest from '../../../components/juegos/codequest/CodeQuestGame';
import Introduccion from '../../../components/juegos/codequest/dialogos/introduccion/introduccion';
import Fondo from '../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_java.jpg';
import BotonSalida from '../../../components/juegos/codequest/ui/BotonSalida';

export default function Codequest() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroFinish = () => {
    setShowIntro(false);
  };
  return (
    <div className="w-full h-screen max-h-screen overflow-hidden">
      {showIntro ? (
        <Introduccion onFinish={handleIntroFinish} />
      ) : (
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${Fondo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <CodeQuest />
          <BotonSalida />
        </div>
      )}
    </div>
  );
}

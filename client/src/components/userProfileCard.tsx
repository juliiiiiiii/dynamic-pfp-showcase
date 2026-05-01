import { motion, Variants } from 'framer-motion';
import { getPfpUrl } from '@/services/userService';

interface UserProfileCardProps {
  id: number;
  username: string;
  pfp: string | null;
}

// Variantes de animación para simular el dibujo de 'atrás' hacia 'adelante'
const cardVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    // Ajuste para la animación de 'entrar atrás'
    x: -100, 
    zIndex: 1, // zIndex bajo al inicio
  },
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    zIndex: 10, // zIndex alto cuando está al frente
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    // Ajuste para la animación de 'desaparecer atrás'
    x: 100,
    zIndex: 1, // zIndex bajo al salir
    transition: {
      duration: 0.5,
    },
  },
};

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ username, pfp }) => {
  const pfpUrl = getPfpUrl(pfp);

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-lg aspect-square"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout // Ayuda con las animaciones de reordenamiento si es necesario
    >
      <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-gray-700">
        <img
          src={pfpUrl}
          alt={`PFP de ${username}`}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-4 text-center text-white font-semibold text-lg">{username}</p>
    </motion.div>
  );
};
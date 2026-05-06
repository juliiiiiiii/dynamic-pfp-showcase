import { motion } from 'framer-motion';
import { getPfpUrl } from '@/services/userService';

interface UserProfileCardProps {
  id: number;
  username: string;
  pfp: string | null;
  offset: number; // -3 to +3: 0 = center (front), ±1, ±2, ±3 = sides (back)
}

// Arc layout: offset drives scale, opacity, vertical position, and z-index
function getArcStyle(offset: number) {
  const abs = Math.abs(offset);
 
  // Scale: center is biggest, sides shrink
  const scale = 1 - abs * 0.13;
 
  // Opacity: center is fully visible, outer cards fade out
  const opacity = 1 - abs * 0.22;
 
  // Vertical lift: center is at the bottom, outer cards rise (creating arc)
  const yOffset = (abs * abs); // quadratic arc: 0, -10, -40, -90
 
  // Horizontal spacing between card centers (px)
  const xSpacing = 100;
  const xOffset = offset * xSpacing;
 
  // Z-index: center card is on top
  const zIndex = 10 - abs;
 
  return { scale, opacity, yOffset, xOffset, zIndex };
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ username, pfp, offset }) => {
  const pfpUrl = getPfpUrl(pfp);
  const { scale, opacity, yOffset, xOffset, zIndex } = getArcStyle(offset);

  // Tamaño de la UserProfileCard visible, antes de escalar transformar
  const baseSize = 120;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 0,
        zIndex,
        transformOrigin: 'bottom center',
      }}
      initial={{
        x: (xOffset - 150),
        y: yOffset - 30,
        scale: scale,
        opacity: 0
      }}
      animate={{
        x: xOffset - baseSize / 2,
        y: yOffset,
        scale,
        opacity,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 28,
      }}
      exit={{
        x: (xOffset),
        y: -(yOffset),
        scale: scale,
        opacity: 0
      }}
    >
    <div
      style={{
        width: baseSize,
        height: baseSize,
        borderRadius: '50%',
        overflow: 'hidden',
        border: offset === 0 ? '3px solid rgba(255,255,255,0.9)' : '2px solid rgba(255,255,255,0.3)',
        boxShadow: offset === 0 ? '0 0 24px rgba(255,255,255,0.15)' : 'none',
      }}
    >
      <img
        src={pfpUrl}
        alt={`PFP de ${username}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
    <p
      style={{
        marginTop: 10,
        color: offset === 0 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.55)',
        fontSize: offset === 0 ? 15 : 13,
        fontWeight: offset === 0 ? 600 : 400,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      {username}
    </p>
  </motion.div>
  );
};
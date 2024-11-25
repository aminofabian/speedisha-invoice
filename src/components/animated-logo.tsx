'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo = ({ className }: AnimatedLogoProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ 
        scale: 1.05,
        filter: 'brightness(1.1)',
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      <motion.div
        animate={{ 
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={40}
          className="w-auto h-24 md:h-64"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLogo;

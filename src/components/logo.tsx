'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <motion.div
      className={`relative ${className || ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 15
        }
      }}
    >
      <Image
        src="/logo-final.svg"
        alt="Speedisha Logo"
        width={250}
        height={200}
        className="w-auto h-16 sm:h-20 md:h-24 lg:h-36"
        priority
      />
    </motion.div>
  );
};

export default Logo;
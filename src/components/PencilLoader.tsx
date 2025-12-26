// components/PencilLoader.tsx
'use client';

import { motion } from 'framer-motion';

export default function PencilLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2E1A47]">
      <div className="relative">
        {/* Pencil SVG */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pencil body */}
          <motion.path
            d="M50 150 L100 50 L110 50 L160 150 Z"
            fill="#FBD106"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Pencil tip */}
          <motion.path
            d="M100 50 L105 35 L110 50 Z"
            fill="#4CB5E6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
          
          {/* Eraser */}
          <motion.rect
            x="50"
            y="150"
            width="110"
            height="20"
            fill="#FF6B9D"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          />
          
          {/* Drawing line animation */}
          <motion.path
            d="M30 170 Q100 165 170 170"
            stroke="#4CB5E6"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              pathLength: { duration: 1.5, ease: "easeInOut", repeat: Infinity },
              opacity: { duration: 1.5, times: [0, 0.1, 0.9, 1], repeat: Infinity }
            }}
          />
        </svg>
        
        {/* Loading text */}
        <motion.p
          className="mt-4 text-center text-xl font-semibold text-[#4CB5E6]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
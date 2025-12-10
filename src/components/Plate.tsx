'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, SxProps } from '@mui/material';

interface PlateProps {
  dishImage?: string | null;
  sx?: SxProps;
}

export default function Plate({ dishImage, sx }: PlateProps) {
  return (
    <motion.div
      initial={{ x: '-100vw', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100vw', opacity: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 60, delay: 1.0 }}
      style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // Default size, can be overridden by container matching sx
      }}
    >
        <Box
          sx={{
            position: 'relative',
            width: 'min(40vw, 400px)', // Smaller default for side-by-side
            height: 'min(40vw, 400px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...sx
          }}
        >
          {/* The empty plate always sits at the bottom */}
          <Box
            component="img"
            src="/assets/plate.png"
            alt="Plate"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              position: 'absolute',
              zIndex: 1,
            }}
          />

          {/* The dish food animates on top */}
          <AnimatePresence mode="wait">
            {dishImage && (
              <motion.div
                key={dishImage}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                transition={{ type: 'spring', damping: 15 }}
                style={{
                  position: 'absolute',
                  width: '75%', // Slightly smaller to fit nicely in plate
                  height: '75%',
                  zIndex: 2,
                }}
              >
                <Box
                    component="img"
                    src={dishImage}
                    alt="Dish"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
    </motion.div>
  );
}

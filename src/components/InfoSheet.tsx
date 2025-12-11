'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Paper } from '@mui/material';

interface InfoSheetProps {
  title: string;
  content: string;
  isVisible: boolean;
  isIntro?: boolean;
}

export default function InfoSheet({ title, content, isVisible, isIntro = false }: InfoSheetProps) {
  const [isFocused, setIsFocused] = useState(false);

  // If not visible, reset focus state
  React.useEffect(() => {
    if (!isVisible) setIsFocused(false);
  }, [isVisible]);

  return (
    <>
      {/* Backdrop blur when focused */}
      {isFocused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            zIndex: 99,
          }}
          onClick={() => setIsFocused(false)}
        />
      )}

      <motion.div
        initial={{ x: '-100vw', opacity: 0 }}
        animate={
          isVisible
            ? { x: "12vw", y: "0", opacity: 1 }
            : { x: '100vw', opacity: 0 }
        }
        exit={{
          x: '100vw',
          opacity: 0,
          transition: { duration: 0.8, delay: 0 } // Immediate exit
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 60, delay: isIntro ? 3.4 : 2.3 }}
        style={{
          position: isFocused ? 'fixed' : 'relative',
          top: isFocused ? '10%' : 'auto',
          left: isFocused ? '15%' : 'auto',
          transform: isFocused ? 'translate(15%, 15%)' : 'none',
          zIndex: isFocused ? 100 : 10,
        }}
        onClick={() => setIsFocused(prev => !prev)}
      >
        <Paper
          sx={{
            width: isFocused ? 'min(90vw, 700px)' : 300,
            minHeight: isFocused ? 'min(85vh, 800px)' : 400,
            backgroundColor: '#e6ccb2',
            backgroundImage: isFocused ? 'none' : 'url(/assets/sheet.png)',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isFocused ? 'flex-start' : 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: isFocused ? 6 : 3,
            paddingTop: isFocused ? 8 : 3,
            boxShadow: isFocused ? '0px 10px 50px rgba(0,0,0,0.6)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            overflow: 'auto',
          }}
          elevation={isFocused ? 8 : 0}
        >
          {isFocused ? (
            // FOCUSED STATE: Full sheet with clear text
            <Box sx={{ width: '100%', maxWidth: '85%' }}>
              <Typography variant="h3" gutterBottom sx={{ fontFamily: 'serif', color: '#5d4037', fontWeight: 'bold', mb: 4 }}>
                {title}
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: 'serif', color: '#5d4037', lineHeight: 1.8, textAlign: 'left', mb: 4 }}>
                {content}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', mt: 4 }}>
                (Click to put back)
              </Typography>
            </Box>
          ) : (
            // RESTING STATE: Empty (Image provides the visuals)
            <Box sx={{ width: '100%', height: '100%' }} />
          )}
        </Paper>
      </motion.div>
    </>
  );
}

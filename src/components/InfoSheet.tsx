import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Paper } from '@mui/material';

interface InfoSheetProps {
  title: string;
  content: string;
  isVisible: boolean;
  isIntro?: boolean;
}

export default function InfoSheet({ title, content, isVisible, isIntro = false }: InfoSheetProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isStable, setIsStable] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Timer for Pulse Animation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible && !isFocused) {
      // Start timer to pulse after 15 seconds
      timer = setTimeout(() => {
        setIsPulsing(true);
      }, 15000);
    } else {
      // Reset if not visible or if focused
      setIsPulsing(false);
    }

    return () => clearTimeout(timer);
  }, [isVisible, isFocused]);


  // If not visible, reset focus state and stability
  React.useEffect(() => {
    if (!isVisible) {
      setIsFocused(false);
      setIsStable(false);
      setIsPulsing(false);
    }
  }, [isVisible]);

  return (
    <>
      {/* 1. Stage-level container: Handles Entry/Exit from the scene */}
      <motion.div
        initial={{ x: '-100vw', opacity: 0 }}
        animate={
          isVisible
            ? { x: "12vw", opacity: 1 }
            : { x: '100vw', opacity: 0 }
        }
        exit={{
          x: '100vw',
          opacity: 0,
          transition: { duration: 0.8, delay: 0 } // Immediate exit
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 1.0, delay: isIntro ? 3.4 : 2.3 }}
        onAnimationComplete={(definition) => {
          // Verify we are in the "visible" state
          if (isVisible && (definition as any).x === "12vw") {
            setIsStable(true);
          }
        }}
        style={{
          position: 'absolute',
          top: "25%", // Aligned with Plate (was 15%)
          zIndex: 10,
        }}
      >
        {/* Compact Card (Visual Only if focused, interactive if not) */}
        {!isFocused && (
          <motion.div
            layoutId={isStable ? `sheet-${title}` : undefined} // Only attach layoutId when stable to prevent entry bounce
            animate={isPulsing ? { scale: [1, 1.05, 1], filter: ['brightness(1)', 'brightness(1.1)', 'brightness(1)'] } : {}}
            transition={isPulsing ? { repeat: Infinity, duration: 2.0, ease: "easeInOut" } : {}}
            onClick={() => isStable && setIsFocused(true)}
          >
            <Paper
              sx={{
                width: 300,
                minHeight: 400,
                backgroundColor: '#e6ccb2',
                backgroundImage: 'url(/assets/sheet.png)',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: 3,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' }
              }}
              elevation={4}
            >
              {/* Content can be hidden in compact mode if desired, or small preview */}
            </Paper>
          </motion.div>
        )}
      </motion.div>

      {/* 2. Expanded Modal (Portal) */}
      {mounted && createPortal(
        <AnimatePresence>
          {isFocused && (
            <motion.div
              key="sheet-portal-wrapper"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1, transition: { duration: 0.5 } }} // Keep wrapper visible so the morph isn't faded out
              data-overlay="true"
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'auto' // Ensure clicks are caught
              }}
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}
                onClick={() => setIsFocused(false)}
              />

              {/* Expanded Card */}
              <motion.div
                layoutId={`sheet-${title}`}
                style={{ position: 'relative', zIndex: 10000 }}
              >
                <Paper
                  sx={{
                    width: 'min(90vw, 700px)',
                    minHeight: 'min(85vh, 600px)',
                    backgroundColor: '#e6ccb2',
                    fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 6,
                    paddingTop: 8,
                    textAlign: 'center',
                    boxShadow: '0px 10px 50px rgba(0,0,0,0.6)',
                    cursor: 'default',
                    overflow: 'auto',
                    backgroundImage: 'none' // Clean paper for reading
                  }}
                  elevation={24}
                >
                  <Box sx={{ width: '100%', maxWidth: '85%' }}>
                    <Typography variant="h3" gutterBottom sx={{ fontFamily: 'serif', color: '#5d4037', fontWeight: 'bold', mb: 4 }}>
                      {title}
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'serif', color: '#5d4037', lineHeight: 1.8, textAlign: 'left', mb: 4 }}>
                      {content}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', mt: 4, cursor: 'pointer' }} onClick={() => setIsFocused(false)}>
                      (Click backdrop to close)
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

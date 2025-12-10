'use client';

import React, { useState, useEffect, useRef } from 'react';
import TableScene from '@/components/TableScene';

import { DISHES, INTRO_TEXT, CLOSING_TEXT } from '@/constants/data';
import { Stage } from '@/types';
import { Box, Button, Typography } from '@mui/material';
import Plate from '@/components/Plate';
import InfoSheet from '@/components/InfoSheet';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

// Define the order of stages
const STAGE_ORDER: Stage[] = ['menu', 'intro', 'course1', 'course2', 'course3', 'course4', 'closing'];

export default function Home() {
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    const currentStage = STAGE_ORDER[currentStageIndex];
    const currentDish = DISHES[currentStage];
    const containerRef = useRef<HTMLDivElement>(null);

    const handleNavigate = (stage: Stage) => {
        const index = STAGE_ORDER.indexOf(stage);
        if (index !== -1) setCurrentStageIndex(index);
    };

    // Scroll Listener for "Scrollytelling"
    // We want to detect scroll events and trigger stage changes
    // A simple way is to listen to wheel events with a cooldown to prevent rapid skipping
    useEffect(() => {
        let lastScrollTime = 0;
        const cooldown = 1000; // 1 second between transitions

        const handleWheel = (e: WheelEvent) => {
            const now = Date.now();
            if (now - lastScrollTime < cooldown) return;

            if (e.deltaY > 50) {
                // Scroll Down -> Next
                // DISABLE SCROLL on 'menu' stage (index 0)
                if (currentStageIndex !== 0 && currentStageIndex < STAGE_ORDER.length - 1) {
                    setCurrentStageIndex(prev => prev + 1);
                    lastScrollTime = now;
                }
            } else if (e.deltaY < -50) {
                // Scroll Up -> Prev
                if (currentStageIndex > 1) { // Don't scroll back to menu from Intro easily via scroll? Or allow it? Allowing it.
                    setCurrentStageIndex(prev => prev - 1);
                    lastScrollTime = now;
                }
            }
        };

        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, [currentStageIndex]);


    return (
        <main>
            <TableScene>
                <AnimatePresence mode="wait">
                    {/* Page 1: Tan Sheet Rectangle */}
                    {currentStage === 'menu' && (
                        <motion.div
                            key="intro-sheet"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -800, transition: { duration: 1, ease: 'easeInOut' } }} // Longer, higher for clear "floating away"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                zIndex: 10,
                                display: 'flex',
                                justifyContent: 'center',
                                pointerEvents: 'none' // Ensure the wrapper doesn't block clicks (though inner Box will capture them)
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '15vh',
                                    width: 'min(90vw, 600px)',
                                    bottom: '-10vh', // Extends off bottom
                                    backgroundColor: '#e6ccb2',
                                    boxShadow: '0px 4px 20px rgba(0,0,0,0.3)',
                                    transform: 'rotate(0deg)', // Ensure straight
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 4,
                                    textAlign: 'center',
                                    pointerEvents: 'auto' // Re-enable pointer events for content
                                }}
                            >
                                <Typography variant="h3" gutterBottom sx={{ fontFamily: 'serif', color: '#5d4037', fontWeight: 'bold' }}>
                                    A Culinary Journey
                                </Typography>
                                <Typography variant="h6" sx={{ fontFamily: 'serif', color: '#5d4037', mb: 4, maxWidth: '80%' }}>
                                    {INTRO_TEXT}
                                </Typography>

                                <Button
                                    variant="contained"
                                    onClick={() => handleNavigate('intro')}
                                    sx={{
                                        backgroundColor: '#8d6e63',
                                        color: 'white',
                                        padding: '12px 36px',
                                        fontSize: '1.2rem',
                                        fontFamily: 'serif',
                                        '&:hover': { backgroundColor: '#795548' }
                                    }}
                                >
                                    Begin Dinner
                                </Button>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Course View: Plate & InfoSheet */}
                {/* Visible for Intro, Course 1-4, Closing */}
                {currentStage !== 'menu' && (
                    <LayoutGroup>
                        {/* Plate */}
                        <motion.div
                            layout
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: isFocused ? "35%" : "35%", // stays left
                                translate: "-50% -50%",
                                zIndex: 5,
                                width: "min(45vw, 500px)",
                                height: "min(45vw, 500px)"
                            }}
                        >
                            <Plate dishImage={currentDish?.image || null} />
                        </motion.div>

                        {/* InfoSheet */}
                        <InfoSheet
                            title={currentStage === 'intro' ? 'Introduction' : (currentStage === 'closing' ? 'Closing' : currentDish?.name || '')}
                            content={currentStage === 'intro' ? 'Scroll down to begin the first course.' : (currentStage === 'closing' ? CLOSING_TEXT : currentDish?.info || '')}
                            isVisible={true}
                        />
                    </LayoutGroup>
                )}

            </TableScene>

            {/* Scroll indicator/hint */}
            {currentStage !== 'menu' && currentStage !== 'closing' && (
                <Box sx={{ position: 'fixed', bottom: 20, right: 20, color: 'white', zIndex: 50, opacity: 0.7 }}>
                    <Typography variant="body2">Scroll to continue ▼</Typography>
                </Box>
            )}

        </main>
    );
}

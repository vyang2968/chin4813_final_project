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
const STAGE_ORDER: Stage[] = ['menu', 'intro', 'course2', 'course3', 'course4', 'closing'];

export default function Home() {
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [showCourseTitle, setShowCourseTitle] = useState(false);

    const currentStage = STAGE_ORDER[currentStageIndex];
    const currentDish = DISHES[currentStage];
    const [courseNumber, setCourseNumber] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Show course title briefly when entering a course stage
    useEffect(() => {
        const courseStages = ['intro', 'course2', 'course3', 'course4'];
        if (courseStages.includes(currentStage)) {
            // Lock scrolling during transition
            setIsTransitioning(true);

            // Determine course number
            let num = 1;
            if (currentStage === 'intro') num = 1;
            else if (currentStage === 'course2') num = 2;
            else if (currentStage === 'course3') num = 3;
            else if (currentStage === 'course4') num = 4;

            setCourseNumber(num);

            // Special timing for intro (first course) vs other courses
            const isIntro = currentStage === 'intro';
            const titleDelay = isIntro ? 500 : 1000; // Wait for exit (800ms) + gap (200ms)
            const titleDisplayDuration = 2000; // Show title for longer
            const totalTransitionTime = isIntro ? 5500 : 4000; // Intro needs more time, others need less

            // Delay showing title
            const showTimer = setTimeout(() => {
                setShowCourseTitle(true);
                // Hide after duration
                const hideTimer = setTimeout(() => setShowCourseTitle(false), titleDisplayDuration);
                return () => clearTimeout(hideTimer);
            }, titleDelay);

            // Unlock scrolling after full transition
            const unlockTimer = setTimeout(() => setIsTransitioning(false), totalTransitionTime);

            return () => {
                clearTimeout(showTimer);
                clearTimeout(unlockTimer);
            };
        }
    }, [currentStage]);

    const handleNavigate = (stage: Stage) => {
        const index = STAGE_ORDER.indexOf(stage);
        if (index !== -1) setCurrentStageIndex(index);
    };

    // Scroll Listener for stage transitions
    const lastScrollTimeRef = useRef(0);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const target = e.target as HTMLElement;
            const isOnOverlay = target.closest('[data-overlay="true"]'); // safer

            if (isOnOverlay) return;

            // Prevent scrolling during transitions
            if (isTransitioning) return;

            const now = Date.now();
            if (now - lastScrollTimeRef.current < 1000) return;

            if (e.deltaY > 15) {
                if (currentStageIndex < STAGE_ORDER.length - 1) {
                    setCurrentStageIndex(prev => prev + 1);
                    lastScrollTimeRef.current = now;
                }
            } else if (e.deltaY < -15) {
                if (currentStageIndex > 1) {
                    setCurrentStageIndex(prev => prev - 1);
                    lastScrollTimeRef.current = now;
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [currentStageIndex]);


    return (
        <main>
            <TableScene>
                <AnimatePresence mode="wait">
                    {currentStage === 'menu' && (
                        <motion.div
                            key="intro-sheet"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -800, transition: { duration: 1, ease: 'easeInOut' } }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                zIndex: 10,
                                display: 'flex',
                                justifyContent: 'center',
                                pointerEvents: 'none'
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '15vh',
                                    width: 'min(90vw, 600px)',
                                    bottom: '-10vh',
                                    backgroundColor: '#e6ccb2',
                                    boxShadow: '0px 4px 20px rgba(0,0,0,0.3)',
                                    transform: 'rotate(0deg)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 4,
                                    textAlign: 'center',
                                    pointerEvents: 'auto'
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

                    {/* Closing Sheet */}
                    {currentStage === 'closing' && (
                        <motion.div
                            key="closing-sheet"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -800, transition: { duration: 1, ease: 'easeInOut' } }}
                            transition={{ delay: 1.0, duration: 0.8 }} // Wait for Course 4 to exit
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                zIndex: 10,
                                display: 'flex',
                                justifyContent: 'center',
                                pointerEvents: 'none'
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '15vh',
                                    width: 'min(90vw, 600px)',
                                    bottom: '-10vh',
                                    backgroundColor: '#e6ccb2',
                                    boxShadow: '0px 4px 20px rgba(0,0,0,0.3)',
                                    transform: 'rotate(0deg)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 4,
                                    textAlign: 'center',
                                    pointerEvents: 'auto'
                                }}
                            >
                                <Typography variant="h3" gutterBottom sx={{ fontFamily: 'serif', color: '#5d4037', fontWeight: 'bold' }}>
                                    Rest Well
                                </Typography>
                                <Typography variant="h6" sx={{ fontFamily: 'serif', color: '#5d4037', mb: 4, maxWidth: '80%' }}>
                                    {CLOSING_TEXT}
                                </Typography>

                                <Button
                                    variant="contained"
                                    onClick={() => handleNavigate('menu')}
                                    sx={{
                                        backgroundColor: '#5d4037',
                                        color: 'white',
                                        padding: '12px 36px',
                                        fontSize: '1.2rem',
                                        fontFamily: 'serif',
                                        '&:hover': { backgroundColor: '#4e342e' }
                                    }}
                                >
                                    Restart Experience
                                </Button>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Course Title - shown briefly when transitioning to intro */}
                <AnimatePresence>
                    {showCourseTitle && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '40%',
                                transform: 'translateX(-50%) translateY(-50%)',
                                zIndex: 50,
                                pointerEvents: 'none',
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontFamily: 'serif',
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    textShadow: '0px 4px 20px rgba(0,0,0,0.8)',
                                    letterSpacing: '0.1em',
                                }}
                            >
                                Course {courseNumber}
                            </Typography>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Course View: Plate & InfoSheet */}
                {/* Visible for Intro, Course 1-4. Not Menu, Not Closing */}
                <AnimatePresence mode="wait">
                    {!['menu', 'closing'].includes(currentStage) && (
                        <React.Fragment key={currentStage}>
                            {/* Plate */}
                            <motion.div
                                key={`plate-${currentStage}`}
                                initial={{ x: '-100vw', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{
                                    x: '-100vw',
                                    opacity: 0,
                                    transition: { duration: 0.8, delay: 0 } // Immediate exit
                                }}
                                transition={{ type: 'spring', stiffness: 100, damping: 25, restDelta: 0.01, delay: currentStage === 'intro' ? 3.6 : 2.5 }}
                                style={{
                                    position: "absolute",
                                    top: "25%",
                                    left: "20%",
                                    zIndex: 5,
                                    width: "min(45vw, 500px)",
                                    height: "min(45vw, 500px)"
                                }}
                            >
                                <Plate dishImage={currentStage === 'intro' ? DISHES.course1?.image : (currentDish?.image || null)} />
                            </motion.div>

                            {/* InfoSheet */}
                            <InfoSheet
                                title={currentStage === 'intro' ? 'Introduction' : (currentDish?.name || '')}
                                content={currentStage === 'intro' ? 'Scroll down to begin the first course.' : (currentDish?.info || '')}
                                isVisible={true}
                                isIntro={currentStage === 'intro'}
                            />
                        </React.Fragment>
                    )}
                </AnimatePresence>

            </TableScene>
        </main>
    );
}

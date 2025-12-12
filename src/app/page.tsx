'use client';

import React, { useState, useEffect, useRef } from 'react';
import TableScene from '@/components/TableScene';

import { DISHES, INTRO_TEXT, CLOSING_TEXT } from '@/constants/data';
import { Stage } from '@/types';
import { Box, Button, Typography } from '@mui/material';
import Plate from '@/components/Plate';
import InfoSheet from '@/components/InfoSheet';
import { KeyboardArrowDown } from '@mui/icons-material';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

// Define the order of stages
const STAGE_ORDER: Stage[] = ['menu', 'intro', 'course2', 'course3', 'course4', 'closing'];

export default function Home() {
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [showCourseTitle, setShowCourseTitle] = useState(false);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const [showGradient, setShowGradient] = useState(true);
    const [showIdleIndicator, setShowIdleIndicator] = useState(false);

    const currentStage = STAGE_ORDER[currentStageIndex];
    const currentDish = DISHES[currentStage];
    const [courseNumber, setCourseNumber] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Refs for scrolling and idle tracking
    const lastScrollTimeRef = useRef(Date.now());
    const lastInteractionRef = useRef(Date.now());

    // Idle Timer Logic
    useEffect(() => {
        const checkIdle = () => {
            // Only run check on course stages
            const courseStages = ['intro', 'course2', 'course3', 'course4'];
            if (!courseStages.includes(currentStage)) {
                if (showIdleIndicator) setShowIdleIndicator(false);
                return;
            }

            const now = Date.now();
            const timeSinceLastInteraction = now - lastInteractionRef.current;
            if (timeSinceLastInteraction > 60000) { // 1 minute
                setShowIdleIndicator(true);
            }
        };

        const intervalId = setInterval(checkIdle, 1000);
        return () => clearInterval(intervalId);
    }, [currentStage, showIdleIndicator]);

    // Show course title briefly when entering a course stage
    useEffect(() => {
        const courseStages = ['intro', 'course2', 'course3', 'course4'];
        if (courseStages.includes(currentStage)) {
            // Reset idle indicator on stage change
            setShowIdleIndicator(false);
            lastInteractionRef.current = Date.now();
            lastScrollTimeRef.current = Date.now();

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

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Reset idle timer on any interaction
            lastInteractionRef.current = Date.now();
            setShowIdleIndicator(false);

            const target = e.target as HTMLElement;
            const isOnOverlay = target.closest('[data-overlay="true"]'); // safer

            if (isOnOverlay) return;

            // Disable scroll navigation on the intro (menu) stage
            if (currentStage === 'menu') return;

            // Prevent scrolling during transitions
            if (isTransitioning) return;

            const now = Date.now();
            // Scroll throttling logic
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
    }, [currentStageIndex, isTransitioning, currentStage]); // Added dependencies


    return (
        <main>
            <TableScene>
                {/* Global Idle Indicator */}
                <AnimatePresence>
                    {showIdleIndicator && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: [0, 10, 0] }}
                            exit={{ opacity: 0 }}
                            transition={{
                                opacity: { duration: 0.5 },
                                y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                            }}
                            style={{
                                position: 'fixed',
                                bottom: '5vh',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 100,
                                pointerEvents: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Typography variant="caption" sx={{ color: '#fff', mb: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                Scroll to continue
                            </Typography>
                            <KeyboardArrowDown sx={{ fontSize: 40, color: '#fff', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
                        </motion.div>
                    )}
                </AnimatePresence>

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
                                    bottom: '-10vh', // Extends off-screen as requested
                                    backgroundColor: '#e6ccb2',
                                    boxShadow: '0px 4px 20px rgba(0,0,0,0.3)',
                                    transform: 'rotate(0deg)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: 4,
                                    textAlign: 'left',
                                    pointerEvents: 'auto',
                                }}
                            >
                                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'serif', color: '#5d4037', fontWeight: 'bold' }}>
                                    Food During the Mao Era
                                </Typography>
                                <Box sx={{ position: 'relative', width: '100%', height: '60vh' }}>
                                    <div
                                        style={{
                                            overflowY: 'auto',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        data-overlay="true"
                                        onScroll={(e) => {
                                            const element = e.currentTarget;

                                            // Arrow logic
                                            if (element.scrollTop > 10) {
                                                setShowScrollIndicator(false);
                                            } else {
                                                setShowScrollIndicator(true);
                                            }

                                            // Gradient logic: Hide if at bottom
                                            const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 5;
                                            setShowGradient(!isAtBottom);
                                        }}
                                    >
                                        <Typography component="div" variant="body1" sx={{ fontFamily: 'serif', color: '#5d4037', px: 4, maxWidth: '100%', textAlign: 'left' }}>
                                            {INTRO_TEXT}
                                        </Typography>
                                    </div>

                                    {/* Scroll Indicator */}
                                    <AnimatePresence>
                                        {showScrollIndicator && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1, y: [0, 10, 0] }}
                                                exit={{ opacity: 0 }}
                                                transition={{
                                                    opacity: { duration: 0.3 },
                                                    y: {
                                                        repeat: Infinity,
                                                        duration: 1.5,
                                                        ease: "easeInOut"
                                                    }
                                                }}
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '20px',
                                                    left: '46%',
                                                    pointerEvents: 'none',
                                                    zIndex: 20
                                                }}
                                            >
                                                <KeyboardArrowDown sx={{ fontSize: 40, color: '#5d4037' }} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Gradient Mask at bottom */}
                                    <AnimatePresence>
                                        {showGradient && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '60px',
                                                    background: 'linear-gradient(to bottom, transparent, #e6ccb2)',
                                                    pointerEvents: 'none',
                                                    zIndex: 15
                                                }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </Box>

                                <Button
                                    variant="contained"
                                    onClick={() => handleNavigate('intro')}
                                    sx={{
                                        backgroundColor: '#8d6e63',
                                        color: 'white',
                                        padding: '12px 36px',
                                        fontSize: '1.2rem',
                                        fontFamily: 'serif',
                                        marginTop: '4vh',
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
                                    Thank You
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
                                <Plate dishImage={currentDish?.image || null} />
                            </motion.div>

                            {/* InfoSheet */}
                            <InfoSheet
                                title={(currentDish?.name || '')}
                                content={(currentDish?.info || '')}
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

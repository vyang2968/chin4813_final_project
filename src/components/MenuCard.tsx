'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { Stage } from '@/types';

interface MenuCardProps {
  onNavigate: (stage: Stage) => void;
  currentStage: Stage;
  onBegin?: () => void;
}

export default function MenuCard({ onNavigate, currentStage, onBegin }: MenuCardProps) {
  const isStartMode = currentStage === 'menu';
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Auto-open in start mode, otherwise manage state
  const active = isStartMode || isOpen;

  return (
    <motion.div
        animate={
            active 
            ? { x: 0, y: 0, scale: 1, zIndex: 100 }
            : { x: '-40vw', y: 0, scale: 0.8, rotate: -5, zIndex: 50 }
        }
        style={{
            position: 'absolute',
        }}
    >
       <Box
         onClick={() => !isStartMode && setIsOpen(!isOpen)}
         sx={{
             width: 360,
             height: 500,
             backgroundImage: 'url(/assets/menu.png)',
             backgroundSize: 'contain',
             backgroundRepeat: 'no-repeat',
             backgroundPosition: 'center',
             cursor: 'pointer',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             justifyContent: 'center',
             padding: 4,
             filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))'
         }}
       >
         {active && (
            <Box sx={{ marginTop: 2, textAlign: 'center', width: '100%' }}>
                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'serif', fontWeight: 'bold' }}>
                    {isStartMode ? "A Culinary Journey" : "Menu"}
                </Typography>
                
                {isStartMode ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <Typography variant="body1" sx={{ px: 2 }}>
                            Welcome to our table. Tonight we serve stories wrapped in flavors.
                        </Typography>
                         <Typography variant="body2" sx={{ px: 2, fontStyle: 'italic' }}>
                            (Scroll to navigate after beginning)
                        </Typography>
                        {onBegin && (
                            <Box sx={{ mt: 2 }}>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onBegin();
                                    }}
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '1.2rem',
                                        cursor: 'pointer',
                                        backgroundColor: '#8d6e63',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        fontFamily: 'serif'
                                    }}
                                >
                                    Begin Dinner
                                </button>
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Box>
                        {[
                            { label: 'Introduction', value: 'intro' },
                            { label: 'Course 1', value: 'course1' },
                            { label: 'Course 2', value: 'course2' },
                            { label: 'Course 3', value: 'course3' },
                            { label: 'Course 4', value: 'course4' },
                            { label: 'Closing', value: 'closing' },
                        ].map((item) => (
                            <Typography 
                                key={item.value} 
                                variant="body1" 
                                sx={{ 
                                    cursor: 'pointer', 
                                    marginTop: 1,
                                    '&:hover': { color: 'red', fontWeight: 'bold' } 
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onNavigate(item.value as Stage);
                                    setIsOpen(false);
                                }}
                            >
                                {item.label}
                            </Typography>
                        ))}
                    </Box>
                )}
            </Box>
         )}

         {!active && (
             <Typography variant="h6" sx={{ color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', padding: 1, borderRadius: 1 }}>
                 MENU
             </Typography>
         )}
       </Box>
    </motion.div>
  );
}

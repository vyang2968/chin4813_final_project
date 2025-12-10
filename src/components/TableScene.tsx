'use client';

import React from 'react';
import { Box } from '@mui/material';

interface TableSceneProps {
  children: React.ReactNode;
}

export default function TableScene({ children }: TableSceneProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: 'url(/assets/table.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
      }}
    >
      {/* Darken overlay for better contrast if needed, or keeping it natural */}
      <Box 
        sx={{
            position: 'absolute',
            top: 0, 
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.1)',
            pointerEvents: 'none'
        }} 
      />
      {children}
    </Box>
  );
}

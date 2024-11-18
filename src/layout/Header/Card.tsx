'use client'
import React from 'react';
import { Box, Typography, Divider } from "@mui/material";
import Image from 'next/image';

export interface CardProps {
  imageSrc: string;
  headerText: string;
  excerptText: string;
  imagePosition?: 'top' | 'left';
}

export const Card = ({ imageSrc, headerText, excerptText, imagePosition = 'top' }: CardProps) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: imagePosition === 'left' ? 'row' : 'column',
        border: 1,
        borderColor: '#ddd',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 1,
        width: 500, 
        height: 250, 
        margin: 2,
      }}
    >
      <Box 
        sx={{
          width: imagePosition === 'left' ? 250 : '100%', 
          height: imagePosition === 'left' ? '100%' : 125, 
        }}
      >
        <Image src={imageSrc} alt="Card Image" layout="responsive" width={500} height={250} style={{ width: '100%', height: 'auto' }} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Divider />
        <Typography variant="h5" component="h2" p={2} textAlign="left">
          {headerText}
        </Typography>
        <Typography component="p" p={3} textAlign="left">
          {excerptText}
        </Typography>
      </Box>
    </Box>
  );
};

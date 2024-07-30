'use client'
import React from 'react';
import { Box, Typography } from "@mui/material";
import Image from 'next/image';

export interface CardProps {
  imageSrc: string;
  headerText: string;
  excerptText: string;
  link: string;
  imagePosition?: 'top' | 'left';
}

export const Card = ({ imageSrc, headerText, excerptText, link, imagePosition = 'top' }: CardProps) => {
  return (
    <Box 
      component="a"
      href={link}
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
        aspectRatio: '2 / 1',
        textDecoration: 'none',
        color: 'inherit', 
      }}
    >
      <Box 
        sx={{
          width: imagePosition === 'left' ? 250 : '100%', 
          height: imagePosition === 'left' ? '100%' : 125, 
          position: 'relative', 
        }}
      >
        <Image 
          src={imageSrc} 
          alt="Card Image" 
          layout="fill" 
          objectFit="cover" 
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 1, margin: 0}}>
        <Typography variant="h5" component="h2" sx={{ mt: 2 }} textAlign="left">
          {headerText}
        </Typography>
        <Typography component="p" sx={{ mt: 0 }} textAlign="left">
          {excerptText}
        </Typography>
      </Box>
    </Box>
  );
};

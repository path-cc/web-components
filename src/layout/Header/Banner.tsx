'use client';
import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Image from 'next/image';

export interface BannerProps {
  imageSrc: string;
  headerText: string;
  excerptText: string;
  link: string;
  imagePosition?: 'left' | 'top';
}

const Banner = ({ imageSrc, headerText, excerptText, link, imagePosition = 'left' }: BannerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: imagePosition === 'left' ? 'row' : 'column',
        width: '100%',
        height: 500,
        border: 'solid #ececec 1px',
        borderRadius: '4px',
        '&:hover': {
          bgcolor: '#ececec',
        },
      }}
    >
      {imagePosition === 'left' ? (
        <Box
          sx={{
            width: '50%',
            position: 'relative', 
            height: 'auto',
          }}
        >
          <Image 
            src={imageSrc} 
            alt="Banner Image" 
            layout="fill" 
            objectFit="fill" 
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: 500, 
            position: 'relative',
          }}
        >
          <Image 
            src={imageSrc} 
            alt="Banner Image" 
            layout="fill" 
            objectFit="fill"
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50px', // Move the box 100px away from the left side
              transform: 'translateY(-50%)', // Center vertically
              width: 'calc(50% - 50px)', // Adjust width to fit within the container
              height: 450,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 2,
              bgcolor: 'rgba(255, 255, 255, 0.8)', 
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" component="h2" sx={{ mb: 1, textAlign: 'left' }}>
              {headerText}
            </Typography>
            <Divider />
            <Typography component="p" sx={{ mt: 1, flexGrow: 1, textAlign: 'left' }}>
              {excerptText}
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <a href={link} style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Read More</a>
            </Box>
          </Box>
        </Box>
      )}
      {imagePosition === 'left' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 1, textAlign: 'left' }}>
            {headerText}
          </Typography>
          <Typography component="p" sx={{ mt: 0, flexGrow: 1, textAlign: 'left' }}>
            {excerptText}
          </Typography>
          <Box sx={{ mt: 'auto' }}>
            <a href={link} style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Read More</a>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Banner;

import React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { Link, useOutletContext } from 'react-router-dom';

export default function ImageMasonry() {
  const [itemData, isLoading] = useOutletContext();

  return (
    <Box sx={{ width: '100%', marginTop: '80px' }}>
      {!isLoading && (
        <Masonry columns={3} spacing={2}>
          {itemData.map((item, index) => (
            <div key={index}>
              <img
                src={`${item.imgUrl}?w=162&auto=format`}
                alt={item.title}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  width: '100%',
                  aspectRatio: 800 / 600,
                }}
              />
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
          ))}
        </Masonry>
      )}
    </Box>
  );
}

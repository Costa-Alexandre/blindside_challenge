import React, { useEffect, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { getAllVideos } from '../api/videos';

export default function ImageMasonry() {
  const [isLoading, setIsLoading] = useState(true);
  const [itemData, setItemData] = useState([]);

  const loadItems = useCallback(async () => {
    console.log('loading items');
    const listVideos = await getAllVideos();
    setItemData(listVideos);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadItems();
  }, [loadItems]);

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

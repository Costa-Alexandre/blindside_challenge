import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Masonry from '@mui/lab/Masonry';
import { Link, useOutletContext } from 'react-router-dom';
import GallerySkeleton from './GallerySkeleton';
import '../styles/Gallery.css';

export default function ImageMasonry() {
  const [itemData, isLoading] = useOutletContext();
  const skeletonArr = Array(8).fill(1);

  return (
    <Box sx={{ width: '100%', marginTop: '80px' }}>
      {!isLoading && (
        <Masonry columns={{ xs: 1, sm: 2, md: 3, xl: 4 }} spacing={2}>
          {itemData.map(({ video_path, imgUrl, title, description }, index) => (
            <div key={index}>
              <Card sx={{ maxWidth: 500, minHeight: 430 }}>
                <CardActionArea component={Link} to={`/videos/${video_path}`}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={imgUrl}
                    alt={title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {description.length < 100
                        ? description
                        : `${description.slice(0, 140)}...`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </Masonry>
      )}
      {isLoading && (
        <Masonry columns={{ xs: 1, sm: 2, md: 3, xl: 4 }} spacing={2}>
          {skeletonArr.map((_, index) => (
            <GallerySkeleton key={index} />
          ))}
        </Masonry>
      )}
    </Box>
  );
}

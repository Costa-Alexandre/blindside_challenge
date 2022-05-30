import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { Link, useOutletContext } from 'react-router-dom';
import '../styles/Gallery.css';

export default function ImageMasonry() {
  const [itemData, isLoading] = useOutletContext();
  const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Box sx={{ width: '100%', marginTop: '80px' }}>
      {!isLoading && (
        <Masonry columns={4} spacing={2}>
          {itemData.map((item, index) => (
            <div key={index}>
              <Card sx={{ maxWidth: 500 }}>
                <CardActionArea
                  component={Link}
                  to={`/videos/${item.video_path}`}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={item.imgUrl}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </Masonry>
      )}
      {isLoading && (
        <Masonry columns={4} spacing={2}>
          {skeletonArr.map((item, index) => (
            <div key={index}>
              <Card sx={{ maxWidth: 500 }}>
                <div className="skeleton" alt="placeholder" />
                <CardContent>
                  <div className="title" data-title>
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" />
                  </div>
                  <div data-body>
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Masonry>
      )}
    </Box>
  );
}

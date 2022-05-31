import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function RelatedVideo({ relatedVideos }) {
  const [itemData] = useOutletContext();

  console.log(relatedVideos);

  const createCard = (index, video_path, imgUrl, title) => (
    <Card key={index}>
      <CardActionArea component={Link} to={`/videos/${video_path}`}>
        <CardMedia component="img" height="200" image={imgUrl} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <>
      {relatedVideos.map((video_path, index) => {
        const data = itemData.filter((item) => item.video_path === video_path);
        const { title, imgUrl } = data[0];
        return createCard(index, video_path, imgUrl, title);
      })}
    </>
  );
}

export default RelatedVideo;

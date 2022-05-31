import React, { useState } from 'react';
import { useOutletContext, useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import RelatedVideo from './RelatedVideo';
import '../styles/Video.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

function Video() {
  const [itemData] = useOutletContext();
  const { video_path } = useParams();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const data = itemData.filter((item) => item.video_path === video_path);

  const { title, description, videoUrl, related_videos } = data[0];

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <div>
      <Navbar />
      <div className="content-container">
        <div className="media-header">
          <Link to="/">
            <button>Back</button>
          </Link>
          <p className="title-tag">Sports</p>
          <h1>{title}</h1>
        </div>
        <div className="media-container">
          <div className="video-container">
            <Card sx={{ margin: '0 15%' }}>
              <CardHeader title="MEDIA" />
              <CardMedia
                component="video"
                width="100%"
                image={videoUrl}
                alt={title}
                autoPlay
                controls
              />
              <CardContent>
                <p>{description}</p>
                <CardActions disableSpacing>
                  <Button onClick={handleExpandClick} size="small">
                    {expanded ? 'Hide comments' : 'Show comments'}
                  </Button>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show comments"
                    size="small"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <h5>Leave your Comment:</h5>
                    <p>PLACEHOLDER</p>
                  </CardContent>
                </Collapse>
              </CardContent>
            </Card>
          </div>
          <div className="related-videos">
            <p>Related Videos</p>
            <div className="related-videos-container">
              {related_videos.map((video, v) => (
                <RelatedVideo key={v} video_path={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;

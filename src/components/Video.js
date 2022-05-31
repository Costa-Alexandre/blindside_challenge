import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import RelatedVideo from './RelatedVideo';
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
import TextareaAutosize from '@mui/base/TextareaAutosize';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Comment from './Comment';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

function Video() {
  const { currentUser } = useAuth();
  const { displayName, photoURL: photoUrl } = currentUser;
  const [itemData, isLoading] = useOutletContext();
  const { video_path } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddComment = () => {
    const updatedComments = [
      ...comments,
      {
        newComment,
        imgUrl: photoUrl,
        displayName,
      },
    ];
    setComments(updatedComments);
    setNewComment('');
  };

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

  useEffect(() => {
    setComments([]);
  }, [video_path]);

  if (!isLoading) {
    const data = itemData.filter((item) => item.video_path === video_path);
    const { title, description, videoUrl, related_videos } = data[0];

    return (
      <>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 10%',
            alignItems: 'flex-start',
          }}
        >
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            color="info"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Typography color="secondary">Sports</Typography>
          <Typography variant="h3">{title}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            margin: '0 10%',
          }}
        >
          <Card sx={{ mr: 4 }}>
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
                <Divider />
                <TextareaAutosize
                  aria-label="comment textarea"
                  placeholder="Comment"
                  style={{ width: '100%', marginTop: '1.5rem' }}
                  minRows={2}
                  maxRows={4}
                  onChange={(e) => setNewComment(e.target.value)}
                  value={newComment}
                  fullWidth
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button size="small" onClick={handleAddComment}>
                    Add comment
                  </Button>
                </Box>
                <List alignItems="flex-start">
                  {comments
                    .slice(0)
                    .reverse()
                    .map(({ newComment, displayName, imgUrl }, c) => (
                      <Comment
                        key={c}
                        newComment={newComment}
                        displayName={displayName}
                        imgUrl={imgUrl}
                      />
                    ))}
                </List>
              </Collapse>
            </CardContent>
          </Card>
          <Stack direction="column" spacing={2} sx={{ minWidth: '30%' }}>
            <Typography color="info" variant="h5">
              Related Videos
            </Typography>
            <RelatedVideo relatedVideos={related_videos} />
          </Stack>
        </Box>
      </>
    );
  }
}

export default Video;

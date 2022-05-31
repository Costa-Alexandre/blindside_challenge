import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

function Comment({ imgUrl, displayName, newComment }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemIcon>
        <Avatar
          alt={displayName}
          src={imgUrl}
          sx={{ width: 56, height: 56, mr: 2 }}
        />
      </ListItemIcon>
      <ListItemText
        primary={newComment}
        secondary={displayName ? displayName : 'Anonymous'}
      />
    </ListItem>
  );
}

export default Comment;

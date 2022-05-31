import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function GallerySkeleton() {
  return (
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
  );
}

export default GallerySkeleton;

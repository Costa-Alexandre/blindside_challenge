import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import '../styles/Video.css';

function RelatedVideo({ video_path }) {
  const [itemData] = useOutletContext();

  const data = itemData.filter((item) => item.video_path === video_path);

  const { title, imgUrl } = data[0];

  return (
    <div>
      <Link to={`/videos/${video_path}`}>
        <img src={imgUrl} alt={title} width="100%" />
        <p className="title-tag">Sports</p>
        <p>{title}</p>
      </Link>
    </div>
  );
}

export default RelatedVideo;

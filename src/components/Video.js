import React from 'react';
import ReactPlayer from 'react-player';
import { useOutletContext, useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';

function Video() {
  const [itemData] = useOutletContext();
  const { video_path } = useParams();

  const data = itemData.filter((item) => item.video_path === video_path);

  const { title, description, imgUrl, videoUrl } = data[0];

  console.log(title, description, imgUrl, videoUrl);

  return (
    <div>
      <Navbar />
      <h1>{title}</h1>
      <ReactPlayer url={videoUrl} light={imgUrl} controls playing />
      <p>{description}</p>
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default Video;

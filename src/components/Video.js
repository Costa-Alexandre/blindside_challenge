import React from 'react';
import ReactPlayer from 'react-player';
import { useOutletContext, useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import RelatedVideo from './RelatedVideo';
import '../styles/Video.css';

function Video() {
  const [itemData] = useOutletContext();
  const { video_path } = useParams();

  const data = itemData.filter((item) => item.video_path === video_path);

  const { title, description, imgUrl, videoUrl, related_videos } = data[0];

  console.log(title, description, imgUrl, videoUrl);

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
            <p>MEDIA</p>
            <ReactPlayer
              url={videoUrl}
              light={imgUrl}
              controls
              playing
              width={'100%'}
            />
            <p>{description}</p>
          </div>
          <div className="related-videos">
            <p>Related Videos</p>
            <div className="related-videos-container">
              {related_videos.map((video) => (
                <RelatedVideo video_path={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;

import allVideos from './videos.json';
import { ref, getStorage, getDownloadURL } from 'firebase/storage';

const getUrl = async (path) => {
  const storage = getStorage();
  const url = await getDownloadURL(ref(storage, path));
  return url;
};

const getAllVideos = async () => {
  const videosList = Object.assign([], allVideos);
  for (let v in videosList) {
    videosList[v].imgUrl = await getUrl(videosList[v].img_path);
    videosList[v].videoUrl = await getUrl(videosList[v].video_path);
  }
  return videosList;
};

export { getAllVideos };

import React, { useState } from 'react';
import './Menu.css'; // Import the CSS file for Menu component

function Menu({ playlist, onVideoClick }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(true);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    onVideoClick(video);
  };

  const togglePlaylist = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  };

  return (
    <div className={`menu ${isPlaylistOpen ? 'open' : ''}`}>
      <div className="playlist-heading" onClick={togglePlaylist}>
        LGflix 추천작
      </div>
      {isPlaylistOpen && (
        <div className="playlist-items">
          {playlist &&
            playlist.map((video, index) => (
              <div
                key={index}
                className={`playlist-item ${
                  selectedVideo === video ? 'selected' : ''
                }`}
                onClick={() => handleVideoClick(video)}
              >
                <div className="playlist-item-content">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="thumbnail"
                  />
                  <h3>{video.title}</h3>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Menu;

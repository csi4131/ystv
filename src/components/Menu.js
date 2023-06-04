import React, { useState } from 'react';

export default function Menu({ onToggleVideo }) {
  const [videoVisible, setVideoVisible] = useState(true);
  const [playlistVisible, setPlaylistVisible] = useState(false);

  const handleToggleVideo = () => {
    setVideoVisible(!videoVisible);
    onToggleVideo(!videoVisible);
  };

  const handleTogglePlaylist = () => {
    setPlaylistVisible(!playlistVisible);
  };

  return (
    <nav>
      <ul className="flex">
        <li className="mr-4">
          <a href="#" onClick={handleTogglePlaylist}>
            재생목록
          </a>
          {playlistVisible && (
            <ul>
              <li>영상 제목 1</li>
              <li>영상 제목 2</li>
              <li>영상 제목 3</li>
              {/* 다른 영상 제목들을 여기에 추가 */}
            </ul>
          )}
        </li>
        <li className="mr-4">
          <a href="#">영상분석</a>
        </li>
        <li className="mr-4">
          <button onClick={handleToggleVideo}>
            {videoVisible ? '영상 숨기기' : '영상 보이기'}
          </button>
        </li>
      </ul>
    </nav>
  );
}

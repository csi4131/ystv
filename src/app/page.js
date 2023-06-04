'use client';
import React, { useState, useEffect } from 'react';
import { HlsPlayer } from '@/components/HlsPlayer';
import playlistData from '../data/playlist.json';
import Menu from '@/components/Menu';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [playlist, setPlaylist] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    setPlaylist(playlistData.playlist);
  }, []);

  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
        <Menu playlist={playlist} onVideoClick={handleVideoClick} />
        {selectedVideo && (
          <HlsPlayer
            src={selectedVideo.url}
            controls={true}
            width="100%"
            height="100%"
          />
        )}
        
      </main>
      <Footer/>
    </div>
  );
}

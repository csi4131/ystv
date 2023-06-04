'use client';
import React, { useState } from 'react';
import { HlsPlayer } from '@/components/HlsPlayer';
import { HlsContext } from '@/store/HlsContext';
import Menu from '@/components/Menu';

export default function Home() {
  const handleToggleVideo = (videoVisible) => {
    // 영상 숨기기/보이기 기능을 처리하는 로직을 추가하세요
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HlsContext.Provider value={{ metric: { events: [] } }}>
        <HlsPlayer
          src="https://cdn.jwplayer.com/manifests/pZxWPRg4.m3u8"
          controls={true}
          width="100%"
          height="100%"
        />
        <Menu onToggleVideo={handleToggleVideo} />
      </HlsContext.Provider>
    </main>
  );
}

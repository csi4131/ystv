'use client'
import React from 'react'
import { HlsPlayer } from '@/components/HlsPlayer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <HlsPlayer
        src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        controls={true}
        width="100%"
        height="100%"
      />
    </main>
  )
}

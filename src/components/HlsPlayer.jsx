'use client'
import React, { useEffect, useState } from 'react'
import Hls from 'hls.js'
import { HlsMetric } from '@/components/HlsMetric'

export function HlsPlayer({
  hlsConfig,
  playerRef = React.createRef(),
  src,
  autoPlay,
  ...props
}) {
  const hls = globalThis.window
    ? new Hls({
        enableWorker: false,
        ...hlsConfig,
      })
    : null

  useEffect(() => {
    // Init
    function initPlayer() {
      // Attatch
      if (playerRef.current != null) hls.attachMedia(playerRef.current)
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(src)

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (autoPlay)
            playerRef?.current
              ?.play()
              .catch(() =>
                console.log(
                  'Unable to autoplay prior to user interaction with the dom.'
                )
              )
        })
      })

      // Error on
      hls.on(Hls.Events.ERROR, function (_, data) {
        if (data.fatal)
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              newHls.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              newHls.recoverMediaError()
              break
            default:
              initPlayer()
              break
          }
      })
    }

    // Check for Media Source support
    if (Hls.isSupported()) initPlayer()

    return () => {
      if (hls != null) hls.destroy()
    }
  }, [autoPlay, hlsConfig, playerRef, src])
  const t0 = Date.now()

  return (
    <>
      <video ref={playerRef} {...props} autoPlay />
      <HlsMetric t0={t0} hls={hls} />
    </>
  )
}

export default HlsPlayer

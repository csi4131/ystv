'use client'
import React, { useContext, useEffect } from 'react'
import Hls from 'hls.js'

import { HlsContext } from '@/store/HlsContext'

export function HlsPlayer({
  hlsConfig,
  playerRef = React.createRef(),
  src,
  autoPlay,
  ...props
}) {
  const { metric } = useContext(HlsContext)

  useEffect(() => {
    let hls

    function initPlayer() {
      if (hls != null) hls.destroy()

      hls = new Hls({
        enableWorker: false,
        ...hlsConfig,
      })
      const t0 = Date.now()

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

      hls.on(Hls.Events.FRAG_CHANGED, (_, data) => {
        const event = {
          time: Date.now() - t0,
          type: 'frag changed',
          name: data.frag.sn + ' @ ' + data.frag.level,
          data: data.frag,
        }
        metric.events.push(event)
      })
    }

    // Check for Media Source support
    if (Hls.isSupported()) initPlayer()

    return () => {
      if (hls != null) hls.destroy()
    }
  }, [autoPlay, hlsConfig, playerRef, src])

  // If Media Source is supported, use HLS.js to play video
  if (Hls.isSupported()) return <video ref={playerRef} {...props} />

  // Fallback to using a regular video player if HLS is supported by default in the user's browser
  return <video ref={playerRef} {...props} />
}

export default HlsPlayer

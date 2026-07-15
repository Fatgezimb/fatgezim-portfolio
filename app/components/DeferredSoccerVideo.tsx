"use client";

import { useEffect, useRef } from "react";
import { SafeLink } from "./SafeLink";

const VIDEO_SRC = "/media/fatgezim-bela-soccer-winning-penalty.mp4";
const POSTER_SRC = "/media/fatgezim-bela-soccer-winning-penalty-poster.jpg";

export function DeferredSoccerVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Hydration can reconcile the server's no-JS marker after the head script runs.
    // Reassert the enhanced state before revealing the deferred player.
    document.documentElement.dataset.js = "enabled";

    const video = videoRef.current;
    const source = video?.querySelector("source");
    if (!video || !source) return;

    const loadMedia = () => {
      if (video.dataset.loaded === "true") return;
      video.dataset.loaded = "true";
      video.poster = POSTER_SRC;
      source.src = VIDEO_SRC;
      video.load();
    };

    if (!("IntersectionObserver" in window)) {
      loadMedia();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadMedia();
          observer.disconnect();
        }
      },
      { rootMargin: "480px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <video
        aria-describedby="soccer-video-transcript"
        aria-label="Archival Mason Intramurals video of Zim's winning penalty kick"
        controls
        data-poster={POSTER_SRC}
        playsInline
        preload="none"
        ref={videoRef}
      >
        <source data-src={VIDEO_SRC} type="video/mp4" />
        Your browser cannot play this video. The written description remains available
        beside it.
      </video>
      <noscript>
        {/* A real poster remains visible when client-side loading is unavailable. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Zim preparing to take the winning penalty in an archival Mason Intramurals post"
          decoding="async"
          height="720"
          loading="lazy"
          src={POSTER_SRC}
          width="720"
        />
        <p>
          <SafeLink href={VIDEO_SRC} newTab>
            Open the archival soccer clip
          </SafeLink>
        </p>
      </noscript>
    </>
  );
}

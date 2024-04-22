"use client";
import React from 'react';
import AudioPlayer from "@madzadev/audio-player";
import { motion } from "framer-motion"
import "@madzadev/audio-player/dist/index.css";
import { Track } from '@/lib/types';

const Player = ({ track }: {
  track: Track | null,
}) => {
  if (!track) return null;

  return <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <AudioPlayer
      key={track.title.concat(' ')}
      trackList={[track]} 
      includeTags={false}
      includeSearch={false}
      showPlaylist={false}
      sortTracks={false}
      autoPlayNextTrack={true} />
  </motion.div>;
}

export default Player;

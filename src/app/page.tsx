"use client"

import { useState } from "react"
import SelectOptionbar from "@/components/SelectOptionbar"
import Griddy from "@/components/Griddy"
import Player from "@/components/Player"
import { Track } from "@/lib/types"

export default function Home() {
  const [track, setTrack] = useState<Track | null>(null)
  const [tracksHash, setTracksHash] = useState<{ [key: string]: Track }>({})
  const [selectedTopic, setSelectedTopic] = useState<string>("world")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <main className="space-y-6">
      <Player track={track} />
      <SelectOptionbar
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Griddy
        selectedTopic={selectedTopic}
        setTrack={setTrack}
        setTracksHash={setTracksHash}
        tracksHash={tracksHash}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </main>
  )
}

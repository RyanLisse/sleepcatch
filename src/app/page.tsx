"use client"

import { useState, useEffect } from "react";
import SelectOptionbar from "@/components/SelectOptionbar"
import Griddy from "@/components/Griddy"
import Player from "@/components/Player";
// import { AuthSession, getUserAuth } from "@/lib/auth/utils";
import { Track } from "@/lib/types";

export default function Home() {
    // const [userAuth, setUserAuth] = useState<AuthSession | null>(null);
    const [track, setTrack] = useState<Track | null>(null);
    const [tracksHash, setTracksHash] = useState<{ [key: string]: Track }>({});
    const [selectedTopic, setSelectedTopic] = useState<string>("world")

    // useEffect(() => {
    //     const fetchUserAuth = async () => {
    //         const auth = await getUserAuth();
    //         setUserAuth(auth);
    //     };
    //     fetchUserAuth();
    // }, []);

    return (
        <main className="space-y-6">
            <Player track={track} />
            <SelectOptionbar
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
            />
            <Griddy
                selectedTopic={selectedTopic}
                setTrack={setTrack}
                setTracksHash={setTracksHash}
                tracksHash={tracksHash}
            />
        </main>
    )
}

import { cn } from "@/lib/utils";
import { CirclePlay, Loader } from "lucide-react";
import { Button } from "./ui/moving-border";
import { useState } from "react";
import { Track } from "@/lib/types";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    setTrack,
    tracksHash,
    setTracksHash,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    setTrack?: (track: Track) => void;
    tracksHash?: { [key: string]: Track };
    setTracksHash?: (tracks: { [key: string]: Track }) => void
}) => {
    const [audioIsLoading, setAudioIsLoading] = useState(false);

    const loadTrack = (track: Track) => {
        const trackHash = tracksHash![track.title.concat(' ')];
        if (track?.title && !trackHash) {
            const newTrackHash = {
                ...tracksHash,
                [track.title.concat(' ')]: track,
            };
            setTracksHash!(newTrackHash);
        }
        setTrack!(track);
        setAudioIsLoading(false);
    };

    const onLoadAudio = async () => {
        setAudioIsLoading(true);
        const trackHash = tracksHash![(title as string).concat(' ')];
        if (!trackHash) {
            const response = await fetch("/api/text_to_speech", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: `${title}.${description}`,
                }),
            });
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const track: Track = {
                title: title as string,
                url: audioUrl,
                tags: [],
            }
            const newTrackHash: {[key: string]: Track} = {
                ...tracksHash,
                [(title as string).concat(' ')]: track,
            };
            setTracksHash!(newTrackHash);
            setTrack!(track);
        } else {
            setTrack!(trackHash);
        }

        setAudioIsLoading(false);
    }

    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
                className
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {icon}
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 mb-2">
                    {description}
                </div>
                <Button
                    borderRadius="2.75rem"
                    className="bg-black dark:bg-zinc-800 text-white dark:text-white border-slate-200 dark:border-slate-800"
                    onClick={onLoadAudio}
                >
                    <span className="pr-1">Listen</span>
                    <span className="text-white">
                        {audioIsLoading ? <Loader /> : <CirclePlay />}
                    </span>
                </Button>
            </div>
        </div>
    );
};

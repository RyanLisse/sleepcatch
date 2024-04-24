export interface SelectOptionbarProps {
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
}
export interface Article {
  title: string
  description: string
  urlToImage?: string
}

export interface GriddyProps {
  selectedTopic: string;
  setTrack: (track: Track) => void;
  tracksHash?: { [key: string]: Track };
  setTracksHash?: (tracks: { [key: string]: Track }) => void
};

export interface Track {
  title: string;
  url: string;
  tags: string[];
}

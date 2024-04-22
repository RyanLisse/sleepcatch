export interface SelectOptionbarProps {
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
}
export interface Article {
  title: string
  description: string
  urlToImage?: string
}

export type GriddyProps = {
  selectedTopic: string;
};

export interface Track {
  title: string;
  url: string;
  tags: string[];
}

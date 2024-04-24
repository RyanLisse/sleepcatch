// Griddy.tsx
import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { Article, GriddyProps } from "@/lib/types";

const Skeleton = () => (
  <div className="animate-pulse flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-gray-300 to-gray-100 rounded-xl"></div>
);

const Griddy = ({ selectedTopic, setTrack, tracksHash, setTracksHash }: GriddyProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setError(null);
      try {
        const response = await fetch(`/api/get_articles?topic=${selectedTopic}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to load articles");
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, [selectedTopic]);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <BentoGrid className="max-w-6xl mx-auto">
      {articles.map((article, i) => (
        <BentoGridItem
          key={i}
          title={article.title}
          description={article.description}
          header={
            <div className="flex justify-center items-center w-full h-48 rounded-xl overflow-hidden">
              <img
                src={article.urlToImage || "https://via.placeholder.com/150"}
                alt="Article"
                className="w-full h-full object-cover"
                width="0"
                height="0"
              />
            </div>
          }
          className="flex flex-col space-y-4 p-4 shadow"
          setTrack={setTrack}
          tracksHash={tracksHash ?? {}} // Providing default empty object if undefined
          setTracksHash={setTracksHash ?? (() => {})} // Providing a no-op function if undefined
        />
      ))}
    </BentoGrid>
  );
};

export default Griddy;

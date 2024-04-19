"use client";
import React from 'react';
import { useFetchArticles } from "@/hooks/useFetchArticles";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { cn } from "@/lib/utils";

const Skeleton = () => (
  <div className="animate-pulse flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-gray-300 to-gray-100 rounded-xl"></div>
);

export default function Griddy() {
  const { articles, isLoading } = useFetchArticles();

  return (
    <BentoGrid className="max-w-6xl mx-auto">
      {!isLoading ? articles.map((article, i) => (
        <BentoGridItem
          key={i}
          title={article.title}
          description={article.description}
          header={
            <div className="flex justify-center items-center w-full h-48 rounded-xl overflow-hidden">
              <img src={article.urlToImage || 'https://via.placeholder.com/150'} alt="Article" className="w-full h-full object-cover"/>
            </div>
          }
          className={cn("flex flex-col space-y-4 p-4 shadow", i === 3 || i === 6 ? "md:col-span-2" : "")}
        />
      )) : Array(4).fill(null).map((_, index) => (
        <BentoGridItem
          key={index}
          title="Loading..."
          description="Fetching article data..."
          header={<Skeleton />}
          className="md:col-span-1 p-4"
        />
      ))}
    </BentoGrid>
  );
}

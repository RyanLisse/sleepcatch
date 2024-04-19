"use client";
import React, {useEffect, useState} from 'react';

import {BentoGrid, BentoGridItem} from "@/components/bento-grid";
import {cn} from "@/lib/utils";


const Skeleton = () => (
    <div
        className="animate-pulse flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-gray-300 to-gray-100 rounded-xl"></div>
);

export default function Griddy() {
    const [articles, setArticles] = useState([]);
    const [summary, setSummary] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            console.log("Starting to fetch news...");
            try {
                const response = await fetch(`https://newsapi.org/v2/everything?q=technology&pageSize=7&from=2024-04-18&sortBy=popularity&apiKey=63a46cc52d4f40998f773ecc0e389e51`);
                console.log("Received response from News API");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Data received:", data);
                if (data.articles && Array.isArray(data.articles)) {
                    setArticles(data.articles);
                } else {
                    throw new Error("Invalid data structure");
                }
            } catch (error) {
                console.error('Error fetching news:', error);
                setArticles([]);
            }
        };

        fetchNews();
    }, []);

    return (
        <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]">
            {articles.length > 0 ? articles.map((article, i) => (
                <BentoGridItem
                    key={i}
                    title={article.title}
                    description={article.description}
                    header={
                        <div
                            className="flex justify-center items-center w-full h-48 bg-gray-200 rounded-xl overflow-hidden">
                            <img src={article.urlToImage || 'https://via.placeholder.com/150'} alt="Article"
                                 className="w-full h-full object-cover"/>
                        </div>
                    }
                    className={cn("flex flex-col space-y-4 p-4", {"md:col-span-2": i % 3 === 0})}
                />
            )) : Array(4).fill().map((_, index) => (
                <BentoGridItem
                    key={index}
                    title="Loading..."
                    description="Fetching article data..."
                    header={<Skeleton/>}
                    className="md:col-span-1 p-4"
                />
            ))}
        </BentoGrid>

    );
}

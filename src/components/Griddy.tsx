"use client"
import React, {useEffect, useState} from "react"
import {BentoGrid, BentoGridItem} from "@/components/bento-grid"
import {cn} from "@/lib/utils"
import {Article, GriddyProps} from "@/lib/types"
import Link from "next/link";

const Skeleton = () => (
    <div
        className="animate-pulse flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-gray-300 to-gray-100 rounded-xl"></div>
)

const Griddy = ({selectedTopic, setTrack, tracksHash, setTracksHash}: GriddyProps) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`/api/get_articles?topic=${selectedTopic}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                setArticles(data.articles)
            } catch (error) {
                console.error("Error fetching articles:", error)
                setError("Failed to load articles")
            } finally {
                setIsLoading(false)
            }
        }

        fetchArticles()
    }, [selectedTopic])

    if (error) return <div>{error}</div>
    if (isLoading) return <div><Skeleton/></div>

    return (
        <BentoGrid className="max-w-6xl mx-auto">
            {articles.map((article, i) => (

                <BentoGridItem
                    key={i}
                    title={article.title}
                    url={article.url}
                    description={article.description}
                    header={
                        <div className="flex justify-center items-center w-full h-48 rounded-xl overflow-hidden">
                            <Link href={article.url}>
                                <img
                                    src={article.urlToImage || "https://source.unsplash.com/random"}
                                    alt="Article"
                                    className="w-full h-full object-cover"
                                    width="0"
                                    height="0"
                                />
                            </Link>
                        </div>
                    }
                    className={cn(
                        "flex flex-col space-y-4 p-4 shadow",
                        i === 3 || i === 6 ? "md:col-span-2" : ""
                    )}
                    setTrack={setTrack}
                    tracksHash={tracksHash}
                    setTracksHash={setTracksHash}
                />

            ))}
            {isLoading &&
                Array(4)
                    .fill(null)
                    .map((_, index) => (
                        <BentoGridItem
                            key={index}
                            title="Loading..."
                            description="Fetching article data..."
                            header={<Skeleton/>}
                            className="md:col-span-1 p-4"
                        />
                    ))}
        </BentoGrid>
    )
}

export default Griddy

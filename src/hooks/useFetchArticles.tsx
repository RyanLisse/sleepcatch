"use client"
import { useState, useEffect } from 'react';

interface Article {
  title: string;
  description: string;
  urlToImage?: string;
}

interface ArticlesState {
  articles: Article[];
  isLoading: boolean;
}

export const useFetchArticles = (): ArticlesState => {
  const [state, setState] = useState<ArticlesState>({ articles: [], isLoading: true });

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
          setState({ articles: data.articles, isLoading: false });
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setState({ articles: [], isLoading: false });
      }
    };

    fetchNews();
  }, []);

  return state;
};

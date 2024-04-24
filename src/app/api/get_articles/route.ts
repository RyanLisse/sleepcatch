import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const API_KEY = process.env.NEWS_API_KEY!;
  const baseUrl = `https://newsapi.org/v2/everything`;

  // Use dynamic topic from query parameters with "technology" as a default
  const searchParams = request.nextUrl.searchParams;
  const topic = searchParams.get("topic") || "technology";

  // Calculate the date to fetch news from the day before today
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate() - 1).padStart(2, '0');
  const from = `${year}-${month}-${day}`;

  // Use pageSize from 'paulman' branch for more results, sorted by popularity
  const pageSize = 10;
  const sortBy = "popularity";

  const url = `${baseUrl}?q=${topic}&pageSize=${pageSize}&from=${from}&sortBy=${sortBy}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return new NextResponse(`Error fetching news: ${error.message}`, {
      status: 500
    });
  }
}

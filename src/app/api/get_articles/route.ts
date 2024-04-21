import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const API_KEY = process.env.NEWS_API_KEY! // Ensure this is set in your environment variables
  const baseUrl = `https://newsapi.org/v2/everything`
  const searchParams = request.nextUrl.searchParams
  const topic = searchParams.get("topic") || "world" // Get the topic from the query parameters, or "business" as a default
  const pageSize = 21
  const from = "2024-04-18" // Dynamically set this as needed
  const sortBy = "popularity"
  console.log("current topic is", topic)

  const url = `${baseUrl}?q=${topic}&pageSize=${pageSize}&from=${from}&sortBy=${sortBy}&apiKey=${API_KEY}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return new NextResponse(`Error fetching news: ${error.message}`, {
      status: 500,
    })
  }
}

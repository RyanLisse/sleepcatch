"use client"

import React, { useState } from "react"
import { newsdata } from "@/lib/data/newsdata"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {SelectOptionbarProps} from "@/lib/types";




export default function SelectOptionbar({
  selectedTopic,
  setSelectedTopic,
}: SelectOptionbarProps) {
  const [isActive, setIsActive] = useState<boolean>(false)

  console.log(selectedTopic)


  const topicSelect = async (topic: string) => {
    console.log("triggered")
    const messagesResponse = await fetch(
      "/api/get_articles?" +
        new URLSearchParams({
          topic: topic,
        })
    )
    const data = await messagesResponse.json()
    console.log("triggered again", data)
  }

  return (
    <div className="flex flex-row w-full h-20  ">
      <div onClick={() => setIsActive(true)}>
        <Select
          onValueChange={async(value) => {
            setSelectedTopic(value)
           await topicSelect(value)
                     

          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="World Events" />
          </SelectTrigger>
          {isActive && (
            <SelectContent className="mainselect">
              {newsdata.map((topics) => (
                <SelectItem key={topics.id} value={topics.value}>
                  {topics.title}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>
      </div>
    </div>
  )
}

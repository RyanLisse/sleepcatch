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
import { Button } from "./ui/button"
import { SelectOptionbarProps, LoadingProps } from "@/lib/types"

interface SelectOptionbarPropsWithLoading
  extends SelectOptionbarProps,
    LoadingProps {}

export default function SelectOptionbar({
  selectedTopic,
  setSelectedTopic,
  setIsLoading,
}: SelectOptionbarPropsWithLoading) {
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
    <div className="flex flex-row w-full h-20 gap-10 ">
      <div onClick={() => setIsActive(true)}>
        <Select
          onValueChange={async (value) => {
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
      <div>
        <Button
          onClick={async () => {
            setIsLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 500))
            await topicSelect(selectedTopic)
            setIsLoading(false)
          }}
        >
          Refresh content
        </Button>
      </div>
    </div>
  )
}

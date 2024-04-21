"use client"

import { useState } from "react"
import { getUserAuth } from "@/lib/auth/utils"
import SelectOptionbar from "@/components/SelectOptionbar"
import Griddy from "@/components/Griddy"

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string>("world")

  return (
    <main className="space-y-6">
      <SelectOptionbar
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
      />
      <Griddy selectedTopic={selectedTopic} />
    </main>
  )
}

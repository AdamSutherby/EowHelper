'use client'

import React, { useState, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

const questsItems = [
  "Finding the Flying Plant", "What is Snow...Really?", "Up a Wall", "The Blocked Road",
  "The Flying Tile", "Elusive Tumbleweeds", "Beetle Ballyhoo", "Gerudo Tag Training",
  "Tornado Ghost?", "Wild Sandstorms", "Dohna's Challenge", "Deliver the Grilled Fish!",
  "A Treat for My Person", "The Zappy Shipwreck", "The Zora Child's Fate", "Precious Treasure",
  "Out of Bubble Kelp", "Big Shot", "Secret Chief Talks", "Runaway Horse", "Let's Play a Game",
  "The Great Fairy's Request", "A Curious Child", "An Out-There Zol", "Impa's Gift",
  "One Soldier Too Many", "From the Heart", "Automaton Engineer Dampé", "Explosions Galore!",
  "Performance Artist!", "Endless Stomach!", "Chop 'em in Two!", "Get Rich Quick!",
  "Cuccos on the Loose", "Question the Local Cats", "The Fireworks Artist", "Ready? Set? Goron!",
  "Guide Path", "Glide Path Trailblazer", "The Flames of fortune", "A Mountainous Mystery",
  "Getting It Twisted", "Stamp Stand Swallowed", "Snowball Magic", "The Mythical Deku Snake",
  "Mobbing Mothulas!", "The Rain-Making Monster", "Looking for Bempu", "Cotton-Candy Hunt",
  "Recipes, Please!"
]

export default function QuestsChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const filteredAndSortedItems = useMemo(() => {
    const filtered = questsItems.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return filtered.sort((a, b) => {
      if (checkedItems[a] === checkedItems[b]) {
        return questsItems.indexOf(a) - questsItems.indexOf(b)
      }
      return checkedItems[a] ? 1 : -1
    })
  }, [searchTerm, checkedItems])

  const completedCount = useMemo(() => {
    return Object.values(checkedItems).filter(Boolean).length
  }, [checkedItems])

  const handleCheck = (item: string) => {
    setCheckedItems(prev => {
      const newState = { ...prev, [item]: !prev[item] }
      if (newState[item]) {
        toast({
          title: `${item} completed!`,
          duration: 1000,
        })
      }
      return newState
    })
  }

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg h-full flex flex-col">
      <div className="sticky top-0 bg-gray-900 z-10 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Quests Checklist</h2>
          <span className="text-lg font-semibold">{completedCount} / {questsItems.length}</span>
        </div>
        <Input
          type="text"
          placeholder="Search quests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 bg-gray-800 text-white"
        />
      </div>
      <div className="space-y-2 flex-grow overflow-y-auto custom-scrollbar p-4">
        {filteredAndSortedItems.map(item => (
          <div key={item} className={`flex items-center hover:bg-gray-800 p-2 rounded transition-colors duration-200 ${checkedItems[item] ? 'opacity-50' : ''}`}>
            <Checkbox
              id={`quests-${item}`}
              checked={checkedItems[item] || false}
              onCheckedChange={() => handleCheck(item)}
              className="mr-2 border-white"
            />
            <label htmlFor={`quests-${item}`} className="text-sm cursor-pointer flex-grow">{item}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
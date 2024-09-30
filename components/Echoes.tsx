'use client'

import React, { useState, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

const echoesItems = [
  "Table", "Old Bed", "Soft Bed", "Zelda's Bed", "Decorative Shrub", "Wooden Box", "Pot",
  "Hyrule Castle Pot", "Gerudo Pot", "Boulder", "Rock Lava Rock", "Ice Block", "Snowball",
  "Sign", "Grilled Fish", "Meat", "Rock Roast", "Stuffed Toy", "Carrot", "Water Block",
  "Elephant Statue", "Hawk Statue", "Cat Statue", "Snake Statue", "Ancient Orb", "Trampoline",
  "Wind Cannon", "Flying Tile", "Cloud", "Spiked Roller", "Beetle Mound", "Firework", "Brazier",
  "Zol", "Ignizol", "Hydrozol", "Buzz Blob", "Spear Moblin", "Spear Moblin lv. 2", "Sword Moblin",
  "Sword Moblin Lv. 2", "Sword Moblin Lv. 3", "Club Boarblin", "Club Boarblin Lv. 2",
  "Boomerang Boarblin", "Lynel", "Lizalfos", "Lizalfos Lv. 2", "Lizalfos Lv. 3", "Darknut",
  "Darknut Lv. 2", "Darknut Lv. 3", "Armos", "Ball-and-Chain Trooper", "Gibdo", "Gibdo Lv. 2",
  "ReDead", "Fire Wizzrobe", "Ice Wizzrobe", "Electric Wizzrobe", "Caromadillo", "Caromadillo Lv. 2",
  "Rope", "Tornando", "Ribbitune", "Drippitune", "Torch Slug", "Freeze Slug", "Holmill", "Wolfos",
  "White Wolfos", "Keese", "Fire Keese", "Ice Keese", "Electric Keese", "Mothula", "Mothula Lv. 2",
  "Needlefly", "Albatrawl", "Crow", "Beakon", "Guay", "Octorok", "Fire Octo", "Ice Octo", "Sea Urchin",
  "Sand Crab", "Biri", "Tangler", "Tangler Lv. 2", "Bombfish", "Chompfin", "Piranha", "Sand Piranha",
  "Deku Baba", "Bio Deku Baba", "Deku Baba Lv. 2", "Peahat", "Giant Goponga Flower", "Zirro", "Ghirro",
  "Mini-Moldorm", "Strandtula", "Crawltula", "Baby Gohma", "Beetle", "Aruroda", "Tektite", "Tektite Lv. 2",
  "Hoarder", "Poe", "Moa", "Goo Specter", "Ghini", "Ghini Lv. 2", "Leever", "Pathblade", "Gustmaster",
  "Tweelus", "Temper Tweelus", "Freezard", "Snomaul", "Spark", "Platboom", "Beamos"
]

export default function EchoesChecklist() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
    const [searchTerm, setSearchTerm] = useState('')
    const { toast } = useToast()
  
    const filteredAndSortedItems = useMemo(() => {
      const filtered = echoesItems.filter(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
      return filtered.sort((a, b) => {
        if (checkedItems[a] === checkedItems[b]) {
          return echoesItems.indexOf(a) - echoesItems.indexOf(b) // Maintain original order
        }
        return checkedItems[a] ? 1 : -1 // Move checked items to the bottom
      })
    }, [searchTerm, checkedItems])
  
    const handleCheck = (item: string) => {
      setCheckedItems(prev => {
        const newState = { ...prev, [item]: !prev[item] }
        if (newState[item]) {
          toast({
            title: `${item} obtained!`,
            duration: 1000,
          })
        }
        return newState
      })
    }
  
    return (
      <div className="bg-gray-900 text-white rounded-lg shadow-lg h-full flex flex-col">
        <div className="sticky top-0 bg-gray-900 z-10 p-4">
          <h2 className="text-2xl font-bold mb-4">Echoes Checklist</h2>
          <Input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2 flex-grow overflow-y-auto custom-scrollbar p-4">
          {filteredAndSortedItems.map(item => (
            <div key={item} className={`flex items-center hover:bg-gray-800 p-2 rounded transition-colors duration-200 ${checkedItems[item] ? 'opacity-50' : ''}`}>
              <Checkbox
                id={`echoes-${item}`}
                checked={checkedItems[item] || false}
                onCheckedChange={() => handleCheck(item)}
                className="mr-2 border-white"
              />
              <label htmlFor={`echoes-${item}`} className="text-sm cursor-pointer flex-grow">{item}</label>
            </div>
          ))}
        </div>
      </div>
    )
  }
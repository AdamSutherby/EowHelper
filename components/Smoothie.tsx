'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const ingredients = [
  'Bubble Kelp', 'RiverHorse', 'Refreshing Grapes', 'Electro Apple',
  'Warm Pepper', 'Floral Nectar', 'Fresh Milk', 'Chilly Cactus',
  'Rocktato', 'Rock Salt', 'Radiant Butter', 'Twisted Pumpkin',
  'Monster Guts', 'Monster Fang', 'Tough Mango', 'Golden Egg'
]

const recipeMap = {
  'Bubble Kelp': {
    'Bubble Kelp': 'Bubble Smoothie',
    'RiverHorse': 'Rapid Smoothie',
    'Refreshing Grapes': 'Mixed Bubble Smoothie',
    'Electro Apple': 'Mixed Bubble Smoothie',
    'Fresh Milk': 'Milky Bubble Smoothie',
    'Rocktato': 'Mixed Bubble Smoothie',
    'Rock Salt': 'Salted Bubble Smoothie',
    'Radiant Butter': 'Radiant Smoothie',
    'Twisted Pumpkin': 'Pumpkin Bubble Smoothie',
    'Monster Fang': 'Bubble Potion',
    'Tough Mango': 'Mixed Tough Smoothie',
    'Golden Egg': 'Golden Bubble Smoothie'
  },
  'RiverHorse': {
    'RiverHorse': 'Rapid Smoothie',
    'Refreshing Grapes': 'Refreshing Mixed Smoothie',
    'Electro Apple': 'Mixed Apple Smoothie',
    'Warm Pepper': 'Rapid Smoothie',
    'Floral Nectar': 'Rapid Smoothie',
    'Fresh Milk': 'Milky Rapid Smoothie',
    'Chilly Cactus': 'Cactus Smoothie',
    'Rocktato': 'Rapid Smoothie',
    'Rock Salt': 'Rapid Smoothie',
    'Twisted Pumpkin': 'Mixed Twisty Smoothie',
    'Monster Fang': 'Rapid Potion',
    'Tough Mango': 'Rapid Smoothie',
    'Golden Egg': 'Golden Rapid Smoothie'
  },
  'Refreshing Grapes': {
    'Refreshing Grapes': 'Refreshing Smoothie',
    'Electro Apple': 'Refreshing Mixed Smoothie',
    'Warm Pepper': 'Warm Mixed Special',
    'Floral Nectar': 'Sweet Refreshing Smoothie',
    'Fresh Milk': 'Refreshing Milky Smoothie',
    'Chilly Cactus': 'Refreshing Mixed Smoothie',
    'Rocktato': 'Mixed Climbing Smoothie',
    'Rock Salt': 'Refreshing Mixed Smoothie',
    'Radiant Butter': 'Refreshing Mixed Smoothie',
    'Twisted Pumpkin': 'Mixed Twisted Smoothie',
    'Tough Mango': 'Refreshing Mixed Smoothie',
    'Golden Egg': 'Golden Smoothie'
  },
  'Electro Apple': {
    'Electro Apple': 'Apple Smoothie',
    'Warm Pepper': 'Warm Mixed Special',
    'Floral Nectar': 'Mixed Apple Smoothie',
    'Fresh Milk': 'Mixed Milky Smoothie',
    'Chilly Cactus': 'Mixed Apple Smoothie',
    'Rocktato': 'Mixed Apple Smoothie',
    'Rock Salt': 'Salted Apple Smoothie',
    'Radiant Butter': 'Apple Radiant Smoothie',
    'Twisted Pumpkin': 'Mixed Twisty Smoothie',
    'Monster Guts': 'Electro Potion',
    'Tough Mango': 'Mixed Tough Smoothie',
    'Golden Egg': 'Golden Electro Smoothie'
  },
  'Warm Pepper': {
    'Warm Pepper': 'Warm Smoothie',
    'Fresh Milk': 'Warm Mixed Special',
    'Chilly Cactus': 'Warm Mixed Special',
    'Rocktato': 'Warm Rocktato Smoothie',
    'Twisted Pumpkin': 'Warm Mixed Smoothie',
    'Monster Guts': 'Piping-Hot Potion',
    'Monster Fang': 'Warming Potion',
    'Tough Mango': 'Warm Mixed Special',
    'Golden Egg': 'Golden Piping-Hot Smoothie'
  },
  'Floral Nectar': {
    'Floral Nectar': 'Sweet Smoothie',
    'Fresh Milk': 'Milky Sweet Smoothie',
    'Chilly Cactus': 'Cactus Smoothie',
    'Rocktato': 'Sweet Climbing Smoothie',
    'Radiant Butter': 'Sweet Radiant Smoothie',
    'Twisted Pumpkin': 'Sweet Twisty Smoothie',
    'Tough Mango': 'Sweet Tough Smoothie',
    'Golden Egg': 'Golden Smoothie'
  },
  'Fresh Milk': {
    'Fresh Milk': 'Milky Smoothie',
    'Chilly Cactus': 'Mixed Milky Smoothie',
    'Rocktato': 'Milky Climbing Smoothie',
    'Rock Salt': 'Salted Milky Smoothie',
    'Radiant Butter': 'Milky Radiant Smoothie',
    'Twisted Pumpkin': 'Milky Twisty Smoothie',
    'Tough Mango': 'Milky Tough Smoothie',
    'Golden Egg': 'Golden Smoothie'
  },
  'Chilly Cactus': {
    'Chilly Cactus': 'Cactus Smoothie',
    'Rocktato': 'Mixed Climbing Smoothie',
    'Rock Salt': 'Salted Cactus Smoothie',
    'Radiant Butter': 'Mixed Radiant Smoothie',
    'Twisted Pumpkin': 'Cactus Smoothie',
    'Monster Guts': 'Chilly Potion',
    'Tough Mango': 'Mixed Tough Smoothie',
    'Golden Egg': 'Golden Chilly Smoothie'
  },
  'Rocktato': {
    'Rocktato': 'Climbing Smoothie',
    'Rock Salt': 'Salted Climbing Smoothie',
    'Radiant Butter': 'Mixed Climbing Smoothie',
    'Twisted Pumpkin': 'Mixed Twisted Smoothie',
    'Monster Fang': 'Climbing Potion',
    'Tough Mango': 'Mango Climbing Smoothie',
    'Golden Egg': 'Golden Climbing Smoothie'
  },
  'Rock Salt': {
    'Radiant Butter': 'Salted Radiant Smoothie',
    'Twisted Pumpkin': 'Salted Twisty Smoothie',
    'Tough Mango': 'Salted Tough Smoothie',
    'Golden Egg': 'Golden Smoothie'
  },
  'Radiant Butter': {
    'Radiant Butter': 'Radiant Smoothie',
    'Twisted Pumpkin': 'Pumpkin Radiant Smoothie',
    'Monster Fang': 'Radiant Potion',
    'Tough Mango': 'Mixed Tough Smoothie',
    'Golden Egg': 'Golden Radiant Smoothie'
  },
  'Twisted Pumpkin': {
    'Twisted Pumpkin': 'Twisty Smoothie',
    'Monster Fang': 'Twisty Potion',
    'Tough Mango': 'Mango Twisty Smoothie',
    'Golden Egg': 'Golden Twisty Smoothie'
  },
  'Monster Guts': {
    'Tough Mango': 'Tough Potion'
  },
  'Tough Mango': {
    'Tough Mango': 'Tough Smoothie',
    'Golden Egg': 'Golden Tough Smoothie'
  },
  'Golden Egg': {
    'Golden Egg': 'Golden Smoothie'
  }
}

const sortedRecipes = [
  'Sweet Smoothie', 'Milky Sweet Smoothie', 'Refreshing Smoothie',
  'Refreshing Mixed Smoothie', 'Sweet Refreshing Smoothie', 'Refreshing Milky Smoothie',
  'Milky Smoothie', 'Mixed Milky Smoothie', 'Salted Milky Smoothie',
  'Tough Smoothie', 'Mixed Tough Smoothie', 'Sweet Tough Smoothie',
  'Milky Tough Smoothie', 'Salted Tough Smoothie', 'Cactus Smoothie',
  'Salted Cactus Smoothie', 'Warm Smoothie', 'Warm Mixed Smoothie',
  'Warm Rocktato Smoothie', 'Warm Mixed Special', 'Apple Smoothie',
  'Mixed Apple Smoothie', 'Salted Apple Smoothie', 'Bubble Smoothie',
  'Mixed Bubble Smoothie', 'Pumpkin Bubble Smoothie', 'Milky Bubble Smoothie',
  'Salted Bubble Smoothie', 'Rapid Smoothie', 'Milky Rapid Smoothie',
  'Climbing Smoothie', 'Mixed Climbing Smoothie', 'Sweet Climbing Smoothie',
  'Milky Climbing Smoothie', 'Mango Climbing Smoothie', 'Salted Climbing Smoothie',
  'Radiant Smoothie', 'Apple Radiant Smoothie', 'Mixed Radiant Smoothie',
  'Sweet Radiant Smoothie', 'Pumpkin Radiant Smoothie', 'Milky Radiant Smoothie',
  'Salted Radiant Smoothie', 'Twisty Smoothie', 'Mixed Twisty Smoothie',
  'Sweet Twisty Smoothie', 'Milky Twisty Smoothie', 'Mango Twisty Smoothie',
  'Salted Twisty Smoothie', 'Golden Smoothie', 'Golden Tough Smoothie',
  'Golden Chilly Smoothie', 'Golden Piping-Hot Smoothie', 'Golden Electro Smoothie',
  'Golden Bubble Smoothie', 'Golden Rapid Smoothie', 'Golden Climbing Smoothie',
  'Golden Radiant Smoothie', 'Golden Twisty Smoothie', 'Tough Potion',
  'Chilly Potion', 'Warming Potion', 'Piping-Hot Potion', 'Electro Potion',
  'Bubble Potion', 'Rapid Potion', 'Climbing Potion', 'Radiant Potion',
  'Twisty Potion'
]

export default function SmoothieRecipeApp() {
  const [inventory, setInventory] = useState<Record<string, number>>({})
  const [suggestedRecipes, setSuggestedRecipes] = useState<Array<{ recipe: string, ingredients: [string, string] }>>([])
  const [checkedRecipes, setCheckedRecipes] = useState<Record<string, boolean>>({})
  const [finishedRecipes, setFinishedRecipes] = useState(0)

  useEffect(() => {
    updateSuggestedRecipes()
    setFinishedRecipes(Object.values(checkedRecipes).filter(Boolean).length)
  }, [inventory, checkedRecipes])

  const updateSuggestedRecipes = () => {
    const availableRecipes: Array<{ recipe: string, ingredients: [string, string], totalIngredients: number }> = []
    
    for (const [ingredient1, recipes] of Object.entries(recipeMap)) {
      for (const [ingredient2, recipe] of Object.entries(recipes)) {
        if (
          !checkedRecipes[recipe] && // Ensure the recipe isn't checked
          inventory[ingredient1] > 0 &&
          inventory[ingredient2] > 0 &&
          (ingredient1 !== ingredient2 || inventory[ingredient1] > 1)
        ) {
          availableRecipes.push({
            recipe,
            ingredients: [ingredient1, ingredient2],
            totalIngredients: inventory[ingredient1] + inventory[ingredient2]
          })
        }
      }
    }
  
    // Sort by total ingredients (descending) and then by menu order
    availableRecipes.sort((a, b) => {
      if (b.totalIngredients !== a.totalIngredients) {
        return b.totalIngredients - a.totalIngredients
      }
      return sortedRecipes.indexOf(a.recipe) - sortedRecipes.indexOf(b.recipe)
    })
  
    // Only keep the top 3 recipes
    setSuggestedRecipes(availableRecipes.slice(0, 3))
  }
  

  const updateIngredient = (ingredient: string, value: number) => {
    setInventory(prev => {
      const newInventory = { ...prev, [ingredient]: Math.max(0, value) }
      // Remove ingredients with 0 count
      if (newInventory[ingredient] === 0) {
        delete newInventory[ingredient]
      }
      return newInventory
    })
  }

  const toggleRecipe = (recipe: string, ingredients?: [string, string]) => {
    setCheckedRecipes(prev => ({ ...prev, [recipe]: !prev[recipe] }))
    
    // Only update inventory and recipe list if the recipe was not previously checked
    if (ingredients && !checkedRecipes[recipe]) {
      setInventory(prev => {
        const newInventory = { ...prev }
        newInventory[ingredients[0]] = Math.max(0, (newInventory[ingredients[0]] || 0) - 1)
        newInventory[ingredients[1]] = Math.max(0, (newInventory[ingredients[1]] || 0) - 1)
        
        // Remove ingredients with 0 count
        if (newInventory[ingredients[0]] === 0) delete newInventory[ingredients[0]]
        if (newInventory[ingredients[1]] === 0) delete newInventory[ingredients[1]]
        
        return newInventory
      })
    }
  
    // Recalculate suggested recipes after toggling
    updateSuggestedRecipes();
  }
  
  

  const getRecipeIngredients = (recipe: string) => {
    const ingredients: string[] = []
    for (const [ingredient1, recipes] of Object.entries(recipeMap)) {
      for (const [ingredient2, recipeName]  of Object.entries(recipes)) {
        if (recipeName === recipe) {
          ingredients.push(`${ingredient1} + ${ingredient2}`)
        }
      }
    }
    return ingredients
  }

  const resetApp = () => {
    setInventory({})
    setCheckedRecipes({})
    setSuggestedRecipes([])
    setFinishedRecipes(0)
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Smoothie Recipe App</h1>
        <Button onClick={resetApp} variant="outline" className='text-black'>Reset</Button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        {ingredients.map(ingredient => (
          <div key={ingredient} className="bg-gray-800 p-4 rounded shadow">
            <Image
              src={`/images/${ingredient.toLowerCase().replace(' ', '_')}.png`}
              alt={ingredient}
              width={100}
              height={100}
              className="mb-2 mx-auto"
            />
            <p className="text-center mb-2">{ingredient}</p>
            <div className="flex items-center justify-center mb-2">
              <Button 
                onClick={() => updateIngredient(ingredient, (inventory[ingredient] || 0) - 1)}
                variant="outline"
                size="icon"
                className="h-8 w-8 border-black text-black"
              >
                -
              </Button>
              <Input
                type="number"
                value={inventory[ingredient] || 0}
                onChange={(e) => updateIngredient(ingredient, parseInt(e.target.value) || 0)}
                className="w-16 mx-2 text-center bg-gray-700"
              />
              <Button 
                onClick={() => updateIngredient(ingredient, (inventory[ingredient] || 0) + 1)}
                variant="outline"
                size="icon"
                className="h-8 w-8 border-black text-black"
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-2">Suggested Recipes</h2>
      <ul className="mb-8 space-y-2">
        {suggestedRecipes.map(({ recipe, ingredients }) => (
          <li key={recipe} className="flex items-center justify-between bg-gray-800 p-2 rounded">
            <div className="flex items-center">
              <Image
                src={`/images/${ingredients[0].toLowerCase().replace(' ', '_')}.png`}
                alt={ingredients[0]}
                width={30}
                height={30}
                className="mr-2"
              />
              <Image
                src={`/images/${ingredients[1].toLowerCase().replace(' ', '_')}.png`}
                alt={ingredients[1]}
                width={30}
                height={30}
                className="mr-2"
              />
              <span>{`${ingredients[0]} + ${ingredients[1]} = ${recipe}`}</span>
            </div>
            <Checkbox
              className='border-white'
              checked={checkedRecipes[recipe] || false}
              onCheckedChange={() => toggleRecipe(recipe, ingredients)}
            />
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">All Recipes</h2>
        <div className="text-xl font-semibold">
          {finishedRecipes} / {sortedRecipes.length}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {sortedRecipes.map(recipe => (
          <TooltipProvider key={recipe}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`flex items-center justify-between bg-gray-800 p-2 rounded transition-opacity duration-300 ${
                    checkedRecipes[recipe] ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-center">
                    <Checkbox
                      id={recipe}
                      checked={checkedRecipes[recipe] || false}
                      onCheckedChange={() => toggleRecipe(recipe)}
                      className="mr-2 border-white"
                    />
                    <label htmlFor={recipe}>{recipe}</label>
                  </div>
                  <Image
                    src={`/images/${recipe.toLowerCase().replace(/\s+/g, '_')}.png`}
                    alt={recipe}
                    width={30}
                    height={30}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ingredients:</p>
                <ul>
                  {getRecipeIngredients(recipe).map((ingredientPair, index) => (
                    <li key={index}>{ingredientPair}</li>
                  ))}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  )
}
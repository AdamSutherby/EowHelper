import SmoothieRecipeApp from "../components/Smoothie";
import EchoesChecklist from "../components/Echoes";
import QuestsChecklist from "../components/quests";


export function Page() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white overflow-hidden">
      <div className="w-full md:w-1/4 p-4 overflow-y-auto custom-scrollbar">
        <EchoesChecklist />
      </div>
      <div className="w-full md:w-1/4 p-4 overflow-y-auto custom-scrollbar">
        <QuestsChecklist />
      </div>
      <div className="w-full md:w-1/2 p-4 overflow-y-auto custom-scrollbar">
        <SmoothieRecipeApp />
      </div>
    </div>
  )
}

export default Page;
import { SiRepublicofgamers } from "react-icons/si"
import { GoPerson } from "react-icons/go"

function Navbar() {
  
  
  return (
    <nav className="flex justify-between items-center w-full py-7 px-12 text-slate-200 font-medium text-sm">
        <div className="flex items-center gap-2">
            <SiRepublicofgamers className="w-12 h-12 px-2 py-1 bg-red-700 rounded-tl-xl rounded-br-xl"/>
            <span className="flex gap-2 text-xl font-semibold">
                <p className="tracking-widest">Card</p> <p className="text-red-700 tracking-wider">Battle</p>
            </span>
        </div>
        <ul className="flex gap-10">
            <li className="tracking-widest hover:bg-red-600/40 rounded-xl duration-300 p-2 px-6 cursor-pointer">
                BATTLE
            </li>
            <li className="tracking-widest hover:bg-red-600/40 rounded-xl duration-300 p-2 px-6 cursor-pointer">
                COLLECTION
            </li>
            <li className="tracking-widest hover:bg-red-600/40 rounded-xl duration-300 p-2 px-6 cursor-pointer">
                ABOUT
            </li>
        </ul>
        <div className="flex items-center gap-4">
            <button className="bg-red-700 px-5 tracking-wider py-2.5 rounded-l-xl font-semibold hover:bg-red-700/70 duration-300 cursor-pointer">
                Follow Me
            </button>
            <GoPerson  className="w-10 h-10 p-2 border-2 rounded-r-xl cursor-pointer hover:text-slate-200/70 duration-300"/>
        </div>
    </nav>
  )
}

export default Navbar
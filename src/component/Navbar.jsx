import { SiRepublicofgamers } from "react-icons/si"
import { GoPerson } from "react-icons/go"
import { useState } from "react"
import { BiMenu, BiX } from "react-icons/bi";
import MobileMenu from "./Navbar/MobileMenu";
import { navLinks } from "../constant";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 flex flex-col md:flex-row w-full text-slate-200 font-medium text-sm">
        <div className="flex justify-between items-center w-full py-7 px-12">
            <div className="flex items-center gap-2">
            <SiRepublicofgamers className="w-12 h-12 px-2 py-1 bg-red-700 rounded-tl-xl rounded-br-xl"/>
            <span className="flex gap-2 text-xl font-semibold">
                <p className="tracking-widest">Card</p> <p className="text-red-700 tracking-wider">Battle</p>
            </span>
            </div>
            <ul className="hidden md:flex gap-10">
                {navLinks.map((link) => (
                    <li 
                      key={link.name}
                      className="tracking-widest hover:bg-red-600/40 rounded-xl duration-300 p-2 px-6 cursor-pointer">
                        <a href={link.href}>{link.name}</a>
                    </li>
                ))}
            </ul>
            <div className="hidden md:flex items-center gap-4">
                <button className="bg-red-700 px-5 tracking-wider py-2.5 rounded-l-xl font-semibold hover:bg-red-700/70 duration-300 cursor-pointer">
                    Follow Me
                </button>
                <GoPerson  className="w-10 h-10 p-2 border-2 rounded-r-xl cursor-pointer hover:text-slate-200/70 duration-300"/>
            </div>

            <div className="md:hidden flex items-center gap-4">
                <button onClick={() => setIsOpen(!isOpen)} className="text-slate-200">
                    {isOpen ? <BiX size={28} /> : <BiMenu size={28} />}
                </button>
            </div>
        </div>

        {isOpen &&
            <MobileMenu setIsOpen={setIsOpen}/>
        }
    </nav>
  )
}
import { navLinks } from "../../constant";

export default function MobileMenu( setIsOpen ) {
  return (
    <div
      className="fixed left-0 right-0 z-100 top-25 md:hidden bg-black/5 border-t border-white/10 overflow-hidden backdrop-blur-xl"
      >
      <div className="flex flex-col p-6 space-y-4 text-center">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-red-600 py-2 block font-medium border-b-2 border-transparent hover:border-b-2 hover:border-red-800 rounded-b-full w-auto duration-300"
          >
            {link.name}
          </a>
        ))}
        <div className="pt-4 border-t border-white/10">
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="bg-red-700 hover:bg-red-700/70 text-white py-3 rounded-full w-full block font-bold duration-300"
          >
            Follow Me
          </a>
        </div>
      </div>
    </div>
  );
}
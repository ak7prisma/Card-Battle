import { navLinks } from "../../constant";

export default function MobileMenu( setIsOpen) {
  return (
    <div
      className="fixed left-0 right-0 top-25 md:hidden bg-black/5 border-t border-white/10 overflow-hidden rounded-b-3xl backdrop-blur-xl"
      >
      <div className="flex flex-col p-6 space-y-4 text-center">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-red-600 py-2 block font-medium"
          >
            {link.name}
          </a>
        ))}
        <div className="pt-4 border-t border-white/10">
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="bg-red-700 hover:bg-red-700/70 text-white py-3 rounded-full w-full block font-bold"
          >
            Follow Me
          </a>
        </div>
      </div>
    </div>
  );
}
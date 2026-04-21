import { NavLink } from "react-router-dom";
import { navLinks } from "../../constant/navlink";

export default function MobileMenu({ setIsOpen }) {
  return (
    <div
      className="fixed left-0 right-0 z-100 top-25 md:hidden bg-black/5 border-t border-white/10 overflow-hidden backdrop-blur-xl"
      >
      <div className="flex flex-col p-6 space-y-4 text-center">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.href}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `py-2 block font-medium border-b-2 rounded-b-full w-auto duration-300 ${
                isActive
                  ? "text-red-600 border-red-800"
                  : "text-slate-300 border-transparent hover:text-red-600 hover:border-red-800"
              }`
            }
          >
            {link.name}

          </NavLink>
        ))}
        <div className="pt-4 border-t border-white/10">
          <a
            href="https://portofolio-ahmad-kurnia-prisma.vercel.app/#contact"
            target="_blank"
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
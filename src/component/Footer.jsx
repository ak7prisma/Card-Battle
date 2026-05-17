export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-center items-center gap-2 p-5 border-t text-xs md:text-sm border-slate-300/20 text-slate-300/50 mt-20 text-center">
      <span>© by Ahmad Kurnia Prisma</span>
      <span className="hidden md:inline text-slate-300/30">||</span>
      <span>ahmadkurniaprisma@gmail.com</span>
    </footer>
  )
}
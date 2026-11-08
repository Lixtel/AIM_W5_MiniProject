import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Tasks' },
  { to: '/stats', label: 'Stats' },
  { to: '/about', label: 'About' },
]

export default function Header() {
  return (
    <header className="border-b border-lilac bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <NavLink to="/" className="text-2xl font-extrabold tracking-tight text-plum">
          TaskBoard
        </NavLink>
        <nav aria-label="Main navigation" className="flex gap-2 sm:gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-lilac text-plum' : 'text-slate-600 hover:bg-canvas hover:text-plum'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

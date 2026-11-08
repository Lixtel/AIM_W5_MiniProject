import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Tasks' },
  { to: '/stats', label: 'Stats' },
  { to: '/about', label: 'About' },
]

export default function Header() {
  // The header owns whether its mobile navigation is expanded.
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-lilac bg-white">
      <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="text-xl font-extrabold tracking-tight text-plum sm:text-2xl">
            TaskBoard
          </NavLink>
          <button
            type="button"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-plum hover:bg-canvas focus:outline-none focus:ring-2 focus:ring-plum/30 sm:hidden"
            aria-controls="main-navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5 stroke-current" strokeWidth="1.8">
              <path strokeLinecap="round" d="M3 5h14M3 10h14M3 15h14" />
            </svg>
            Menu
          </button>
        </div>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={`${isMenuOpen ? 'flex' : 'hidden'} flex-col gap-1 pt-3 sm:flex sm:flex-row sm:gap-6 sm:pt-0`}
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setIsMenuOpen(false)}
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

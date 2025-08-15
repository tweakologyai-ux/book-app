import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/Auth';
import { motion } from 'framer-motion';
import { Search, LogOut } from 'lucide-react';

export default function Nav(){
  const { user, signOut } = useAuth();
  const links = [
    { to: '/jobs', label: 'Browse Jobs' },
    { to: '/courses', label: 'Free Courses' },
    { to: '/books', label: 'Free Books' },
    { to: '/opps', label: 'Opportunities' },
    { to: '/blogs', label: 'Blogs' }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-zinc-950/60 border-b border-zinc-200/70 dark:border-zinc-800">
      <div className="container-px mx-auto">
        <div className="flex items-center justify-between py-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <Link to="/" className="text-xl font-bold tracking-tight">
              <span className="text-zinc-900 dark:text-white">Free</span>
              <span className="text-brand-600 dark:text-brand-400">hub</span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm transition hover:text-brand-700 dark:hover:text-brand-300 ${
                    isActive ? 'text-brand-700 dark:text-brand-300 font-semibold' : 'text-zinc-700 dark:text-zinc-300'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/search" className="btn-outline hidden sm:inline-flex">
              <Search size={16} /> Search
            </Link>
            {user ? (
              <button onClick={signOut} className="btn-outline">
                <LogOut size={16}/> Sign out
              </button>
            ) : (
              <Link to="/admin" className="btn-primary">Admin</Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

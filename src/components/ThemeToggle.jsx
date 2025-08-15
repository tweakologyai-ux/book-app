import { useEffect, useState } from 'react';

export default function ThemeToggle(){
  const [dark, setDark] = useState(() => typeof window !== 'undefined' && document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      <span className="text-xl">{dark ? '🌙' : '☀️'}</span>
    </button>
  );
}

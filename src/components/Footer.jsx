export default function Footer(){
  return (
    <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container-px mx-auto py-8 text-sm text-zinc-600 dark:text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Freehub. All rights reserved.</p>
        <p className="opacity-80">Built with React + Supabase</p>
      </div>
    </footer>
  )
}

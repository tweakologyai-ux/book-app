import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home(){
  return (
    <div className="space-y-12">
      <section className="card p-10 overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Your hub for <span className="text-brand-600 dark:text-brand-400">free resources</span>
          </h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Browse curated jobs, courses, books, opportunities, and blogs — all in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/books" className="btn-primary">Explore Books</Link>
            <Link to="/jobs" className="btn-outline">Browse Jobs</Link>
            <Link to="/courses" className="btn-outline">Find Courses</Link>
          </div>
        </motion.div>
        <div className="absolute inset-0 -z-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl bg-brand-500/20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl bg-brand-700/10" />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { to:'/books', label:'Free Books', desc:'Download high-quality PDFs' },
            { to:'/jobs', label:'Browse Jobs', desc:'Curated openings and internships' },
            { to:'/courses', label:'Free Courses', desc:'Learn from top resources' },
            { to:'/opps', label:'Opportunities', desc:'Scholarships, grants, events' },
            { to:'/blogs', label:'Blogs', desc:'Community posts & tips' },
            { to:'/search', label:'Search', desc:'Find across all sections' },
          ].map((c, idx)=>(
            <motion.div
              key={c.to}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="card p-5 hover:shadow-lg transition"
            >
              <h3 className="font-semibold">{c.label}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{c.desc}</p>
              <Link to={c.to} className="btn-outline mt-4 inline-flex">Open</Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

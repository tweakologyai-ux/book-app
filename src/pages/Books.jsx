
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function Books(){
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });
      if(error) console.error(error);
      else setBooks(data || []);
    })();
  }, []);

  const filtered = books.filter(b =>
    [b.title, b.author, b.description, b.categories].join(' ').toLowerCase().includes(q.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-2xl font-bold">Free Books</h1>
        <input placeholder="Search books..." value={q} onChange={e=>setQ(e.target.value)} className="input w-60" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((b, idx) => (
          <div key={b.id || idx} className="card overflow-hidden">
            {b.cover_url ? (
              <img src={b.cover_url} alt={b.title} className="h-44 w-full object-cover" />
            ) : (
              <div className="h-44 bg-zinc-100 dark:bg-zinc-800" />
            )}
            <div className="p-4">
              <h3 className="text-base font-semibold">{b.title}</h3>
              {b.author && <p className="text-sm text-zinc-600 dark:text-zinc-400">{b.author}</p>}
              {b.description && <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">{b.description}</p>}
              {b.file_url && (
                <a href={b.file_url} target="_blank" rel="noreferrer" className="btn-primary mt-3 inline-flex">Download PDF</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

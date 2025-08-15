import { useState } from 'react';
import CardGrid from '../components/CardGrid';
import { motion } from 'framer-motion';

export default function Search(){
  const [query, setQuery] = useState('');
  const items = []; // Replace with Supabase full-text search

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <input
        className="input mb-6"
        placeholder="Search resources..."
        value={query}
        onChange={e=>setQuery(e.target.value)}
      />
      <CardGrid items={items} />
    </motion.div>
  );
}

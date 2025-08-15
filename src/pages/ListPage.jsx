
import { useEffect, useState, useMemo } from 'react';
import CardGrid from '../components/CardGrid';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function ListPage({ type, title }){
  const [items, setItems] = useState([]);

  const table = useMemo(() => {
    if(type === 'job') return 'jobs';
    if(type === 'course') return 'courses';
    return null;
  }, [type]);

  useEffect(() => {
    if(!table) return;
    (async () => {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });
      if(error) console.error(error);
      else {
        // Map to UI expected keys
        const mapped = (data || []).map((d) => ({
          id: d.id,
          title: d.title,
          description: d.description,
          cover: d.cover_url || null,
          link: d.link || null,
          company: d.company || null,
          categories: d.categories || null,
        }));
        setItems(mapped);
      }
    })();
  }, [table]);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <CardGrid items={items} />
    </motion.div>
  );
}


import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { uploadToBucket } from '../lib/upload';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || '')
  .toLowerCase()
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const COVER_BUCKET = 'assets';
const BOOK_BUCKET = 'books';

export default function Admin(){
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('books');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title:'', author:'', description:'', categories:'', link:'' });
  const [cover, setCover] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  const isAdmin = useMemo(() => {
    const email = user?.email?.toLowerCase()?.trim();
    if(!email) return false;
    if(ADMIN_EMAILS.length === 0) return true; // if none defined, allow any signed-in user
    return ADMIN_EMAILS.includes(email);
  }, [user]);

  async function signIn(e){
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if(error) toast.error(error.message);
    else toast.success('Signed in');
  }

  async function signOut(){
    await supabase.auth.signOut();
    toast.success('Signed out');
  }

  function makePath(prefix, file){
    const safeName = file.name.replace(/\s+/g,'-').toLowerCase();
    return `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2,8)}-${safeName}`;
  }

  async function handleSubmit(e){
    e.preventDefault();
    if(!isAdmin){
      toast.error('Not authorized');
      return;
    }
    try{
      setLoading(true);
      if(!form.title) throw new Error('Title is required');

      let cover_url = null;
      let file_url = null;

      if(cover){
        const coverPath = makePath('covers', cover);
        cover_url = await uploadToBucket(COVER_BUCKET, coverPath, cover);
      }
      if(tab === 'books' && file){
        const filePath = makePath('books', file);
        file_url = await uploadToBucket(BOOK_BUCKET, filePath, file);
      }

      const base = {
        title: form.title,
        description: form.description || null,
        created_at: new Date().toISOString(),
      };

      if(tab === 'books'){
        const payload = {
          ...base,
          author: form.author || null,
          categories: form.categories || null,
          cover_url,
          file_url,
        };
        const { error } = await supabase.from('books').insert(payload);
        if(error) throw error;
        toast.success('Book saved');
      } else if(tab === 'jobs'){
        const payload = {
          ...base,
          company: form.author || null, // reuse author field as company
          link: form.link || null,
        };
        const { error } = await supabase.from('jobs').insert(payload);
        if(error) throw error;
        toast.success('Job saved');
      } else if(tab === 'courses'){
        const payload = {
          ...base,
          link: form.link || null,
          categories: form.categories || null,
        };
        const { error } = await supabase.from('courses').insert(payload);
        if(error) throw error;
        toast.success('Course saved');
      } else {
        toast('This tab is not wired yet.');
      }

      setForm({ title:'', author:'', description:'', categories:'', link:'' });
      setCover(null); setFile(null);
    }catch(err){
      toast.error(err.message);
    }finally{
      setLoading(false);
    }
  }

  if(!user){
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <form onSubmit={signIn} className="card p-6 space-y-4">
          <div>
            <label className="label">Email</label>
            <input name="email" type="email" className="input mt-1" required />
          </div>
          <div>
            <label className="label">Password</label>
            <input name="password" type="password" className="input mt-1" required />
          </div>
          <button className="btn-primary w-full">Sign in</button>
        </form>
      </div>
    );
  }

  if(!isAdmin){
    return (
      <div className="max-w-md mx-auto card p-6">
        <p className="text-sm">Signed in as <b>{user?.email}</b>, but not in ADMIN list.</p>
        <button className="btn-outline mt-4" onClick={signOut}>Sign out</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{user?.email}</span>
          <button className="btn-outline" onClick={signOut}>Sign out</button>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex gap-2 overflow-x-auto">
          {['books','jobs','courses'].map(t => (
            <button
              key={t}
              onClick={()=>setTab(t)}
              className={`btn ${tab===t ? 'bg-zinc-100 dark:bg-zinc-800' : 'btn-outline'}`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card p-6 space-y-4"
      >
        <div>
          <label className="label">Title</label>
          <input
            className="input mt-1"
            value={form.title}
            onChange={e=>setForm(f=>({...f, title:e.target.value}))}
            required
          />
        </div>

        {tab==='books' && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Author</label>
              <input className="input mt-1" value={form.author} onChange={e=>setForm(f=>({...f, author:e.target.value}))} />
            </div>
            <div>
              <label className="label">Categories (comma separated)</label>
              <input className="input mt-1" value={form.categories} onChange={e=>setForm(f=>({...f, categories:e.target.value}))} />
            </div>
          </div>
        )}

        {(tab==='jobs' || tab==='courses') && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">{tab==='jobs' ? 'Company' : 'Categories'}</label>
              <input
                className="input mt-1"
                value={tab==='jobs' ? form.author : form.categories}
                onChange={e=>setForm(f=> (tab==='jobs' ? {...f, author:e.target.value} : {...f, categories:e.target.value}))}
              />
            </div>
            <div>
              <label className="label">Link (URL)</label>
              <input className="input mt-1" value={form.link} onChange={e=>setForm(f=>({...f, link:e.target.value}))} />
            </div>
          </div>
        )}

        <div>
          <label className="label">Description</label>
          <textarea className="textarea mt-1" value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Cover image</label>
            <input type="file" accept="image/*" className="file-input" onChange={e=>setCover(e.target.files?.[0]||null)} />
          </div>
          {tab==='books' && (
            <div>
              <label className="label">PDF file</label>
              <input type="file" accept="application/pdf" className="file-input" onChange={e=>setFile(e.target.files?.[0]||null)} />
            </div>
          )}
        </div>

        <div className="pt-2">
          <button className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Upload'}</button>
        </div>
      </motion.form>
    </div>
  );
}

import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Books from './pages/Books';
import ListPage from './pages/ListPage';
import Search from './pages/Search';
import Admin from './pages/Admin';
import { AuthProvider } from './contexts/Auth';
import { Toaster } from 'react-hot-toast';
import useAnalytics from './hooks/useAnalytics';

export default function App() {
  // Activate Google Analytics tracking
  useAnalytics();

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
        <Nav />
        <main className="flex-1 container-px mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/jobs" element={<ListPage type="job" title="Browse Jobs" />} />
            <Route path="/courses" element={<ListPage type="course" title="Free Courses" />} />
            <Route path="/opps" element={<ListPage type="opp" title="Opportunities" />} />
            <Route path="/blogs" element={<ListPage type="blog" title="Blogs" />} />
            <Route path="/search" element={<Search />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

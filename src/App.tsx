import { useEffect, useMemo, useState } from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Papa from 'papaparse';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PaperList from './components/PaperList';
import Pagination from './components/Pagination'; 

import About from './pages/About';
import Documentation from './pages/Documentation';
import Resources from './pages/Resources';
import CitationGuide from "./pages/CitationGuide";

export type Paper = {
  Title: string;
  Authors: string;
  JournalVenue: string;
  DOI: string;
  Year: number;
  CitationCount: number;
  Abstract: string;
  What_was_studied: string;
  What_was_found: string;
  Why_it_matters_for_policy: string;
  primary_category: string;
  Keywords: string;
};

function App() {
  const [papers, setPapers] = useState<Paper[]>([]);

  // controls
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [yearFilter, setYearFilter] = useState(0);
  const [sortBy, setSortBy] = useState<'relevance' | 'year' | 'citations'>('relevance');

  // pagination
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsSidebarOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Load CSV
  useEffect(() => {
    Papa.parse(import.meta.env.BASE_URL + 'data/Refined_Policy_Summary.csv', {
      download: true,
      header: true,
      complete: (results: any) => {
        const raw = results.data as any[];
        const parsed: Paper[] = raw
          .filter((p) => p?.Title)
          .map((p) => ({
            ...p,
            JournalVenue: p['Journal/Venue'] || 'N/A',
            CitationCount: Number(p.CitationCount) || 0,
            Year: Number(p.Year) || 0,
            Why_it_matters_for_policy: p.Why_it_matters_for_policy || '',
            primary_category: (p.primary_category ?? '').toString(),
            Keywords: (p.Keywords ?? '').toString(),
            Title: (p.Title ?? '').toString(),
            Authors: (p.Authors ?? '').toString(),
            Abstract: (p.Abstract ?? '').toString(),
          }));
        setPapers(parsed);
        setPage(1); // reset page after load
      },
      error: (error: any) => console.error('CSV load error:', error),
    });
  }, []);

  // unique categories for filter
  const uniqueCategories = useMemo(() => {
    return Array.from(
      new Set(
        papers.flatMap((p) =>
          (p.primary_category || '')
            .split(/;|,|\uFF1B/)
            .map((s: string) => s.trim())
        )
      )
    )
      .filter(Boolean)
      .sort();
  }, [papers]);

  // FILTER
  const filtered = useMemo(() => {
    const lowerQ = query.trim().toLowerCase();
    return papers.filter((p) => {
      const matchesQ =
        !lowerQ ||
        [p.Title, p.Authors, p.Why_it_matters_for_policy, p.primary_category, p.Keywords, p.Abstract]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(lowerQ);

      const cats = (p.primary_category || '')
        .split(/;|,|\uFF1B/)
        .map((s: string) => s.replace(/\s+/g, ' ').trim())
        .filter(Boolean);
      const matchesCat = !categoryFilter || cats.includes(categoryFilter);

      const matchesYear = !yearFilter || p.Year >= yearFilter;

      return matchesQ && matchesCat && matchesYear;
    });
  }, [papers, query, categoryFilter, yearFilter]);

  // SORT
  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === 'year') {
      arr.sort((a, b) => b.Year - a.Year);
    } else if (sortBy === 'citations') {
      arr.sort((a, b) => b.CitationCount - a.CitationCount);
    } // 'relevance' keeps current order
    return arr;
  }, [filtered, sortBy]);

  // reset to page 1 whenever criteria change
  useEffect(() => {
    setPage(1);
  }, [query, categoryFilter, yearFilter, sortBy, pageSize]);

  // PAGINATE
  const total = sorted.length;
  const start = (page - 1) * pageSize;
  const pageItems = sorted.slice(start, start + pageSize);

  // Sidebar with desktop and mobile variants
  const Sidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
    const links = [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/documentation', label: 'Documentation' },
      { to: '/resources', label: 'Resources' },
      { to: '/citation', label: 'Citation Guide' },
    ];

    const LinkList = ({ className = '' }: { className?: string }) => (
      <div className={`space-y-2 ${className}`}>
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `block w-full text-left px-4 py-2 rounded-md border border-brandBlue ${
                isActive ? 'bg-brandBlue text-white' : 'bg-white text-black hover:bg-gray-50'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    );

    return (
      <>
        {/* Desktop sidebar */}
        <nav className="hidden md:block md:w-56 md:shrink-0">
          <div className="md:sticky md:top-4">
            <LinkList />
          </div>
        </nav>

        {/* Mobile drawer + overlay */}
        <div
          className={`md:hidden fixed inset-0 z-40 ${isSidebarOpen ? '' : 'pointer-events-none'}`}
          aria-hidden={!isSidebarOpen}
        >
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsSidebarOpen(false)}
          />
          <nav
            id="mobile-sidebar"
            className={`absolute left-0 top-0 h-full w-72 bg-white text-black shadow-xl transform transition-transform ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            aria-label="Mobile navigation"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <span className="font-semibold">Navigation</span>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-md border px-2 py-1 text-sm"
                aria-label="Close navigation"
              >
                Close
              </button>
            </div>
            <div className="p-4">
              <LinkList />
            </div>
          </nav>
        </div>
      </>
    );
  };

  const Home = () => (
    <div className="space-y-6">
      <SearchBar query={query} setQuery={setQuery} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full border border-brandBlue rounded-md p-2 text-sm bg-white text-black"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Year */}
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(Number(e.target.value))}
          className="w-full border border-brandBlue rounded-md p-2 text-sm bg-white text-black"
        >
          <option value={0}>All Years</option>
          <option value={2000}>Since 2000</option>
          <option value={2010}>Since 2010</option>
          <option value={2020}>Since 2020</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'relevance' | 'year' | 'citations')}
          className="w-full border border-brandBlue rounded-md p-2 text-sm bg-white text-black"
        >
          <option value="relevance">Sort by Relevance</option>
          <option value="year">Sort by Year (Newest)</option>
          <option value="citations">Sort by Citations (High to Low)</option>
        </select>
      </div>

      
      {/* CURRENT PAGE ITEMS */}
      <PaperList papers={pageItems} setCategoryFilter={setCategoryFilter} />

      {/* BOTTOM PAGINATION + per-page */}
      <div className="flex items-center justify-between">
        <Pagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} />
        <div className="text-sm">
          <label className="mr-2">Per page</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
            className="rounded-md border px-2 py-1"
          >
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-white text-black">
        <Header />

        {/* Mobile menu button */}
        <div className="md:hidden px-4 pt-3">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-black px-3 py-2 text-sm bg-white text-black"
            aria-controls="mobile-sidebar"
            aria-expanded={isSidebarOpen}
            aria-label="Open navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M3 6h18M3 12h18M3 18h18" stroke="black" />
            </svg>
            Menu
          </button>
        </div>

        <main className="py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:grid md:grid-cols-[14rem_1fr] md:gap-8">
              <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
              <div className="mt-6 md:mt-0">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/documentation" element={<Documentation />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/citation" element={<CitationGuide />} />
                </Routes>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;

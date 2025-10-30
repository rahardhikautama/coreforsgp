import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Papa from 'papaparse';
import Header from './components/Header';

import About from './pages/About';
import Documentation from './pages/Documentation';
import Resources from './pages/Resources';
import CitationGuide from './pages/CitationGuide';
import Contribute from './pages/Contribute';
import Home from './pages/Home';

import { useAnalytics } from "./useAnalytics";
import { initAnalytics } from "./initAnalytics";


function AnalyticsTracker() {
  useAnalytics('G-G7DSW8Y406');
  return null;
}

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
  // Initialize Google Analytics once on mount
  useEffect(() => {
    initAnalytics("G-G7DSW8Y406");
  }, []);

  const [papers, setPapers] = useState<Paper[]>([]);

  // filters
  const [categoryFilter, setCategoryFilter] = useState('');
  const [yearFilter, setYearFilter] = useState(0);
  const [sortBy, setSortBy] = useState<'relevance' | 'year' | 'citations'>('relevance');

  // pagination
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSidebarOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // load CSV
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
        setPage(1);
      },
      error: (error: any) => console.error('CSV load error:', error),
    });
  }, []);

  // unique categories
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

  const Sidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
    const links = [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/documentation', label: 'Documentation' },
      { to: '/resources', label: 'Resources' },
      { to: '/citation', label: 'Citation Guide' },
      { to: '/contribute', label: 'Contribute' },
      { to: 'https://sites.krieger.jhu.edu/cgp/', label: 'Center on Global Poverty', external: true },
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
        {/* Desktop */}
        <nav className="hidden md:block md:w-56 md:shrink-0">
          <div className="md:sticky md:top-4">
            <LinkList />
          </div>
        </nav>

        {/* Mobile */}
        <div
          className={`md:hidden fixed inset-0 z-40 ${isSidebarOpen ? '' : 'pointer-events-none'}`}
          aria-hidden={!isSidebarOpen}
        >
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />
          <nav
            id="mobile-sidebar"
            className={`absolute left-0 top-0 h-full w-72 bg-white text-black shadow-xl transform transition-transform ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <span className="font-semibold">Navigation</span>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-md border px-2 py-1 text-sm"
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

  return (
    <Router>
      <AnalyticsTracker /> {/* Tracks route changes via useAnalytics */}
      <div className="min-h-screen bg-white text-black">
        <Header />

        {/* Mobile menu button */}
        <div className="md:hidden px-4 pt-3">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-black px-3 py-2 text-sm bg-white text-black"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="black">
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
                  <Route
                    path="/"
                    element={
                      <Home
                        papers={papers}
                        categoryFilter={categoryFilter}
                        setCategoryFilter={setCategoryFilter}
                        yearFilter={yearFilter}
                        setYearFilter={setYearFilter}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        uniqueCategories={uniqueCategories}
                        page={page}
                        setPage={setPage}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                      />
                    }
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/documentation" element={<Documentation />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/citation" element={<CitationGuide />} />
                  <Route path="/contribute" element={<Contribute />} />
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

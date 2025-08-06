import { useEffect, useState } from 'react';
import Header from './components/Header';
import Papa from 'papaparse';
import PaperList from './components/PaperList';
import SearchBar from './components/SearchBar';

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
  combined_tags: string;
  primary_and_combined: string;
};

function App() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>([]);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [yearFilter, setYearFilter] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    Papa.parse(import.meta.env.BASE_URL + 'data/Refined_Policy_Summary.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const raw = results.data as any[];
        const parsed: Paper[] = raw
          .filter(p => p.Title)
          .map(p => ({
            ...p,
            JournalVenue: p['Journal/Venue'] || 'N/A',
            CitationCount: Number(p.CitationCount) || 0,
            Year: Number(p.Year) || 0,
          }));

        setPapers(parsed);
        setFilteredPapers(parsed);
      },
      error: (error) => console.error('CSV load error:', error)
    });
  }, []);

  useEffect(() => {
    let result = [...papers];

    if (query.trim()) {
      const lower = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.Title.toLowerCase().includes(lower) ||
          p.Authors.toLowerCase().includes(lower) ||
          p.Why_it_matters_for_policy.toLowerCase().includes(lower) ||
          p.primary_and_combined.toLowerCase().includes(lower)
      );
    }

    if (categoryFilter) {
      result = result.filter((p) => p.primary_category === categoryFilter);
    }

    if (yearFilter) {
      result = result.filter((p) => p.Year >= yearFilter);
    }

    if (sortBy === 'year') {
      result.sort((a, b) => b.Year - a.Year);
    } else if (sortBy === 'citations') {
      result.sort((a, b) => b.CitationCount - a.CitationCount);
    }

    setFilteredPapers(result);
  }, [query, categoryFilter, yearFilter, sortBy, papers]);

  const uniqueCategories = Array.from(
    new Set(papers.map((p) => p.primary_category))
  ).filter(Boolean).sort();

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Search bar full width like cards */}
          <div className="w-full">
            <SearchBar query={query} setQuery={setQuery} />
          </div>

          {/* Filter row full width */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-brandBlue rounded-md p-2 text-sm bg-white text-black"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="year">Sort by Year (Newest)</option>
              <option value="citations">Sort by Citations (High to Low)</option>
            </select>
          </div>

          {/* Papers */}
          <PaperList papers={filteredPapers} />
        </div>
      </main>
    </div>
  );
}

export default App;

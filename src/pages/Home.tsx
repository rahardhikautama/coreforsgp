// src/pages/Home.tsx
import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import PaperList from "../components/PaperList";
import Pagination from "../components/Pagination";

function Home({
  papers,
  categoryFilter,
  setCategoryFilter,
  yearFilter,
  setYearFilter,
  sortBy,
  setSortBy,
  uniqueCategories,
  page,
  setPage,
  pageSize,
  setPageSize,
}: any) {
  const [query, setQuery] = useState("");

  // FILTER
  const filtered = useMemo(() => {
    const lowerQ = query.trim().toLowerCase();
    return papers.filter((p: any) => {
      const matchesQ =
        !lowerQ ||
        [p.Title, p.Authors, p.Why_it_matters_for_policy, p.primary_category, p.Keywords, p.Abstract]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(lowerQ);

      const cats = (p.primary_category || "")
        .split(/;|,|\uFF1B/)
        .map((s: string) => s.replace(/\s+/g, " ").trim())
        .filter(Boolean);
      const matchesCat = !categoryFilter || cats.includes(categoryFilter);

      const matchesYear = !yearFilter || p.Year >= yearFilter;

      return matchesQ && matchesCat && matchesYear;
    });
  }, [papers, query, categoryFilter, yearFilter]);

  // SORT
  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === "year") {
      arr.sort((a, b) => b.Year - a.Year);
    } else if (sortBy === "citations") {
      arr.sort((a, b) => b.CitationCount - a.CitationCount);
    }
    return arr;
  }, [filtered, sortBy]);

  // reset to page 1 whenever criteria change
  useEffect(() => {
    setPage(1);
  }, [query, categoryFilter, yearFilter, sortBy, pageSize, setPage]);

  // PAGINATE
  const total = sorted.length;
  const start = (page - 1) * pageSize;
  const pageItems = sorted.slice(start, start + pageSize);


  return (

    <div className="space-y-6">
    <div className="max-w-4xl mx-auto px-4 mt-2 mb-6">
    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
      <strong>CORE™ for Solving Global Poverty</strong> is a curated collection of concise,
      policy-oriented summaries drawn from peer-reviewed social science research on poverty and
      development. It helps practitioners, researchers, and policymakers quickly find and apply
      relevant insights.
    </p>
    <p className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed">
      Use the search bar to explore by keyword, filter results by topic or category, and sort by
      publication year, relevance, or citation count. 
      </p>
    <p className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed">
      Each summary captures key evidence-based findings and policy insights in under a minute.
    </p>
  </div>

    
      <SearchBar query={query} setQuery={setQuery} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full border border-brandBlue rounded-md p-2 text-sm bg-white text-black"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat: string) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
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
          onChange={(e) => setSortBy(e.target.value as "relevance" | "year" | "citations")}
          className="w-full border border-brandBlue rounded-md p-2 text-sm bg-white text-black"
        >
          <option value="relevance">Sort by Relevance</option>
          <option value="year">Sort by Year (Newest)</option>
          <option value="citations">Sort by Citations (High to Low)</option>
        </select>
      </div>

      {/* Papers */}
      <PaperList papers={pageItems} setCategoryFilter={setCategoryFilter} />

      {/* Pagination */}
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
}

export default Home;

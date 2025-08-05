type Props = {
  query: string;
  setQuery: (query: string) => void;
};

const SearchBar = ({ query, setQuery }: Props) => (
  <div className="mb-4">
    <input
      type="text"
      placeholder="Search by title, author, category, or policy..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
);

export default SearchBar;

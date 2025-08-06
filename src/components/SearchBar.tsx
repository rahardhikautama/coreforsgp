interface Props {
  query: string;
  setQuery: (value: string) => void;
}

const SearchBar = ({ query, setQuery }: Props) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title, author, category, or policy..."
        className="w-full border border-brandBlue rounded-md p-3 text-sm shadow-sm focus:ring-brandBlue focus:border-brandBlue"
      />
    </div>
  );
};

export default SearchBar;

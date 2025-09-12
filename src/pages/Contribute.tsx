export default function Contribute() {
  const formSrc = "https://docs.google.com/forms/d/e/1FAIpQLSe8WkxOV8v6uJTjVkUkUzMbz5-PEy2PGDNUKsKLhUOnu1dmug/viewform?usp=sharing&ouid=104568144348957108797";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-3">Contribute</h1>
      <p className="text-gray-700 mb-6">
        Share a journal, article, or full entry to help expand the CORE for Solving Global Poverty collection. Other suggestions are also welcomed.
      </p>

      <div className="w-full h-[900px] border rounded-lg overflow-hidden bg-white">
        <iframe
          title="CORE Contribution Form"
          src={formSrc}
          width="100%"
          height="100%"
          frameBorder="0"
          loading="lazy"
          sandbox="allow-forms allow-popups allow-scripts allow-same-origin"
        >
          Loading…
        </iframe>
      </div>

      <p className="text-sm text-gray-600 mt-3">
        Having trouble viewing the form?{" "}
        <a
          href={formSrc.replace("?embedded=true", "")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brandBlue underline"
        >
          Open it in a new tab
        </a>.
      </p>
    </div>
  );
}

export default function Resources() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Resources</h2>
      <ul className="list-disc pl-5 space-y-3">
        <li>
          <a
            className="text-brandBlue underline"
            href="https://www.problemsolvingsociology.com/"
            target="_blank"
            rel="noreferrer"
          >
            Problem Solving Sociology
          </a>
          <p className="text-sm text-gray-700">
            Explore how sociology research can be pivoted into problem solving
            to increase impact and broaden the reach of scholarship.
          </p>
        </li>
        <li>
          <a
            className="text-brandBlue underline"
            href="https://sites.krieger.jhu.edu/cgp/"
            target="_blank"
            rel="noreferrer"
          >
            Johns Hopkins Center for Global Poverty
          </a>
          <p className="text-sm text-gray-700">
            Supports research using qualitative methods to address complex
            challenges in international development.
          </p>
        </li>
      </ul>
    </div>
  );
}

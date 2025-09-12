export default function Resources() {
  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-2xl font-bold mb-4">Resources</h2>

      <ul className="list-disc pl-5 space-y-2">
        <li>
          <a
            className="text-brandBlue underline font-bold"
            href="https://www.problemsolvingsociology.com/"
            target="_blank"
            rel="noreferrer"
          >
            Problem Solving Sociology
          </a>
          <p>
            Explore how sociology research can be pivoted into problem solving
            to increase impact and broaden the reach of scholarship.
          </p>
        </li>
        <li>
          <a
            className="text-brandBlue underline font-bold"
            href="https://sites.krieger.jhu.edu/cgp/"
            target="_blank"
            rel="noreferrer"
          >
            Johns Hopkins Center for Global Poverty
          </a>
          <p>
            Supports research using qualitative methods to address complex
            challenges in international development.
          </p>
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-6">
        Incorporate this collection in your classroom
      </h3>
      <p>
        CORE™ for Solving Global Poverty can be used as a teaching tool to help
        students engage directly with policy-relevant research. Below are two
        suggested approaches:
      </p>

      <ol className="list-decimal pl-5 space-y-2">
        <li>
          <strong>Integrate into course materials:</strong> assign students to
          browse the collection by category or keyword. This allows them to
          quickly access concise summaries of peer-reviewed work and connect
          academic research to current debates in policy and practice.
        </li>
        <li>
          <strong>Policy summary assignments:</strong> encourage students to
          select an article not yet in the collection and write their own policy
          summary, including the overview, key finding, and policy implication.
          With instructor review, these exercises can be contributed back to
          CORE as student-generated entries.
        </li>
      </ol>
    </div>
  );
}

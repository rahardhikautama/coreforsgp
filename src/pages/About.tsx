export default function About() {
  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-2xl font-bold mb-4">About</h2>

      <p>
        CORE™ (Collection of Oriented Research and Evidence) is an AI-powered
        policy summarization initiative that translates scientific articles into
        accessible insights for policymakers, industry leaders, and scientists.
        Founded by {' '}
        <a
          href="https://www.rahardhika.com/"
          target="_blank"
          rel="noreferrer"
          className="text-brandBlue underline font-bold"
        >
          Rahardhika Utama, PhD
        </a>, a sociologist
        committed to elevating academic research into high impact policy and
        practical resources, CORE™ reflects a passion for using technology to
        democratize knowledge.
      </p>

      <p>
        CORE™ for Solving Global Poverty was inspired by conversations at the
        10th Annual Sociology of Development Conference hosted by{' '}
        <a
          href="https://socdev2024.weebly.com/"
          target="_blank"
          rel="noreferrer"
          className="text-brandBlue underline"
        >
          Johns Hopkins University
        </a>
        , during a plenary panel on “How Development Practitioners Use Research.”
        That dialogue highlighted a critical gap: while academic work on poverty
        and development is abundant, much of it remains siloed across disciplines
        and inaccessible to practitioners who lack the time and resources to
        translate research into actionable insights.
      </p>

      <p>
        To address this problem, CORE™ offers a policy-focused bibliography of
        published research on poverty and development. Key features include:
      </p>

      <ol className="list-decimal pl-5 space-y-2">
        <li>
          <strong>Concise summaries:</strong> each entry presents the study
          overview, findings, and policy relevance in under one minute of
          reading.
        </li>
        <li>
          <strong>Organized taxonomy:</strong> entries are categorized by policy
          sub-topics for efficient navigation.
        </li>
        <li>
          <strong>Interactive tools:</strong> filters and search functions allow
          fast and targeted browsing.
        </li>
      </ol>

      <h3 className="text-xl font-semibold mt-6">Who is this tool for?</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Policy and development practitioners who need a reliable, quick-access
          tool to synthesize academic knowledge and inform their work.
        </li>
        <li>
          Academics who want to discover relevant scholarship, showcase their
          research to practitioners, and consider the problem-solving potential
          of their own work.
        </li>
      </ul>
    </div>
  );
}

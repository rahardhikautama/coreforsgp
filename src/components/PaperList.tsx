import { motion } from 'framer-motion';
import type { Paper } from '../App';

const PaperList = ({ papers }: { papers: Paper[] }) => {
  if (!Array.isArray(papers)) {
    return <p className="text-center text-gray-500 mt-10">No papers to display.</p>;
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {papers.map((paper, index) => (
        <motion.div
          key={index}
          className="bg-white border border-brandBlue rounded-md shadow-sm p-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <h2 className="text-lg font-bold mb-1">{paper.Title}</h2>
          <p className="italic text-sm text-gray-600 mb-2">
            {paper.Authors} ({paper.Year})
          </p>

            <p className="mb-4">
            <span className="font-semibold">Overview:</span>{' '}
            <span>{paper.What_was_studied}</span>
            </p>

            <p className="mb-4">
            <span className="font-semibold">Finding:</span>{' '}
            <span>{paper.What_was_found}</span>
            </p>

            <p style={{ color: '#002D72' }}>
                <span className="font-semibold">Policy Implication:</span>{' '}
                {paper.Why_it_matters_for_policy}
            </p>




          <div className="mt-3 text-sm text-gray-500">
            <a
              href={`https://doi.org/${paper.DOI}`}
              className="text-brandBlue underline mr-2"
              target="_blank"
              rel="noreferrer"
            >
              View Paper
            </a>
            <span>Journal: <em>{paper.JournalVenue}</em></span>
            <span className="px-2">·</span>
            <span>Category: {paper.primary_category}</span>
            <span className="px-2">·</span>
            <span>Citations: {paper.CitationCount}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PaperList;

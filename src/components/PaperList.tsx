type Paper = {
  Title: string;
  Authors: string;
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
  JournalVenue: string;
};

import { motion } from 'framer-motion';

const PaperList = ({ papers }: { papers: Paper[] }) => {
  return (
    <div className="space-y-6">
      {papers.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No matching papers found.
        </p>
      ) : (
        papers.map((paper, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {paper.Title}
            </h2>
            <p className="italic text-sm text-gray-600 dark:text-gray-400 mt-1">
              {paper.Authors} ({paper.Year})
            </p>

            <div className="mt-3 space-y-1 text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
              <p><strong>Overview:</strong> {paper.What_was_studied}</p>
              <p><strong>Finding:</strong> {paper.What_was_found}</p>
              <p><strong>Policy Implication:</strong> {paper.Why_it_matters_for_policy}</p>
            </div>

            <div className="mt-4 text-xs text-gray-600 dark:text-gray-400 flex flex-wrap items-center">
              <a
                href={`https://doi.org/${paper.DOI}`}
                className="text-blue-600 dark:text-blue-400 underline"
                target="_blank"
                rel="noreferrer"
              >
                View Paper
              </a>
              <span className="text-gray-400">&nbsp;|&nbsp;</span>
              <span>
                Journal: <span className="italic">{paper.JournalVenue || 'N/A'}</span>
              </span>
              <span className="text-gray-400">&nbsp;|&nbsp;</span>
              <span>Category: {paper.primary_category || 'Uncategorized'}</span>
              <span className="text-gray-400">&nbsp;|&nbsp;</span>
              <span>Citations: {paper.CitationCount || 0}</span>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default PaperList;

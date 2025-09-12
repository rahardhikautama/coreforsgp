import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Paper } from '../App';

const PaperList = ({ papers, setCategoryFilter }: { papers: Paper[]; setCategoryFilter: (text: string) => void }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [openShareIndex, setOpenShareIndex] = useState<number | null>(null);

  if (!Array.isArray(papers)) {
    return <p className="text-center text-gray-500 mt-10">No papers to display.</p>;
  }

  const buildShareText = (paper: Paper) => {
    const url = paper.DOI ? `https://doi.org/${paper.DOI}` : '';
    return `${paper.Title} — ${paper.Authors} (${paper.Year})\n${url}`;
  };

  const handleCopy = async (paper: Paper, index: number) => {
    const text = `
${paper.Title}
Authors: ${paper.Authors}
Year: ${paper.Year}
Overview: ${paper.What_was_studied}
Finding: ${paper.What_was_found}
Policy Implication: ${paper.Why_it_matters_for_policy}
DOI: ${paper.DOI ? `https://doi.org/${paper.DOI}` : ''}
Journal: ${paper.JournalVenue}
Citations: ${paper.CitationCount}
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareLinks = (paper: Paper) => {
    const text = encodeURIComponent(buildShareText(paper));
    const url = encodeURIComponent(paper.DOI ? `https://doi.org/${paper.DOI}` : '');
    return {
      email: `mailto:?subject=${encodeURIComponent("Interesting paper from CORE")}&body=${text}`,
      whatsapp: `https://wa.me/?text=${text}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {papers.map((paper, index) => {
        const links = shareLinks(paper);

        const categories = paper.primary_category.split('; ')

        return (
          <motion.div
            key={index}
            className="bg-white border border-brandBlue rounded-md shadow-sm p-6 relative"
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
                className="text-brandBlue underline font-bold mr-2"
                target="_blank"
                rel="noreferrer"
              >
                View Paper
              </a>
              <span>Journal: <em>{paper.JournalVenue}</em></span>
              <span className="px-2">·</span>
              <span>Year: {paper.Year}</span>
              <span className="px-2">·</span>
              {
                categories.map((category => {
                  return <span style={{cursor: 'pointer'}} onClick={() => setCategoryFilter(category)}>{category}; </span>
                }))
              }
              
              <span className="px-2">·</span>
              <span>Citations: {paper.CitationCount}</span>
            </div>

            {/* Copy & Share buttons */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleCopy(paper, index)}
                className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm hover:bg-black"
              >
                {copiedIndex === index ? "Copied!" : "Copy"}
              </button>
              <div className="relative">
                <button
                  onClick={() => setOpenShareIndex(openShareIndex === index ? null : index)}
                  className="px-3 py-1.5 rounded-md bg-gray-100 text-sm hover:bg-gray-200"
                >
                  Share
                </button>
                {openShareIndex === index && (
                  <div className="absolute z-10 mt-2 w-48 bg-white border rounded-md shadow-lg p-2 space-y-1">
                    <a href={links.email} className="block text-sm hover:bg-gray-50 px-2 py-1">Email</a>
                    <a href={links.whatsapp} target="_blank" rel="noreferrer" className="block text-sm hover:bg-gray-50 px-2 py-1">WhatsApp</a>
                    <a href={links.twitter} target="_blank" rel="noreferrer" className="block text-sm hover:bg-gray-50 px-2 py-1">X (Twitter)</a>
                    <a href={links.linkedin} target="_blank" rel="noreferrer" className="block text-sm hover:bg-gray-50 px-2 py-1">LinkedIn</a>
                    <a href={links.facebook} target="_blank" rel="noreferrer" className="block text-sm hover:bg-gray-50 px-2 py-1">Facebook</a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PaperList;

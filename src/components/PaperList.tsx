import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Paper } from '../App';
import { plainCitation as coreCitation } from '../pages/CitationGuide';

// Build homepage URL (HashRouter) with predefined filters/sort
const buildHomeWithParams = (params: Record<string, string | number | undefined>) => {
  const base = `${window.location.origin}${window.location.pathname}#/`;
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && String(v).trim() !== '') sp.set(k, String(v));
  });
  return `${base}${sp.toString() ? `?${sp.toString()}` : ''}`;
};

const pickCategory = (paper: Paper) => {
  const cats = (paper.primary_category || '')
    .split(/;|,|\uFF1B/)
    .map(s => s.trim())
    .filter(Boolean);
  return cats[0] || '';
};

const PaperList = ({ papers, setCategoryFilter }: { papers: Paper[]; setCategoryFilter: (text: string) => void }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [openShareIndex, setOpenShareIndex] = useState<number | null>(null);

  if (!Array.isArray(papers)) {
    return <p className="text-center text-gray-500 mt-10">No papers to display.</p>;
  }

  const buildSummary = (p: Paper) => {
    const doiUrl = p.DOI ? `https://doi.org/${p.DOI}` : '';
    return `
${p.Title}
Authors: ${p.Authors}
Year: ${p.Year}

Overview: ${p.What_was_studied}
Finding: ${p.What_was_found}
Policy Implication: ${p.Why_it_matters_for_policy}

${doiUrl ? `DOI: ${doiUrl}\n` : ''}Journal: ${p.JournalVenue}
Citations (count): ${p.CitationCount}

Copied from:
${coreCitation}
`.trim();
  };

  const handleCopy = async (paper: Paper, index: number) => {
    const text = buildSummary(paper);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Single set of share targets; email/WA/X/SMS/device use summary; FB/LI use filtered homepage URL
  const shareTargets = (paper: Paper) => {
    const summary = buildSummary(paper);
    const encSummary = encodeURIComponent(summary);

    // Build homepage with desired state prefilled (adjust as needed)
    const filteredHome = buildHomeWithParams({
      q: '',                      // can be paper.Title or paper.Authors if preferred
      cat: pickCategory(paper),   // first category
      sort: 'cites_desc',         // must match App’s sort keys
    });
    const encHome = encodeURIComponent(filteredHome);

    return {
      // text-capable
      email: `mailto:?subject=${encodeURIComponent('Interesting paper from CORE')}&body=${encSummary}`,
      whatsapp: `https://wa.me/?text=${encSummary}`,
      twitter: `https://twitter.com/intent/tweet?text=${encSummary}`,
      sms: `sms:?&body=${encodeURIComponent(summary)}`,
      device: () => navigator.share?.({ title: paper.Title, text: summary }).catch(() => {}),
    };
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {papers.map((paper, index) => {
        const links = shareTargets(paper);
        const categories = (paper.primary_category || '').split('; ').filter(Boolean);

        return (
          <motion.div
            key={index}
            id={`paper-${index}`}
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
              {categories.map((category, i) => (
                <span
                  key={`${category}-${i}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}{i < categories.length - 1 ? ';' : ''}{' '}
                </span>
              ))}
              <span className="px-2">·</span>
              <span>Citations: {paper.CitationCount}</span>
            </div>

            {/* Actions: single Share button with popover */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleCopy(paper, index)}
                className="px-3 py-1.5 rounded-md bg-[#002D72] text-white text-sm hover:bg-[#002D72]"
              >
                {copiedIndex === index ? 'Copied!' : 'Copy'}
              </button>

              <div className="relative">
                <button
                  onClick={() => setOpenShareIndex(openShareIndex === index ? null : index)}
                  className="px-3 py-1.5 rounded-md bg-gray-100 text-sm hover:bg-gray-200"
                  aria-expanded={openShareIndex === index}
                >
                  Share
                </button>
                {openShareIndex === index && (
                  <div className="absolute z-10 mt-2 w-64 bg-white border rounded-md shadow-lg p-2 space-y-1">
                    {/* Text-based share */}
                    <button onClick={links.device} className="w-full text-left text-sm hover:bg-gray-50 px-2 py-1">
                      Device share
                    </button>
                    <a href={links.sms} className="block text-sm hover:bg-gray-50 px-2 py-1">
                      Text message
                    </a>
                    <a href={links.email} className="block text-sm hover:bg-gray-50 px-2 py-1">
                      Email
                    </a>
                    <a href={links.whatsapp} target="_blank" rel="noreferrer" className="block text-sm hover:bg-gray-50 px-2 py-1">
                      WhatsApp
                    </a>
                    <a href={links.twitter} target="_blank" rel="noreferrer" className="block text-sm hover:bg-gray-50 px-2 py-1">
                      X / Twitter 
                    </a>

                    <div className="border-t my-1" />


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

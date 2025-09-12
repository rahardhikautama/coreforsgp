// CitationGuide.tsx
import { useMemo, useState } from "react";

export default function CitationGuide() {
  // ---- Customize these fields as needed ----
  const authorDisplay = "Utama, Rahardhika."; 
  const year = "2025";
  const titleText =
    "CORE™ (Collection of Oriented Research and Evidence) for Solving Global Poverty.";
  const publisher = "Center for Global Poverty at Johns Hopkins University";
  const dateText = "September 1";
  const url = "https://sites.krieger.jhu.edu/cgp/coreforsgp";
  // ------------------------------------------

  const plainCitation = useMemo(
    () =>
      `${authorDisplay} ${year}. “CORE™ (Collection of Oriented Research and Evidence) for Solving Global Poverty.” ${publisher}, ${dateText}. ${url}`,
    [authorDisplay, year, publisher, dateText, url]
  );

  const bibtex = useMemo(() => {
    // Create a simple BibTeX key
    const key = "core_sgp_2025";
    return `@misc{${key},
  author    = {${authorDisplay.replace(/\.$/, "")}},
  title     = {${titleText}},
  howpublished = {${publisher}},
  note      = {${dateText}},
  year      = {${year}},
  url       = {${url}}
}`;
  }, [authorDisplay, titleText, publisher, dateText, year, url]);

  const ris = useMemo(
    () =>
      `TY  - GEN
TI  - ${titleText}
AU  - ${authorDisplay.replace(/\.$/, "")}
PY  - ${year}
PB  - ${publisher}
DA  - ${dateText}
UR  - ${url}
ER  - `,
    [authorDisplay, titleText, year, publisher, dateText, url]
  );

  const cslJson = useMemo(
    () =>
      JSON.stringify(
        [
          {
            type: "webpage",
            author: [{ literal: authorDisplay.replace(/\.$/, "") }],
            issued: { "date-parts": [[2025, 9, 1]] },
            title: titleText,
            publisher,
            URL: url
          }
        ],
        null,
        2
      ),
    [authorDisplay, titleText, publisher, url]
  );

  const [copied, setCopied] = useState<null | "citation" | "ig">(null);

  const copyToClipboard = async (text: string, which: "citation" | "ig") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // no-op
    }
  };

  const download = (filename: string, content: string, mime = "text/plain") => {
    const blob = new Blob([content], { type: `${mime};charset=utf-8` });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  };

  const encodedText = encodeURIComponent(plainCitation);
  const encodedUrl = encodeURIComponent(url);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
  const waUrl = `https://wa.me/?text=${encodedText}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(
    "Citation: CORE for Solving Global Poverty"
  )}&body=${encodedText}`;

  const webShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Citation: CORE for Solving Global Poverty",
          text: plainCitation,
          url
        });
      } catch {
        // user canceled or unsupported action
      }
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Citation Guide</h1>

      <p className="mb-2 text-gray-800">Recommended citation:</p>

      <div className="rounded-xl border border-gray-200 p-4 mb-4 bg-white shadow-sm">
        <p className="leading-relaxed">
          {/* Render ™ as superscript in the display text */}
          <span className="font-medium">{authorDisplay}</span> {year}. “CORE
          <sup>TM</sup> (Collection of Oriented Research and Evidence) for
          Solving Global Poverty.” {publisher}, {dateText}.{" "}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-brandBlue underline"
          >
            {url}
          </a>
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => copyToClipboard(plainCitation, "citation")}
          className="px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-black"
        >
          {copied === "citation" ? "Copied!" : "Copy citation"}
        </button>
        <button
          onClick={() => download("core_citation.bib", bibtex, "text/x-bibtex")}
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Download BibTeX
        </button>
        <button
          onClick={() => download("core_citation.ris", ris, "application/x-research-info-systems")}
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Download RIS
        </button>
        <button
          onClick={() =>
            download("core_citation.json", cslJson, "application/json")
          }
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Download CSL-JSON
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Share</h2>
      <p className="text-gray-700 mb-3">
        Share the citation via social or email.
      </p>

      <div className="flex flex-wrap gap-2">
        <a
          href={mailtoUrl}
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Email
        </a>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          WhatsApp
        </a>
        <a
          href={tweetUrl}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          X (Twitter)
        </a>
        <a
          href={liUrl}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          LinkedIn
        </a>
        <a
          href={fbUrl}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Facebook
        </a>
        
        <button
          onClick={webShare}
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          title="Uses your device's native share sheet if available"
        >
          Share via device
        </button>
      </div>

      <hr className="my-6" />

      <details className="mb-2">
        <summary className="cursor-pointer font-semibold">
          Plain text citation
        </summary>
        <pre className="mt-2 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
{plainCitation}
        </pre>
      </details>

      <details className="mb-2">
        <summary className="cursor-pointer font-semibold">BibTeX</summary>
        <pre className="mt-2 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
{bibtex}
        </pre>
      </details>

      <details className="mb-2">
        <summary className="cursor-pointer font-semibold">RIS</summary>
        <pre className="mt-2 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
{ris}
        </pre>
      </details>

      <details>
        <summary className="cursor-pointer font-semibold">CSL-JSON</summary>
        <pre className="mt-2 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
{cslJson}
        </pre>
      </details>
    </div>
  );
}

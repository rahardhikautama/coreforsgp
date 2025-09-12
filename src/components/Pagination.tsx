import React from "react";

type Props = {
  page: number;               // 1-based
  pageSize: number;
  total: number;
  onPageChange: (p: number) => void;
};

function range(a: number, b: number) {
  return Array.from({ length: b - a + 1 }, (_, i) => a + i);
}

export default function Pagination({ page, pageSize, total, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const go = (p: number) => onPageChange(Math.min(totalPages, Math.max(1, p)));

  // compact strip with neighbors + first/last + ellipses
  const numbers = (() => {
    const win = 1; // neighbors around current
    const first = 1, last = totalPages;
    const left = Math.max(first, page - win);
    const right = Math.min(last, page + win);
    const slots = new Set<number>([first, last, ...range(left, right)]);
    const arr = Array.from(slots).sort((a, b) => a - b);
    const out: (number | "…")[] = [];
    for (let i = 0; i < arr.length; i++) {
      out.push(arr[i]);
      if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) out.push("…");
    }
    return out;
  })();

  return (
    <nav className="flex items-center justify-between gap-2" aria-label="Pagination">
      <div className="text-sm text-gray-600">
        Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span>–
        <span className="font-medium">{Math.min(page * pageSize, total)}</span> of{" "}
        <span className="font-medium">{total}</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => go(page - 1)}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-md border text-sm disabled:opacity-50"
        >
          Prev
        </button>

        {numbers.map((n, i) =>
          n === "…" ? (
            <span key={`dots-${i}`} className="px-2 text-gray-500">…</span>
          ) : (
            <button
              key={n}
              onClick={() => go(n)}
              aria-current={n === page ? "page" : undefined}
              className={`px-3 py-1.5 rounded-md border text-sm ${
                n === page ? "bg-gray-900 text-white border-gray-900" : "hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          )
        )}

        <button
          onClick={() => go(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1.5 rounded-md border text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </nav>
  );
}

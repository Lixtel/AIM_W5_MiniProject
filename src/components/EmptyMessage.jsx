export default function EmptyMessage({ onClear }) {
  return (
    <div className="rounded-2xl border border-dashed border-lilac bg-white px-5 py-12 text-center">
      <p className="font-semibold text-slate-700">No tasks match your filters.</p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 rounded-lg border border-plum px-4 py-2 text-sm font-semibold text-plum hover:bg-lilac"
      >
        Clear filters
      </button>
    </div>
  )
}

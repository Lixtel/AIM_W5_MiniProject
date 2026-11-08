export default function LoadingMessage({ message = 'Loading tasks...' }) {
  return (
    <div role="status" className="space-y-3 rounded-2xl border border-lilac bg-white p-5 text-slate-600">
      <span className="sr-only">{message}</span>
      <div className="h-5 animate-pulse rounded bg-lilac" />
      <div className="h-5 w-4/5 animate-pulse rounded bg-lilac" />
      <div className="h-5 w-3/5 animate-pulse rounded bg-lilac" />
    </div>
  )
}

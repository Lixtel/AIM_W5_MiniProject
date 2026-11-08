import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="rounded-2xl border border-lilac bg-white p-8 text-center">
      <h1 className="text-2xl font-extrabold text-ink">Page not found</h1>
      <p className="mt-2 text-slate-600">That page doesn’t exist.</p>
      <Link to="/" className="mt-5 inline-block font-bold text-plum hover:underline">Back to tasks</Link>
    </div>
  )
}

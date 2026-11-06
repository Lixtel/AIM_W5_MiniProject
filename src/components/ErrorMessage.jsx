export default function ErrorMessage({ message }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
      <h2 className="font-bold">Something went wrong</h2>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  )
}

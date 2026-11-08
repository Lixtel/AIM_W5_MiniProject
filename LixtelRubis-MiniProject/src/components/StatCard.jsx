export default function StatCard({ label, value, description }) {
  return (
    <section className="rounded-2xl border border-lilac bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-4xl font-extrabold tracking-tight text-plum">{value}</p>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    </section>
  )
}

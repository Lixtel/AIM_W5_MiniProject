export default function AboutPage() {
  return (
    <div className="max-w-2xl rounded-2xl border border-lilac bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-plum">About this project</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">A small board for everyday tasks</h1>
      <p className="mt-4 leading-7 text-slate-600">
        TaskBoard is a React learning project. It uses JSONPlaceholder for task and user data, TanStack Query for fetching and caching, and React Router for page navigation.
      </p>
      <p className="mt-3 leading-7 text-slate-600">
        Checking a task marks it done in the current task list view. The original API data is not changed.
      </p>
    </div>
  )
}

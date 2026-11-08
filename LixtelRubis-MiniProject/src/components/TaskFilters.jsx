export default function TaskFilters({ search, status, userId, users, onChange }) {
  // Tailwind breakpoints stack filters on mobile and add columns on wider screens.
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <label className="sr-only" htmlFor="task-search">Search tasks</label>
      <input
        id="task-search"
        type="search"
        placeholder="Search tasks..."
        value={search}
        onChange={(event) => onChange('search', event.target.value)}
        className="min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-plum focus:ring-2 focus:ring-plum/20"
      />
      <label className="sr-only" htmlFor="task-status">Filter by status</label>
      <select
        id="task-status"
        value={status}
        onChange={(event) => onChange('status', event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-plum focus:ring-2 focus:ring-plum/20"
      >
        <option value="all">Status: All</option>
        <option value="open">Status: Open</option>
        <option value="done">Status: Done</option>
      </select>
      <label className="sr-only" htmlFor="task-user">Filter by user</label>
      <select
        id="task-user"
        value={userId}
        onChange={(event) => onChange('userId', event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-plum focus:ring-2 focus:ring-plum/20 sm:col-span-2 lg:col-span-1"
      >
        <option value="all">User: All</option>
        {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
      </select>
    </div>
  )
}

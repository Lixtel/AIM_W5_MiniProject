import { Link } from 'react-router-dom'

// Presentational row: task state stays in TasksPage and changes flow up through onToggle.
export default function TaskRow({ task, userName, isDone, onToggle }) {
  return (
    <li className="flex flex-col gap-3 rounded-xl border border-lilac bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} ${isDone ? 'open' : 'done'}`}
          className="mt-1 h-5 w-5 shrink-0 accent-plum"
        />
        <span className={`font-semibold capitalize ${isDone ? 'text-slate-400 line-through' : 'text-ink'}`}>
          {task.title}
        </span>
      </label>
      <span className="w-fit rounded-full bg-lilac px-3 py-1 text-sm font-medium text-plum sm:max-w-44 sm:truncate">
        {userName || `User ${task.userId}`}
      </span>
      <Link
        to={`/tasks/${task.id}`}
        className={`w-fit rounded-lg border px-3 py-1.5 text-sm font-bold ${
          isDone ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-300 bg-amber-50 text-amber-800'
        }`}
      >
        {isDone ? 'Done · Details' : 'Open'}
      </Link>
    </li>
  )
}

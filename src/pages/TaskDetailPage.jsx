import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getTodo, getUser } from '../api/todos.js'
import ErrorMessage from '../components/ErrorMessage.jsx'
import LoadingMessage from '../components/LoadingMessage.jsx'

export default function TaskDetailPage() {
  const { id } = useParams()
  const todoQuery = useQuery({ queryKey: ['todos', id], queryFn: () => getTodo(id) })
  const userId = todoQuery.data?.userId
  const userQuery = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUser(userId),
    enabled: Boolean(userId),
  })

  if (todoQuery.isPending) return <LoadingMessage message="Loading task..." />
  if (todoQuery.isError) return <ErrorMessage message={todoQuery.error.message} />
  if (!todoQuery.data?.id) return <ErrorMessage message="That task could not be found." />

  const task = todoQuery.data

  return (
    <article className="max-w-3xl">
      <Link to="/" className="font-bold text-plum hover:underline">← Back to tasks</Link>
      <div className="mt-6 rounded-2xl border border-lilac bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-plum">Task {task.id}</p>
        <h1 className="mt-3 text-3xl font-extrabold capitalize leading-tight text-ink">{task.title}</h1>
        <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-bold ${task.completed ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
          {task.completed ? 'Completed on source' : 'Open on source'}
        </span>
        <div className="mt-8 border-t border-lilac pt-6">
          <p className="text-sm font-semibold text-slate-500">Assigned to</p>
          {userQuery.isPending ? (
            <p className="mt-1 text-ink">Loading user...</p>
          ) : userQuery.isError ? (
            <p role="alert" className="mt-1 text-red-700">Could not load the assigned user.</p>
          ) : (
            <p className="mt-1 text-xl font-bold text-ink">{userQuery.data?.name ?? `User ${task.userId}`}</p>
          )}
          <p className="mt-5 text-sm font-semibold text-slate-500">Task number</p>
          <p className="mt-1 text-lg font-bold text-ink">{task.id}</p>
        </div>
      </div>
    </article>
  )
}

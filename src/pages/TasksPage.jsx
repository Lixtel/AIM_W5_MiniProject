import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTodos, getUsers } from '../api/todos.js'
import EmptyMessage from '../components/EmptyMessage.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import LoadingMessage from '../components/LoadingMessage.jsx'
import TaskFilters from '../components/TaskFilters.jsx'
import TaskRow from '../components/TaskRow.jsx'

export default function TasksPage() {
  const [filters, setFilters] = useState({ search: '', status: 'all', userId: 'all' })
  const [doneIds, setDoneIds] = useState([])
  const [page, setPage] = useState(1)
  const pageSize = 10
  const todosQuery = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: getUsers })

  const usersById = useMemo(
    () => Object.fromEntries((usersQuery.data ?? []).map((user) => [user.id, user.name])),
    [usersQuery.data],
  )

  const visibleTasks = useMemo(() => {
    const search = filters.search.trim().toLowerCase()
    return (todosQuery.data ?? []).filter((task) => {
      const isDone = doneIds.includes(task.id)
      const matchesSearch = task.title.toLowerCase().includes(search)
      const matchesStatus = filters.status === 'all' || (filters.status === 'done' ? isDone : !isDone)
      const matchesUser = filters.userId === 'all' || task.userId === Number(filters.userId)
      return matchesSearch && matchesStatus && matchesUser
    })
  }, [todosQuery.data, doneIds, filters])
  const pageCount = Math.ceil(visibleTasks.length / pageSize)
  const pageTasks = visibleTasks.slice((page - 1) * pageSize, page * pageSize)

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }))
    setPage(1)
  }

  function toggleDone(id) {
    setDoneIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function clearFilters() {
    setFilters({ search: '', status: 'all', userId: 'all' })
    setPage(1)
  }

  if (todosQuery.isPending || usersQuery.isPending) return <LoadingMessage message="Loading tasks..." />
  if (todosQuery.isError || usersQuery.isError) {
    return <ErrorMessage message={todosQuery.error?.message ?? usersQuery.error?.message} />
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-plum">Your workspace</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink">Tasks</h1>
        <p className="mt-2 text-slate-600">A clear view of what’s open and what you’ve finished.</p>
      </div>
      <TaskFilters
        {...filters}
        users={usersQuery.data ?? []}
        onChange={updateFilter}
      />
      <p className="text-sm font-semibold text-slate-500">
        Showing {visibleTasks.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, visibleTasks.length)} of {visibleTasks.length} matching tasks
      </p>
      {visibleTasks.length === 0 ? (
        <EmptyMessage onClear={clearFilters} />
      ) : (
        <>
          <ul className="space-y-3">
          {pageTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              userName={usersById[task.userId]}
              isDone={doneIds.includes(task.id)}
              onToggle={toggleDone}
            />
          ))}
          </ul>
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="rounded-lg border border-lilac bg-white px-4 py-2 text-sm font-semibold text-plum disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-slate-500">Page {page} of {pageCount}</span>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
              disabled={page === pageCount}
              className="rounded-lg border border-lilac bg-white px-4 py-2 text-sm font-semibold text-plum disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

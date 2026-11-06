import { useQuery } from '@tanstack/react-query'
import { getTodos, getUsers } from '../api/todos.js'
import ErrorMessage from '../components/ErrorMessage.jsx'
import LoadingMessage from '../components/LoadingMessage.jsx'
import StatCard from '../components/StatCard.jsx'

export default function StatsPage() {
  const todosQuery = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: getUsers })

  if (todosQuery.isPending || usersQuery.isPending) return <LoadingMessage message="Loading task stats..." />
  if (todosQuery.isError || usersQuery.isError) {
    return <ErrorMessage message={todosQuery.error?.message ?? usersQuery.error?.message} />
  }

  const todos = todosQuery.data
  const doneCount = todos.filter((task) => task.completed).length
  const openCount = todos.length - doneCount
  const countsByUser = usersQuery.data.map((user) => ({
    ...user,
    count: todos.filter((task) => task.userId === user.id).length,
  })).filter((user) => user.count > 0)
  const largestCount = Math.max(...countsByUser.map((user) => user.count), 1)

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-plum">At a glance</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink">Task stats</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total tasks" value={todos.length} description="Loaded from JSONPlaceholder" />
        <StatCard label="Done" value={doneCount} description="Completed in the API data" />
        <StatCard label="Open" value={openCount} description="Still to do in the API data" />
      </div>
      {todos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-lilac bg-white p-8 text-center text-slate-600">No task stats to show yet.</div>
      ) : (
        <section className="rounded-2xl border border-lilac bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-bold text-ink">Tasks by user</h2>
          <ul className="mt-5 space-y-4">
            {countsByUser.map((user) => (
              <li key={user.id} className="grid grid-cols-[5.5rem_1fr_2rem] items-center gap-3 text-sm">
                <span className="truncate text-slate-600">{user.name.split(' ')[0]}</span>
                <div className="h-3 overflow-hidden rounded-full bg-lilac">
                  <div className="h-full rounded-full bg-plum" style={{ width: `${(user.count / largestCount) * 100}%` }} />
                </div>
                <span className="font-bold text-ink">{user.count}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

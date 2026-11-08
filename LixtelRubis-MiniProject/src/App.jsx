import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import StatsPage from './pages/StatsPage.jsx'
import TaskDetailPage from './pages/TaskDetailPage.jsx'
import TasksPage from './pages/TasksPage.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10">
        <Routes>
          {/* React Router maps each page and reads :id from the task detail URL. */}
          <Route path="/" element={<TasksPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import JobsPage from "./pages/JobsPage"
import NotFoundPage from "./pages/NotFoundPage"
import JobPage, { jobLoader } from "./pages/JobPage"
import AddJobPage from "./pages/AddJobPage"
import EditJobPage from "./pages/EditJobPage"

const App = () => {
  // Add a new job
  const addJob = async (newJob) => {
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    })
  }

  // Delete a job
  const deleteJob = async (id) => {
    await fetch(`/api/jobs/${id}`, { method: "DELETE" })
  }

  // Edit a job
  const editJob = async (id, job) => {
    await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    })
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path="/jobs/:id/edit" element={<EditJobPage editJob={editJob} />} loader={jobLoader} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  )

  return <RouterProvider router={router} />
}

export default App

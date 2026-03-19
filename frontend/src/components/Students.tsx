import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Students() {
  const [students, setStudents] = useState<any[]>([])

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    axios.get(`${API_URL}/students`)
      .then(res => setStudents(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleDelete = (id: string) => {
    axios.delete(`${API_URL}/delete/${id}`)
      .then(() => {
        setStudents(prev => prev.filter(s => s._id !== id))
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-start p-6">

      <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
        🎓 Student Dashboard
      </h1>

      <div className="w-full max-w-6xl">

        <div className="flex justify-end mb-4">
          <Link
            to="/create"
            className="bg-white text-indigo-700 font-semibold px-5 py-2 rounded-xl shadow-md hover:bg-indigo-100 transition"
          >
             Add Student
          </Link>
        </div>

        <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl overflow-hidden">

          <table className="w-full text-left text-white">
            <thead>
              <tr className="bg-white/30 uppercase text-sm tracking-wider">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Age</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr
                  key={s._id}
                  className="border-b border-white/20 hover:bg-white/10 transition"
                >
                  <td className="p-4 font-medium">{s.name}</td>
                  <td className="p-4">{s.email}</td>
                  <td className="p-4">{s.age}</td>

                  <td className="p-4 text-center space-x-2">
                    <Link
                      to={`/update/${s._id}`}
                      className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm shadow"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(s._id)}
                      className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {students.length === 0 && (
            <div className="text-center p-10 text-white">
              <p className="text-lg font-semibold">No students found </p>
              <p className="text-sm opacity-80 mt-2">
                Click "Add Student" to create one
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default Students
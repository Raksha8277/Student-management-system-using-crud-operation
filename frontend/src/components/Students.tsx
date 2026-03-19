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
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-300 to-indigo-400 flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white shadow-xl rounded-2xl p-6 mb-6 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            🎓 Student Management
          </h1>

          <Link
            to="/create"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl"
          >
            Add Student
          </Link>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Age</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="border-b hover:bg-indigo-50">
                  <td className="p-4">{s.name}</td>
                  <td className="p-4">{s.email}</td>
                  <td className="p-4">{s.age}</td>

                  <td className="p-4 text-center space-x-3">
                    <Link to={`/update/${s._id}`} className="text-blue-600">
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(s._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {students.length === 0 && (
            <div className="text-center p-6">No students found</div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Students
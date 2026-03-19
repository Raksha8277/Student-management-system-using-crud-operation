import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Students() {
  const [students, setStudents] = useState<any[]>([])

  useEffect(() => {
    axios.get("http://localhost:3001/students")
      .then(res => setStudents(res.data))
  }, [])

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setStudents(prev => prev.filter(s => s._id !== id))
      })
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
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-md transition duration-200"
          >
             Add Student
          </Link>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">

          <table className="w-full text-left">
            <thead>
              <tr className="bg-indigo-500 text-white text-sm uppercase tracking-wide">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Age</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, index) => (
                <tr
                  key={s._id}
                  className={`border-b hover:bg-indigo-50 transition ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-4 font-medium text-gray-700">{s.name}</td>
                  <td className="p-4 text-gray-600">{s.email}</td>
                  <td className="p-4 text-gray-600">{s.age}</td>

                  <td className="p-4 text-center space-x-3">

                    <Link
                      to={`/update/${s._id}`}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    >
                       Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(s._id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                       Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          {students.length === 0 && (
            <div className="text-center p-6 text-gray-500">
              No students found 
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default Students
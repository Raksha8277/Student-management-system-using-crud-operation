import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Students() {
  const [students, setStudents] = useState<any[]>([])

  const API_URL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
  
    axios.get(`${API_URL}/api/students`)
      .then(res => setStudents(res.data))
      .catch(err => console.error("Error fetching students:", err))
  }, [API_URL])

  const handleDelete = (id: string) => {
  
    axios.delete(`${API_URL}/api/delete/${id}`)
      .then(() => {

        setStudents(students.filter(student => student._id !== id))
      })
      .catch(err => console.error("Error deleting student:", err))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-3xl font-bold text-center mb-6">
          Student Management System
        </h1>

        <div className="flex justify-end mb-4">
          <Link
            to="/create"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
          >
            + Add Student
          </Link>
        </div>

        {students.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No students found. Add one!</p>
        ) : (
          <table className="w-full border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Age</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="text-center border-t hover:bg-gray-100">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.age}</td>
                  <td className="p-3">
                    <Link
                      to={`/update/${s._id}`}
                      className="text-blue-600 font-semibold mr-3 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  )
}

export default Students
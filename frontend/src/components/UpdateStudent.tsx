import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function UpdateStudent() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")

  // Fetch student data on mount
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get("http://localhost:3001/students")
        const student = res.data.find((s: any) => s._id === id)
        if (student) {
          setName(student.name)
          setEmail(student.email)
          setAge(student.age)
        }
      } catch (error) {
        console.error("Failed to fetch student:", error)
        alert("Unable to fetch student data")
      }
    }

    fetchStudent()
  }, [id])

  // Handle update form submission
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3001/update/${id}`, { name, email, age })
      navigate("/")
    } catch (error) {
      console.error("Failed to update student:", error)
      alert("Update failed. Please try again.")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Student</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          Update Student
        </button>
      </form>
    </div>
  )
}

export default UpdateStudent
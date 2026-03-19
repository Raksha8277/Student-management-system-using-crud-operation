import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateStudent() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(`${API_URL}/create`, { name, email, age: Number(age) })
      navigate("/")
    } catch (error) {
      console.error(error)
      alert("Failed to create student")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">

        <h2 className="text-xl font-bold">Add Student</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <button type="submit" className="bg-indigo-500 text-white px-4 py-2">
          {loading ? "Submitting..." : "Submit"}
        </button>

      </form>
    </div>
  )
}

export default CreateStudent
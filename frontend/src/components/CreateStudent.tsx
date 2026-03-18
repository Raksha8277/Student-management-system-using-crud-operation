import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateStudent() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3001/create", { name, email, age })
      navigate("/")
    } catch (error) {
      console.error("Error creating student:", error)
      alert("Failed to create student. Make sure the backend is running on port 3001.")
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Add Student</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
          className="border p-2 w-full"
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreateStudent
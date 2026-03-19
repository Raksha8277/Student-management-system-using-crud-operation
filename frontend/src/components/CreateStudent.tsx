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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
         Add Student
      </h1>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-5 text-white"
      >

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/30 placeholder-white text-black focus:outline-none focus:ring-2 focus:ring-white"
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/30 placeholder-white text-black focus:outline-none focus:ring-2 focus:ring-white"
          required
        />

        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={e => setAge(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/30 placeholder-white text-black focus:outline-none focus:ring-2 focus:ring-white"
          required
        />

        {/* Buttons Row */}
        <div className="flex gap-3 pt-2">

          <button
            type="submit"
            className="w-full bg-blue-400 white font-semibold py-3 rounded-xl shadow-md hover:bg-indigo-500 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full bg-red-400 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-red-500 transition"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  )
}

export default CreateStudent
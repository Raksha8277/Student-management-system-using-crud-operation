import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateStudent() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post("http://localhost:3001/create", { name, email, age })
      navigate("/")
    } catch (error) {
      console.error("Error creating student:", error)
      alert("Failed to create student")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-300 to-indigo-400 flex items-center justify-center p-6">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
           Add Student
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
            <span className="absolute left-3 top-9 text-gray-400"></span>
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
            <span className="absolute left-3 top-9 text-gray-400"></span>
          </div>

          {/* Age */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              className="w-full px-4 py-2 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
            <span className="absolute left-3 top-9 text-gray-400"></span>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-3">

            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-md transition"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

          </div>

        </form>
      </div>
    </div>
  )
}

export default CreateStudent
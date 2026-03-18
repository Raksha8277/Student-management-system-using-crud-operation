import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateStudent() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_API_URL || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !email || !age) {
      alert("Please fill in all fields")
      return
    }

    setLoading(true)
    
    try {
      await axios.post(`${API_URL}/api/create`, { name, email, age })
      navigate("/")
    } catch (error) {
      console.error("Error creating student:", error)
      
      if (API_URL) {
        alert("Failed to create student. Please try again.")
      } else {
        alert("Failed to create student. Make sure the backend is running.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Student</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter student email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Age
            </label>
            <input
              type="number"
              placeholder="Enter student age"
              value={age}
              onChange={e => setAge(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="1"
              max="120"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 flex-1 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateStudent
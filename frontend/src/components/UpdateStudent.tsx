import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function UpdateStudent() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  
  const API_URL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        
        const res = await axios.get(`${API_URL}/api/students`)
        const student = res.data.find((s: any) => s._id === id)
        
        if (student) {
          setName(student.name)
          setEmail(student.email)
          setAge(student.age)
        } else {
          alert("Student not found")
          navigate("/")
        }
      } catch (error) {
        console.error("Failed to fetch student:", error)
        alert("Unable to fetch student data. Please try again.")
        navigate("/")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchStudent()
    }
  }, [id, navigate, API_URL])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    
    if (!name || !email || !age) {
      alert("Please fill in all fields")
      return
    }

    setUpdating(true)
    
    try {
      
      await axios.put(`${API_URL}/api/update/${id}`, { name, email, age })
      navigate("/")
    } catch (error) {
      console.error("Failed to update student:", error)
      
      
      if (API_URL) {
        alert("Update failed. Please try again.")
      } else {
        alert("Update failed. Make sure the backend is running on port 3001.")
      }
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Update Student
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
              min="1"
              max="120"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              disabled={updating}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className={`flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 ${
                updating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {updating ? 'Updating...' : 'Update Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateStudent
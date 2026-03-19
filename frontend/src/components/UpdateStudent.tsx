import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function UpdateStudent() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [loading, setLoading] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    axios.get(`${API_URL}/students`)
      .then(res => {
        const student = res.data.find((s: any) => s._id === id)
        if (student) {
          setName(student.name)
          setEmail(student.email)
          setAge(student.age)
        }
      })
      .catch(err => console.log(err))
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.put(`${API_URL}/update/${id}`, { name, email, age })
      navigate("/")
    } catch (error) {
      console.error(error)
      alert("Update failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl shadow-md space-y-4">

        <h2 className="text-xl font-bold">Update Student</h2>

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          className="border p-2 w-full"
        />

        <button type="submit" className="bg-indigo-500 text-white px-4 py-2">
          {loading ? "Updating..." : "Update"}
        </button>

      </form>
    </div>
  )
}

export default UpdateStudent
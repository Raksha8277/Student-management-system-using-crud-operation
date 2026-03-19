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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">

      <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
         Update Student
      </h1>

      <form
        onSubmit={handleUpdate}
        className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-5 text-white"
      >

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter Name"
          className="w-full p-3 rounded-lg bg-white/30 placeholder-white text-black focus:outline-none focus:ring-2 focus:ring-white"
        />

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="w-full p-3 rounded-lg bg-white/30 placeholder-white text-black focus:outline-none focus:ring-2 focus:ring-white"
        />

        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          placeholder="Enter Age"
          className="w-full p-3 rounded-lg bg-white/30 placeholder-white text-black focus:outline-none focus:ring-2 focus:ring-white"
        />

        <div className="flex gap-3 pt-2">

          <button
            type="submit"
            className="w-full bg-blue-400 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-indigo-500 transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
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

export default UpdateStudent
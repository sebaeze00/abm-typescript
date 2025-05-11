import { useState } from "react"

type User = {
  id: number
  name: string
  email: string
}

function App() {
  const [user, setUser] = useState<User[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  const addOrUpdate = () => {

    if (!name || !email) {
      return
    }

    if (editingId !== null) {
      setUser(prev =>
        prev.map(user => user.id === editingId ? { ...user, name, email } : user)
      )
      setEditingId(null)

    } else {
      const newUser: User = {
        id: Date.now(),
        name,
        email,
      }
      setUser(prev => [...prev, newUser])
    }
    setName('')
    setEmail('')
  }

  const editUser = (user: User) => {
    setName(user.name)
    setEmail(user.email)
    setEditingId(user.id)
  }

  return (
    <>
      <div >
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          onClick={addOrUpdate}
        >
          {editingId ? 'Actualizar' : 'Agregar'}
        </button>
      </div>

      <ul>{user.map(u => (
        <li key={u.id}>
          <div>
            <p >{u.name}</p>
            <p >{u.email}</p>
          </div>

          <button
            onClick={() => editUser(u)}
            className="text-blue-500 hover:underline"
          >
            Editar
          </button>

        </li>
      ))}</ul>
    </>
  )
}

export default App
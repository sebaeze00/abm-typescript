import { useState } from "react"

type User = {
  id: number
  name: string
  email: string
}

function App() {
  //le voy a pasar el typescript para definir  el tipo de dato a utilizar
  const [user, setUser] = useState<User[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  //Guardo el id del usuario a editar o null si es uno nuevo
  const [editingId, setEditingId] = useState<number | null>(null)

  const addOrUpdate = () => {

    //si no contiene nombre o mail termino la funcion
    if (!name || !email) {
      return
    }

    //si editingId no es null estoy editando un user y recorro el array 
    //hasta el que matchee con el user.id y actualizo el valor de los campos
    if (editingId !== null) {
      setUser(prev =>
        prev.map(user => user.id === editingId ? { ...user, name, email } : user)
      )
      setEditingId(null)

      //si no estoy editando es porque es un usuario nuevo y le creo un id con Date.now y lo agrego al array
    } else {
      const newUser: User = {
        id: Date.now(),
        name,
        email,
      }
      setUser(prev => [...prev, newUser])
    }

    //limpio el valor de los inputs
    setName('')
    setEmail('')
  }

  //si tocan el boton editar reemplzazo el valor de los inputs por los del id seleccionado
  const editUser = (user: User) => {
    setName(user.name)
    setEmail(user.email)
    setEditingId(user.id)
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Prueba de ABM
      </h1>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-2 border border-gray-300 rounded"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          onClick={addOrUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? 'Actualizar' : 'Agregar'}
        </button>
      </div>

      <ul className="space-y-3">
        {user.map(u => (
          <li
            className="flex justify-between items-center bg-gray-50 border p-3 rounded"
            key={u.id}
          >
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
            </div>

            <button
              onClick={() => editUser(u)}
              className="text-blue-500 hover:underline"
            >
              Editar
            </button>

          </li>
        ))}
      </ul>
    </>
  )
}

export default App
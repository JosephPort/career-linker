import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import useRegister from "../hooks/useRegiser"

const Register = () => {
  const { dispatch } = useAuthContext()
  const { register, error } = useRegister();

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const registerPress = async (e) => {
    e.preventDefault();
    register(email, firstName, lastName, username, password, confirmPassword, dispatch);
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center p-6">
      <div className="flex flex-col bg-white rounded-md border-2 items-center w-72 p-6">
        <form onSubmit={registerPress} className="text-black w-full">
          <label className="font-semibold">
            First Name
          </label>
          <input className="w-full border rounded border-gray-400 pl-2 mb-2 text-sm h-7" required onChange={
            (e) => setFirstName(e.target.value)
          } />
          <label className="font-semibold">
            Last Name
          </label>
          <input className="w-full border rounded border-gray-400 pl-2 mb-2 text-sm h-7" required onChange={
            (e) => setLastName(e.target.value)
          } />
          <label className="font-semibold">
            Email
          </label>
          <input type="email" className="w-full border rounded border-gray-400 pl-2 mb-2 text-sm h-7" required onChange={
            (e) => setEmail(e.target.value)
          } />
          <label className="font-semibold">
            Username
          </label>
          <input className="w-full border rounded border-gray-400 pl-2 mb-2 text-sm h-7" required onChange={
            (e) => setUsername(e.target.value)
          } />
          <label className="font-semibold">
            Password
          </label>
          <input type="password" className="w-full border rounded border-gray-400 pl-2 mb-2 text-sm h-7" required onChange={
            (e) => setPassword(e.target.value)
          } />
          <label className="font-semibold">
            Confirm Password
          </label>
          <input type="password" className="w-full border rounded border-gray-400 pl-2 mb-2 text-sm h-7" required onChange={
            (e) => setConfirmPassword(e.target.value)
          } />
          <button className="bg-red-700 w-full h-10 rounded mt-4 text-white">
            Sign up
          </button>
          <p className="text-center mt-4 text-red-700 font-semibold text-sm">{error}</p>
        </form>
      </div>
      <Link to="/login" className="mt-12">
          Already have an account? <span className="underline">Sign in</span>
      </Link>
    </div>
  )
}

export default Register
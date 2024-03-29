import { NavLink } from "react-router-dom"
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useLogin from "../hooks/useLogin";

const SignIn = () => {
  const { dispatch } = useAuthContext()
  const { login, error } = useLogin()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginPress = async (e) => {
    e.preventDefault()
    login(username, password, dispatch)
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center p-6">
      <div className="flex flex-col bg-white rounded-md border-2 items-center w-72 p-6">
        <form onSubmit={loginPress} className="text-black w-full">
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
          <button className="bg-red-700 w-full h-10 rounded mt-4 text-white">
            Log in
          </button>
          <p className="text-center mt-4 text-red-700 font-semibold text-sm">{error}</p>
        </form>
      </div>
      <NavLink to="/signup" className="mt-12">
          Don't have an account? <span className="underline">Register</span>
      </NavLink>
    </div>
  )
}

export default SignIn
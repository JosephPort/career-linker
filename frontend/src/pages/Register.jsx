import { NavLink } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const Register = () => {
  const { dispatch } = useAuthContext()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')

  const registerPress = async (e) => {
    e.preventDefault()

    if (password != confirmPassword){
      setError("Passwords are not the same")
      return
    }

    await axios.post('http://localhost:4000/register', 
    {
      email: email,
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password
    })
    .then(response => {
      console.log(response.data);
      // save the user to local storage
      localStorage.setItem('token', JSON.stringify(response.data.token))
      // update the auth context
      dispatch({type: 'LOGIN'})
      setError('')
    })
    .catch(error => {
      setError(error.response.data.error)
    })
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
      <NavLink to="/login" className="mt-12">
          Already have an account? <span className="underline">Sign in</span>
      </NavLink>
    </div>
  )
}

export default Register
import { useState } from 'react';
import axios from 'axios';

const useRegister = () => {
  const [error, setError] = useState('')

  // Function to register a user
  const register = async (email, firstName, lastName, username, password, confirmPassword, dispatch) => {
    if (password !== confirmPassword){
      setError("Passwords are not the same")
      return
    }

    try {
      // Send a POST request to the server to register the user
      const response = await axios.post('http://localhost:4000/register', 
      {
        email: email,
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password
      })

      console.log(response.data);
      // Store the token in local storage
      localStorage.setItem('token', JSON.stringify(response.data.token))
      // Dispatch a login action
      dispatch({type: 'LOGIN'})
      setError('')
    } catch (error) {
      setError(error.response.data.error)
    }
  }

  return { register, error };
}

export default useRegister;
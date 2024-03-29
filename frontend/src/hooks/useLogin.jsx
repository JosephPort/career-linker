import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
  const [error, setError] = useState('')

  // Function to handle login
  const login = async (username, password, dispatch) => {
    try {
      // Send login request to server
      const response = await axios.post('http://localhost:4000/login', 
      {
        username: username,
        password: password      
      })

      // Log the response data
      console.log(response.data);

      // Store the token in local storage
      localStorage.setItem('token', JSON.stringify(response.data.token))

      // Dispatch login action
      dispatch({type: 'LOGIN'})

      // Reset error state
      setError('')
    } catch (error) {
      // Set error state with the error message from the server
      setError(error.response.data.error)
    }
  }

  // Return the login function and error state
  return { login, error };
}

export default useLogin;
import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { isLoggedIn: true }; // Set isLoggedIn to true when user logs in
    case 'LOGOUT':
      return { isLoggedIn: false }; // Set isLoggedIn to false when user logs out
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: false // Initialize isLoggedIn to false
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token) {
      dispatch({ type: 'LOGIN' }); // Check if user is already logged in on initial start
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

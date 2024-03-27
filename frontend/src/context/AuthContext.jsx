import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  //Sets variables accessed by navbar so it can display correct elements
  switch (action.type) {
    case 'LOGIN':
      return { isLoggedIn: true };
    case 'LOGOUT':
      return { isLoggedIn: false };
  }
};

export const AuthContextProvider = ({ children }) => {
  //Inits isLoggedIn to false
  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: false
  });

  //Checks if the user is already logged in on initial start
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token) {
      dispatch({ type: 'LOGIN' });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
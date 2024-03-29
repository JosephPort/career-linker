import { Link, NavLink } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
  const { dispatch, isLoggedIn } = useAuthContext()

  const logout = () => {
    localStorage.removeItem('token')
    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <nav className="w-screen h-14 flex justify-between items-center text-white bg-black fixed">
      <Link to="/" className="ml-4 text-2xl font-semibold">
        Career<span className="text-red-700">Linker</span>
      </Link>
      <ul className="flex space-x-6 pr-8">
        {isLoggedIn ? (
          <>
            <li>
              <NavLink className="align-middle [&.active]:text-red-700" to="/create-listing">
                Create Listing
              </NavLink>
            </li>
            <li>
              <NavLink className="align-middle [&.active]:text-red-700" to="/my-listings">
                My Listings
              </NavLink>
            </li>
            <li className="bg-red-700 w-20 h-8 rounded text-center">
              <NavLink onClick={logout} to="/" className="align-middle">
                Sign Out
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className="align-middle">
                Log In
              </NavLink>
            </li>
            <li className="bg-red-700 w-20 h-8 rounded text-center">
              <NavLink to="/signup" className="align-middle">
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar
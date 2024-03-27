import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Signin from "./pages/Signin"
import MyListings from "./pages/MyListings"
import CreateListing from "./pages/CreateListing"
import Register from "./pages/Register"
import ViewListing from "./pages/ViewListing"

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/:id" element={<ViewListing />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

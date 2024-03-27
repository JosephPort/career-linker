import { useEffect, useState } from "react"
import axios from "axios"
import HomeListings from "../components/HomeListings";

const Home = () => {

  const [listings, setListings] = useState([])

  useEffect( () => {
    getListings()
  }, []);


  const getListings = async () => {
    await axios.get('http://localhost:4000/listings')
    .then(response => {
      setListings(response.data)
    })
    .catch(error => {
      console.log(error.response)
    })
  }
  return (
    <div className="flex flex-col h-screen items-center p-20">
        {listings.map((listing, index) => (
          <HomeListings key={index} listing={listing} />
        ))}
    </div>
  )
}

export default Home
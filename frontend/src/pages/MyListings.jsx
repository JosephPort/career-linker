import { useEffect, useState } from "react"
import axios from "axios"
import MyLisComp from "../components/MyLisComp";

const MyListings = () => {
  const [listings, setListings] = useState([])

  useEffect( () => {
    getListings()
  }, []);

  const getListings = async () => {
    await axios.get('http://localhost:4000/get-listings', 
    {
      headers: {
        'authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
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
          <MyLisComp key={index} listing={listing} />
        ))}
    </div>
  )
}

export default MyListings
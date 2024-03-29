import { useState, useEffect } from 'react';
import axios from 'axios';

const useMyListings = () => {
  const [listings, setListings] = useState([])

  useEffect(() => {
    // Function to fetch listings from the server
    const fetchListings = async () => {
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

    // Call the fetchListings function when the component mounts
    fetchListings();
  }, []);

  return listings;
}

export default useMyListings;

import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetListing = (id) => {
  const [listing, setListing] = useState([])

  useEffect(() => {
    const fetchListing = async () => {
      await axios.get(`http://localhost:4000/get-listing/${id}`)
      .then(response => {
        setListing(response.data)
      })
      .catch(error => {
        console.log(error.response)
      })
    }

    fetchListing();
  }, []);

  return listing;
}

export default useGetListing;
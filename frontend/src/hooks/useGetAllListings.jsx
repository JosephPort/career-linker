import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetAllListings = () => {
  const [listings, setListings] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      await axios.get('http://localhost:4000/listings')
      .then(response => {
        setListings(response.data)
      })
      .catch(error => {
        console.log(error.response)
      })
    }

    fetchListings();
  }, []);

  return listings;
}

export default useGetAllListings;
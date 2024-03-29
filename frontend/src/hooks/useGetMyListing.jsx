import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetApplicants = (id) => {
  const [listing, setListing] = useState([])
  const [names, setNames] = useState([])

  useEffect(() => {
    const fetchApplicants = async () => {
      await axios.get(`http://localhost:4000/get-applicants/${id}`, 
      {
        headers: {
          'authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      .then(response => {
        setListing(response.data.listing);
        setNames(response.data.names)
      })
      .catch(error => {
        console.log(error.response.data.error)
      })
    }

    fetchApplicants();
  }, []);

  return { listing, names };
}

export default useGetApplicants;
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

const ViewListing = () => {
  const [listing, setListing] = useState([])
  const params = useParams()
  const id = params.id

  useEffect( () => {
    getListings()
  }, []);

  const getListings = async () => {
    await axios.get(`http://localhost:4000/get-listing/${id}`)
    .then(response => {
      setListing(response.data)
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  const applyListing = async () => {
    await axios.post(`http://localhost:4000/apply/${id}`,
    {},
    {
      headers: {
        'authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error.response.data.error)
    })
  }
  return (
  <div className="flex flex-col h-screen items-center p-20 text-sm">
    <h1 className='text-2xl font-bold'>
      {listing.title}
    </h1>
    <p className='font-bold'>
        {listing.company}<span className='font-medium text-sm text-gray-600'> - {listing.location}</span>
      </p>
    <div className='flex flex-col items-start w-200'>
      <label className='font-bold mt-4'>
        Description
      </label>
      <p className='text-sm'>
        {listing.description}
      </p>
    </div>
    <button 
    onClick={applyListing}
    className="bg-red-700 w-64 h-10 rounded mx-auto block mt-4 text-white">
      Apply
    </button>
  </div>
  )
}

export default ViewListing
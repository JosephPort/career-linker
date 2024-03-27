import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

const MyListInfo = () => {
  const params = useParams()
  const id = params.id

  const [listing, setListing] = useState([])
  const [names, setNames] = useState([])

  useEffect( () => {
    getListings()
  }, []);

  const getListings = async () => {
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
      <label className='font-bold mt-4'>
        Applicants
      </label>
      {names.map((name, index) => (
        <p className='text-green-700 text-sm font-semibold' key={index}>{name}</p>
      ))}
    </div>
  </div>
  )
}

export default MyListInfo
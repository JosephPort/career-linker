import React from 'react'
import { Link } from 'react-router-dom'

const MyLisComp = ({listing}) => {
  return (
    <div className='border w-96 mt-4 rounded border-gray-400 p-2'>
      <Link to={`/my-listings/${listing._id}`} className='font-bold justify-center text-red-700 text-xl'>
        {listing.title}
      </Link>
      <p>
        {listing.company}
      </p>
      <p className='text-gray-500 text-sm'>
        {listing.location}
      </p>
      <p className='text-sm text-gray-500 mt-4 line-clamp-2'>
        {listing.description}
      </p>
      <p className='mt-4 text-green-700 text-sm font-semibold'>
        {listing.applicants.length} applicants
      </p>
    </div>
  )
}

export default MyLisComp
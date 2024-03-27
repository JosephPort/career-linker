import React from 'react'

const MyLisComp = ({listing}) => {
  return (
    <div className='border w-96 mt-4 rounded border-gray-400 p-2'>
      <p className='font-bold text-center text-red-700 text-xl'>
        {listing.title}
      </p>
      <p>
        {listing.company}
      </p>
      <p className='text-gray-500 text-sm'>
        {listing.location}
      </p>
      <p className='mt-4 text-green-700 text-sm font-semibold'>
        {listing.applicants.length} applicants
      </p>
    </div>
  )
}

export default MyLisComp
import { useParams } from 'react-router-dom'
import useGetListing from '../hooks/useGetListing'
import useApplyListing from '../hooks/useApplyListing'

const ViewListing = () => {
  const params = useParams()
  const id = params.id

  const listing = useGetListing(id)
  const applyListing = useApplyListing();

  const handleApply = () => {
    applyListing(id);
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
    onClick={handleApply}
    className="bg-red-700 w-64 h-10 rounded mx-auto block mt-4 text-white">
      Apply
    </button>
  </div>
  )
}

export default ViewListing
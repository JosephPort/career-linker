import { useParams } from 'react-router-dom'
import useGetMyListing from '../hooks/useGetMyListing'

const MyListInfo = () => {
  const params = useParams()
  const id = params.id

  const { listing, names } = useGetMyListing(id);

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
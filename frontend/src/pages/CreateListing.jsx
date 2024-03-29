import { useState } from "react"
import useCreateListing from "../hooks/useCreateListing"

const CreateListing = () => {
  const createListing = useCreateListing()

  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

  const createPress = async (e) => {
    e.preventDefault()

    createListing(title, company, location, description)
  }
  
  return (
    <div className="flex flex-col h-screen items-center pt-20">
      <h2 className="text-2xl font-medium" >
        Create Listing
      </h2>
      <div className="w-200">
        <form className="mt-6" onSubmit={createPress}>
          <label className="font-semibold">
            Job Title
          </label>
          <input required className="w-full border rounded border-gray-400 p-2 mb-2 text-sm h-10" onChange={
            (e) => setTitle(e.target.value)
          } />
          <label className="font-semibold">
            Company
          </label>
          <input required className="w-full border rounded border-gray-400 p-2 mb-2 text-sm h-10" onChange={
            (e) => setCompany(e.target.value)
          } />
          <label className="font-semibold">
            Location
          </label>
          <input required className="w-full border rounded border-gray-400 p-2 mb-2 text-sm h-10" onChange={
            (e) => setLocation(e.target.value)
          } />
          <label className="font-semibold">
            Job Description
          </label>
          <textarea required className="w-full border rounded border-gray-400 p-2 mb-2 text-sm resize-none" rows="12" onChange={
            (e) => setDescription(e.target.value)
          } />
          <button className="bg-red-700 w-80 h-10 rounded mx-auto block mt-4 text-white">
            Post Listing
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateListing
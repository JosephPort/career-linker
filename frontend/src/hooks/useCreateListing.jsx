import axios from 'axios';

const useCreateListing = () => {
  const createListing = async (title, company, location, description) => {
    await axios.post('http://localhost:4000/create-listing', 
    {
      title: title,
      company: company,
      location: location,
      description: description,
    },
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

  return createListing;
}

export default useCreateListing;
import axios from 'axios';

const useApplyListing = () => {
  const applyListing = async (id) => {
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

  return applyListing;
}

export default useApplyListing;
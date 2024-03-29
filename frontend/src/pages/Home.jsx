import HomeListings from "../components/HomeListings";
import useGetAllListings from "../hooks/useGetAllListings";

const Home = () => {
  const listings = useGetAllListings()

  return (
    <div className="flex flex-col h-screen items-center p-20">
        {listings.map((listing, index) => (
          <HomeListings key={index} listing={listing} />
        ))}
    </div>
  )
}

export default Home
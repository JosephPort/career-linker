import MyLisComp from "../components/MyLisComp";
import useMyListings from "../hooks/useMyListings";

const MyListings = () => {
  const listings = useMyListings();

  return (
    <div className="flex flex-col h-screen items-center p-20">
        {/* Map over the listings array and render a MyLisComp component for each listing */}
        {listings.map((listing, index) => (
          <MyLisComp key={index} listing={listing} />
        ))}
    </div>
  )
}

export default MyListings
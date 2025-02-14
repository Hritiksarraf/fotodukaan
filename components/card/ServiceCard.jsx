import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function ServiceCard({
  _id,
  profilePhoto,
  name,
  freelancerDetails,
  stars,
  city
}) {


  let minPrice = Number.MAX_VALUE;

Object.keys(freelancerDetails || {}).forEach((key) => {
  const details = freelancerDetails[key];

  let halfDayPrice = details?.price?.halfDayPrice;
  let fullDayPrice = details?.price?.fullDayPrice;
  let weddingFullDayPrice = details?.weddingPrice?.fullDayPrice;

  // Convert to numbers only if they are valid (non-empty and non-zero)
  halfDayPrice = halfDayPrice && Number(halfDayPrice) > 0 ? Number(halfDayPrice) : Number.MAX_VALUE;
  fullDayPrice = fullDayPrice && Number(fullDayPrice) > 0 ? Number(fullDayPrice) : Number.MAX_VALUE;
  weddingFullDayPrice = weddingFullDayPrice && Number(weddingFullDayPrice) > 0 ? Number(weddingFullDayPrice) : Number.MAX_VALUE;

  // Find the minimum of all valid prices
  minPrice = Math.min(minPrice, halfDayPrice, fullDayPrice, weddingFullDayPrice);
});

// If minPrice is still MAX_VALUE, set it to 0
minPrice = minPrice === Number.MAX_VALUE ? 0 : minPrice;
let minamount = minPrice;




  return (
    <div className=" w-[90vw] md:w-[22vw]  bg-gradient-to-r from-white to-white dark:text-black my-6 shadow-lg flex flex-col bg-primary/10 ">
      <Link href={`/freelancer/${_id}`}>
      <div className="block h-64 w-64 mx-auto rounded-full pt-4">
        <img
          src={profilePhoto}
          alt={name}
          className="aspect-square object-cover rounded-md h-full w-full"
        />
      </div>

      <div className="flex flex-col items-center text-center mt-4">
        <p className="text-xl font-bold my-1">{name}</p>
        <p className="text-sm">
          <span className="font-semibold text-xl">{minamount} ₹</span> Starting Price <span>| {city}</span>
        </p>

        <div className="h-5 flex">
          {Array(5)
            .fill(0)
            .map((_, index) =>
              index < Number(stars.star) ? (
                <StarIcon key={index} size="small" className="text-yellow-500" />
              ) : (
                <StarBorderIcon key={index} size="small" className="text-yellow-500" />
              )
             
            )}
            <span>| {stars.noOfPeople} Review</span>
        </div>

        <Link
          href={`/freelancer/${_id}`}
          className="bg-blue-500 text-white px-6 py-3 my-4 rounded-full mr-4"
        >
          Know more
        </Link>
      </div>
      </Link>
    </div>
  );
}

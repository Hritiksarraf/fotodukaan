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
    <Link href={`/freelancer/${_id}`} className="">
      <div key={_id} className='relative w-[46vw] md:w-[22vw] mx-auto bg-gradient-to-r   from-white to-white  dark:text-black md:my-6  shadow-lg flex flex-col bg-primary/10 px-5 '>
        <div className='block md:h-64 md:w-64  mx-auto rounded-full md:pt-4 pt-4'>
          <img src={profilePhoto} alt="" className=' aspect-square object-cover rounded-md h-full w-full' />
        </div>

        <div className='flex flex-col items-center text-center mt-4'>
          <p className='md:text-xl text-md font-bold my-1'>{name}</p>
          <p className='md:text-sm text-xs'> <span className='font-semibold md:text-xl text-base'>{minamount} ₹ </span > Starting Price  </p>


          <div className='md:h-5 h-3 flex'>
            {Array(5).fill(0).map((_, index) => (
              index < Number(stars.star) ? (
                <StarIcon key={index} size="small" className="text-yellow-500" />
              ) : (
                <StarBorderIcon key={index} size="small" className="text-yellow-500" />
              )
            ))}
          </div>

          <Link href={`/freelancer/${_id}`} className="bg-blue-500 text-white p-2 mt-4 mb-2 md:px-6 md:py-3 md:my-4 rounded-full mr-4 md:text-base text-sm">Know more</Link>

        </div>
      </div>
    </Link>
  );
}

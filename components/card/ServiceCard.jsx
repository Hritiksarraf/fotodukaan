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
    let birthdayPrice = details?.birthdayPrice?.fullDayPrice;

    // Convert to numbers only if they are valid (non-empty and non-zero)
    halfDayPrice = halfDayPrice && Number(halfDayPrice) > 0 ? Number(halfDayPrice) : Number.MAX_VALUE;
    fullDayPrice = fullDayPrice && Number(fullDayPrice) > 0 ? Number(fullDayPrice) : Number.MAX_VALUE;
    weddingFullDayPrice = weddingFullDayPrice && Number(weddingFullDayPrice) > 0 ? Number(weddingFullDayPrice) : Number.MAX_VALUE;
    birthdayPrice = birthdayPrice && Number(birthdayPrice) > 0 ? Number(birthdayPrice) : Number.MAX_VALUE;
    // Find the minimum of all valid prices
    minPrice = Math.min(minPrice, halfDayPrice, fullDayPrice, weddingFullDayPrice, birthdayPrice);
  });

  // If minPrice is still MAX_VALUE, set it to 0
  minPrice = minPrice === Number.MAX_VALUE ? 0 : minPrice;
  let minamount = minPrice;




  return (
    <Link href={`/freelancer/${_id}`} className="">
      <div key={_id} className='relative w-[30vw] md:w-[22vw] mx-auto bg-gradient-to-r border border-gray-100   from-white to-white  dark:text-black md:my-6  md:shadow-lg flex flex-col bg-primary/10 md:px-5 px-2 '>
        <div className='block md:h-64 md:w-64  mx-auto rounded-full md:pt-4 pt-2'>
          <img src={profilePhoto} alt="" className=' aspect-square object-cover rounded-md h-full w-full' />
        </div>

        <div className='flex flex-col items-center text-center mt-1'>
          <p className='md:text-xl text-sm md:font-bold md:my-1'>{name}</p>
          <p className='md:text-sm text-[0.5rem] md:hidden'> <span className='md:font-semibold md:text-xl text-xs'>{minamount} ₹ </span >Starting</p>
          <p className='md:text-sm text-xs hidden md:inline-block'> <span className='md:font-semibold md:text-xl text-sm'>{minamount} ₹ </span >Starting Price</p>


          <div className='md:h-5 h-3 flex md:hidden'>
            {Array(5).fill(0).map((_, index) => (
              index < Number(stars.star) ? (
                <StarIcon key={index}sx={{ fontSize: 12 }} className="text-yellow-500" />
              ) : (
                <StarBorderIcon key={index} sx={{ fontSize: 12 }} className="text-yellow-500" />
              )
            ))}
          </div>
          <div className='md:h-5 h-3 hidden md:flex'>
            {Array(5).fill(0).map((_, index) => (
              index < Number(stars.star) ? (
                <StarIcon key={index} size='small' className="text-yellow-500" />
              ) : (
                <StarBorderIcon key={index} size='small' className="text-yellow-500" />
              )
            ))}
          </div>

          <Link href={`/freelancer/${_id}`} className="  text-blue-500  mt- mb-2 md:px-6 md:py-3 md:my-4 rounded-full md:mr-4 md:text-base text-xs">Know more</Link>

        </div>
      </div>
    </Link>
  );
}

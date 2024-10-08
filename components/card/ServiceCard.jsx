import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function ServiceCard({
  _id,
  profilePhoto,
  name,
  startingPrice,
  stars,
}) {
  return (
    <div className=" w-[90vw] md:w-[22vw] mx-auto bg-gradient-to-r from-white to-white dark:text-black my-6 shadow-lg flex flex-col bg-primary/10 ">
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
          <span className="font-semibold text-xl">{startingPrice} ₹</span> Starting Price
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
        </div>

        <Link
          href={`/freelancer/${_id}`}
          className="bg-blue-500 text-white px-6 py-3 my-4 rounded-full mr-4"
        >
          Know more
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link"
export default function ServiceCard(props) {
    return (
        <>
            {/* data-aos="fade-up" */}
            
            <div className=' w-96 rounded-xl flex flex-col m-5 min-h-[24rem]' >
            <Link href='/'>
                <img src={props.img}  className='border-8 rounded-xl  p-2  aspect-[4/3] border-[#142a58] h-100 object-cover   w-100 ' alt="error loading img" />
                
                <h1 className='blue1 px-2 font-bold hover:text-red-800 text-decoration-none text-4xl my-2 lg:text-5xl text-center ' style={{
                    fontFamily: "poppins"
                    , fontSize: "2rem"
                }} href="#">{props.title}</h1>
                </Link>
                <p className='text-center lg:text-lg block ' style={{
                    fontFamily: "Garamond"
                }}>Our most coveted banquet at The Tamarind Tree is the place you can relax in captivating surroundings and celebrate your Sangeeth ceremony. .</p>
            </div>
            
        </>
    )
}

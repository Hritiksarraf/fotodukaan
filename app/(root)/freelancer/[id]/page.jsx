'use client'
import React from 'react'
import { useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CustomizedAccordions from '@/components/accordian/Accordion';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Image from 'next/image';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function page() {
    const { id } = useParams();

    const [freelancerData, setFreelancerData] = useState({
        freelancerDetails: {}
    });

    const getUser = async () => {
        const response = await fetch(`/api/freelancer/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data)
        setFreelancerData(data);
    };

    useEffect(() => {
        getUser();
    }, [id]);

    const displayCategories = (details) => {
        if (!details) return null;
        return Object.keys(details).map(category => (
            <div key={category}>
                <h4 className="flex w-full text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">{category}</h4>

            </div>
        ));
    };


    function getYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    }
    let minamount=Number.MAX_VALUE;
    Object.keys(freelancerData?.freelancerDetails).forEach((key) => {
    const details = freelancerData?.freelancerDetails[key];
    const fullDayPrice = Number(details?.price?.fullDayPrice) || Number.MAX_VALUE;
    const weddingPrice = Number(details?.weddingPrice?.fullDayPrice) || Number.MAX_VALUE;
    
    minamount = Math.min(minamount, fullDayPrice, weddingPrice);
    });

    return (
        <div className='pt-20'>
            <section>
                <section className="text-gray-600 body-font overflow-hidden shadow-2xl bg-gradient-to-r from-white to-blue-200">
                    <div className="container p-4 md:p-10 py-10 mx-auto  ">
                        <div className="lg:w-5/6 mx-auto p-10 flex flex-wrap  shadow-2xl bg-white">
                            <img alt="ecommerce" className="lg:w-1/2 aspect-square w-full lg:h-auto h-64 object-cover object-center rounded" src={freelancerData.profilePhoto} />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-700 tracking-widest">Freelancer</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{freelancerData.name}</h1>
                                <div className="flex mb-4">
                                    {Array(5)
                                        .fill(0)
                                        .map((_, index) =>
                                            index < Number(freelancerData.stars?.star) ? (
                                                <StarIcon key={index} size="small" className="text-yellow-500" />
                                            ) : (
                                                <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                                            )

                                        )}
                                    <span className="flex items-center">

                                        <span className="text-gray-600 ml-3">{freelancerData.stars?.noOfPeople} Review</span>
                                    </span>

                                </div>
                                <div>
                                    <h1 className='text-xl font-bold'>{freelancerData.city}</h1>
                                </div>

                                <p className="leading-relaxed min-h-32">{freelancerData.aboutYourself}</p>

                                <div className="flex">
                                    <p className='text-sm'> <span className='font-semibold text-3xl'>{minamount} ₹ </span > Starting Price  </p>
                                    <Link href={`/booking/${freelancerData._id}`} className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Book Now</Link>


                                </div>
                                <div className="mt-4">
                                    {/* Display Freelancer Categories */}
                                    <h3 className="text-lg font-bold mb-2">Categories</h3>
                                    <div className='flex gap-4 flex-wrap'>
                                        {displayCategories(freelancerData.freelancerDetails)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            {/* this is for accordion */}
            {/* <section>
            {freelancerData.freelancerDetails && Object.keys(freelancerData.freelancerDetails).length > 0 ? (
              <CustomizedAccordions freelancerDetails={freelancerData.freelancerDetails}/>
            ) : (
              <p>Loading categories...</p>
            )}
        </section> */}
            <div className="bg-cover  bg-center w-full flex flex-col md:flex-row text-center md:text-left bg-gradient-to-b md:bg-gradient-to-r from-[#0E2041] to-[#0E2041]">
                <div className="flex bg bg-white rounded-b-[9rem] md:rounded-r-[17rem] justify-center items-center  md:w-[40%]  ">
                    <div className='h-full'>
                        <img className='object-cover h-full md:w-[40vw] shadow-2xl rounded-b-[6rem] md:rounded-r-[17rem]' src="https://images.pexels.com/photos/4307935/pexels-photo-4307935.jpeg" alt="" />
                    </div>
                </div>
                <div className="w-full md:w-[60%] px-7 py-10 md:px-20">
                    <h1 className="text-3xl md:text-5xl  text-left md:pr-32  text-white " style={{
                        fontFamily: "poppins"

                    }}>
                        My Skills
                    </h1>

                    <div className='mt-9'>
                        {Object.entries(freelancerData.freelancerDetails).map(([category, details], index) => (
                            <div className='flex mt-8' key={index}>
                                <div className='bg-[#9558EC] rounded-md h-full inline-block p-1'>
                                    <CameraAltOutlinedIcon className='text-3xl md:text-4xl text-white' />
                                </div>
                                <div className='ml-2'>
                                    {/* Capitalize the first letter of the category */}
                                    <h1 className='text-xl md:text-3xl font-serif text-left text-blue-500 '>
                                        {category.replace(/\b\w/g, (char) => char.toUpperCase())}
                                    </h1>

                                    {/* Capitalize the first letter of each subcategory */}
                                    <div className='text-left'>
                                        {details.subcategories.map((sub, idx) => (
                                            <span key={idx} className="md:text-lg text-left text-white  text-[0.8rem]">{sub.replace(/\b\w/g, (char) => char.toUpperCase())}, </span>
                                        ))}
                                    </div>

                                    {/* Conditionally render Camera Details, Drone details, etc., based on the category */}
                                    {details.cameraDetails && (
                                        <div className='my-2 text-yellow-500 text-left text-2xl'>
                                            {category === 'Photography' || category === 'Videography' ? (
                                                <h1 className='  title-font font-medium mb-1 '>
                                                    Camera Details
                                                </h1>
                                            ) : category === 'Drone' ? (
                                                <h1 className='  title-font font-medium mb-1 '>
                                                    Drone Details
                                                </h1>
                                            ) : category === 'Video Editing' ? (
                                                <h1 className='  title-font font-medium mb-1 '>
                                                    Video Editing Software
                                                </h1>
                                            ) : null}

                                            <div className='text-left p-0 m-0'>
                                                {Object.entries(details.cameraDetails).map(([key, value]) => (
                                                    <p className='text-white inline-block  font-bold md:py-1 -py- my-0 px-1 md:text-lg text-sm mx-1    ' key={key}>{`${key.replace(/\b\w/g, (char) => char.toUpperCase())}: ${value}`}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 flex mx-auto w-full justify-center md:justify-start">
                        <Link href='/contact' className="bg-blue-500 text-white px-6 py-3 rounded-full mr-4">Book Now</Link>

                    </div>
                </div>
            </div>

            {/* image section */}
            <section>
            <h2 className='text-center text-5xl  font-bold  my-6'>Glimpses of My Work</h2>
            <h2 className='text-center text-3xl text-blue-500 font-bold mb-6'>Image Gallery</h2>
  <div className='flex flex-wrap items-center justify-center'>
    {freelancerData.image?.map((imgSrc, index) => (
      <img
        key={index}
        src={imgSrc} // dynamically load the image from the freelancerData
        alt={`Freelancer Image ${index + 1}`}
        className='md:w-[25vw] w-[85vw] object-cover aspect-square m-2 rounded-xl shadow-lg'
      />
    ))}
  </div>
</section>


{/* Video Section */}
<section className='mt-10'>
  <h2 className='text-center text-3xl text-blue-500 font-bold mb-6'>Video Gallery</h2>
  <div className='flex flex-wrap justify-center'>
    {freelancerData.video?.map((videoLink, index) => (
      <div key={index} className=' md:w-[30vw] w-[90vw] p-4'>
        <div className='relative' style={{ paddingBottom: '70%' }}>
          <iframe
            className='absolute top-0 left-0 w-full h-full rounded-3xl'
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoLink)}`}
            title={`Freelancer Video ${index + 1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    ))}
  </div>
</section>


        </div>
    )
}

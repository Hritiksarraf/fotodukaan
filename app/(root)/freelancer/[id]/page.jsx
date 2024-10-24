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
import ReactCardFlip from 'react-card-flip';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function page() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
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
        setLoading(false);
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
    let minamount = Number.MAX_VALUE;
    Object.keys(freelancerData?.freelancerDetails).forEach((key) => {
        const details = freelancerData?.freelancerDetails[key];
        const fullDayPrice = Number(details?.price?.fullDayPrice) || Number.MAX_VALUE;
        const weddingPrice = Number(details?.weddingPrice?.fullDayPrice) || Number.MAX_VALUE;

        minamount = Math.min(minamount, fullDayPrice, weddingPrice);
    });


    const [flippedCardIndex, setFlippedCardIndex] = useState(null);

    const handleCardClick = (index) => {
        setFlippedCardIndex(flippedCardIndex === index ? null : index);
    };


    if (loading) {
        return (<div className='min-h-[80vh] w-[100vw]'>
            <Box sx={{ display: 'flex' }}>
                <div className='pt-80 flex items-center justify-center text-center mx-auto  '>
            <CircularProgress color="inherit" size="8rem" />
            </div>
          </Box>
        </div>);
      }

    return (
        <div className='pt-20'>
            <section>
                <section className="text-gray-600 body-font overflow-hidden  bg-gradient-to-r from-white to-white">
                    <div className="container lg:w-[75vw] p-4 md:p-10 py-10 mx-auto  bg-white  ">
                        <div className=" mx-auto p-10 flex flex-wrap   ">
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


<div className="bg-cover bg-center w-full flex flex-col md:flex-row text-center bg-gradient-to-b md:bg-gradient-to-r  py-5">
            <div className="flex flex-col items-center w-full justify-center py-10 md:px-20">
                <h1 className="text-3xl md:text-5xl text-center text-black" style={{ fontFamily: 'Poppins' }}>
                    CheckOut My Servicess
                </h1>
                <div className='flex flex-row flex-wrap items-center justify-center gap-5  w-[90vw] mt-9'>
                    {Object.entries(freelancerData.freelancerDetails).map(([category, details], index) => (
                        <ReactCardFlip isFlipped={flippedCardIndex === index} flipDirection="horizontal" key={index}>
                            {/* Front Side of the Card */}
                            <div
                                className='md:flex-row flex flex-col items-center justify-center w-[90vw] md:w-[25vw] h-[45vh]  bg-[#0E2041]   shadow-2xl bg-cover bg-center  m-1 p-7'
                                onClick={() => handleCardClick(index)}
                                style={{ backgroundImage: `url()` }}
                            >
                                <div className=''>
                                    <h1 className='text-xl md:text-4xl font-bold text-center text-[#F5AA2B]'>
                                        {category.replace(/\b\w/g, (char) => char.toUpperCase())}
                                    </h1>
                                    <div className=' my-5 flex flex-wrap text-left  justify-center items-center   text-white'>
                                        {details.subcategories.map((sub, idx) => (
                                            <span key={idx} className=" px-2 text-sm font-semibold ">
                                                {sub.replace(/\b\w/g, (char) => char.toUpperCase())}, 
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Back Side of the Card */}
                            <div
                                className='md:flex-row flex flex-col items-center justify-center w-[90vw] md:w-[25vw] h-[45vh]  bg-[#F5AA2B]   shadow-2xl bg-cover bg-center  m-1 p-7'
                                onClick={() => handleCardClick(index)}
                                style={{ backgroundImage: `url(/assets/category${index + 1}.jpg)` }}
                            >
                                <div className=''>
                                    {details.cameraDetails && (
                                        <div className='text-xl md:text-3xl text-center text-[#0E2041] font-bold'>
                                            {category === 'Photography' || category === 'Videography' || category === 'Candid Photography' || category === 'Cinematography' ? 'Camera Details' : 
                                             category === 'Drone' ? 'Drone Details' : 
                                             category === 'Video Editing' ? 'Video Editing Software' : ''}
                                            <div className='text-center'>
                                                {Object.entries(details.cameraDetails).map(([key, value]) => (
                                                    <p className='text-white inline-block font-bold md:text-lg text-sm mx-1' key={key}>
                                                        {`${key.replace(/\b\w/g, (char) => char.toUpperCase())}: ${value}`}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {details.price && (
                                        <div className='mt-4'>
                                            <h1 className='text-xl md:text-3xl text-center text-[#0E2041] font-bold'>Price</h1>
                                            <div>
                                                {Object.entries(details.price).map(([key, value]) => (
                                                    <p className='text-white inline-block font-bold md:text-lg text-sm mx-1' key={key}>
                                                        {`${key.replace(/\b\w/g, (char) => char.toUpperCase())}: ${value}`}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {details.weddingPrice && (
                                        <div className='mt-4'>
                                            <h1 className='text-xl md:text-3xl text-center text-[#0E2041] font-bold'>Wedding Price</h1>
                                            <div>
                                                {Object.entries(details.weddingPrice).map(([key, value]) => (
                                                    <p className='text-white inline-block font-bold md:text-lg text-sm mx-1' key={key}>
                                                        {`${key.replace(/\b\w/g, (char) => char.toUpperCase())}: ${value}`}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ReactCardFlip>
                    ))}
                </div>
            </div>
        </div>





            {/* image section */}
            <section>
                <h2 className='text-center text-5xl  font-bold  my-6'>Glimpses of My Work</h2>
                <h2 className='text-center text-3xl text-blue-500 font-bold mb-6'>Image Gallery</h2>
                <div className='flex flex-wrap mx-auto md:w-[80vw] items-center justify-center'>
                    {freelancerData.image?.map((imgSrc, index) => (
                        <img
                            key={index}
                            src={imgSrc} // dynamically load the image from the freelancerData
                            alt={`Freelancer Image ${index + 1}`}
                            className='md:w-[22vw] w-[85vw] object-cover aspect-square m-4 rounded-xl shadow-lg'
                        />
                    ))}
                </div>
            </section>


            {/* Video Section */}
            <section className='mt-10'>
                <h2 className='text-center text-3xl  text-blue-500 font-bold mb-6'>Video Gallery</h2>
                <div className='flex flex-wrap  mx-auto md:w-[80vw] items-center justify-center'>
                    {freelancerData.video?.map((videoLink, index) => (
                        <div key={index} className=' md:w-[25vw] w-[90vw] p-4'>
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

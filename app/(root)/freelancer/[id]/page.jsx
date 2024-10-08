'use client'
import React from 'react'
import { useParams } from "next/navigation";
import { useState,useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CustomizedAccordions from '@/components/accordian/Accordion';

export default function page() {
    const {id} = useParams();

    const [freelancerData, setFreelancerData] = useState({
      freelancerDetails: {} // Initialize as an empty object
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


  return (
    <div className='pt-20'>
        <section>
        <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 aspect-square w-full lg:h-auto h-64 object-cover object-center rounded" src={freelancerData.profilePhoto}/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-700 tracking-widest">Freelancer</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{freelancerData.name}</h1>
        <div className="flex mb-4">
        <Stack spacing={1}>
      <Rating name="half-rating" defaultValue={Number(freelancerData.stars?.star)} precision={0.5} readOnly />
    </Stack>
          <span className="flex items-center">
            
            <span className="text-gray-600 ml-3">{freelancerData.stars?.noOfPeople} Review</span>
          </span>
          
        </div>
        <div>
          <h1 className='text-xl font-bold'>{freelancerData.city}</h1>
          </div>
        
        <p className="leading-relaxed min-h-64">{freelancerData.aboutYourself}</p>
        
        <div className="flex">
        <p className='text-sm'> <span className='font-semibold text-3xl'>{freelancerData.startingPrice} ₹ </span > Starting Price  </p>
          <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Order</button>

          
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
        <section>
            {freelancerData.freelancerDetails && Object.keys(freelancerData.freelancerDetails).length > 0 ? (
              <CustomizedAccordions freelancerDetails={freelancerData.freelancerDetails}/>
            ) : (
              <p>Loading categories...</p>
            )}
        </section>
    </div>
  )
}

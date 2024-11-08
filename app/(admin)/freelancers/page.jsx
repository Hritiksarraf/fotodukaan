"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { Input } from '@mui/material';

function page() {
  const [freelancer, setFreelancer] = useState(null)
  const [search, setSearch] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const router = useRouter()
  const getFeelancer = async () => {
    console.log('getting freelancer')
    const response = await fetch("/api/freelancer");
    const data = await response.json();
    console.log('got freelancer', data)
    setFreelancer(data);
    setSearchResult(data)

  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        console.log("token")
        const decodedUser = jwt.decode(token);
        if(!decodedUser.isAdmin){
          router.push("/")
        }
    }
    }, [])
  useEffect(()=>{
    // window.location.reload();
    getFeelancer()
  },[])
  useEffect(()=>{
    const searchPosts =freelancer && freelancer.filter((fr) =>fr.name.toLowerCase().includes(search.trim().toLowerCase()));
    setSearchResult(searchPosts)

  },[setSearch,search])
  
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center '>
      <div className='w-full flex items-center justify-center mb-5'>
        <Input
          className='w-[50%] rounded-lg placeholder:text-center text-xl transition-colors duration-300 pl-5 border border-gray-500 text-black placeholder-black '
          placeholder='search freelancers'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>
      <div className='h-full w-[90%] grid grid-cols-3 gap-3   '>
        {searchResult?.map((fr)=>(
          <div className='flex flex-col bg-gray-300 rounded-xl' key={fr._id}>
            <div className='font-bold text-2xl w-full text-center'>NAME : {fr.name}</div>
            <div className='rounded-full w-full flex items-center justify-center'>
              <img src={fr.profilePhoto} className='size-24 rounded-full' alt="freelancer image" />
            </div>
            <div className='ml-2'>EMAIL :  {fr.email}</div>
            <div className='ml-2'>PHONE NO: {fr.phone}</div>
            <div className='ml-2'>ADDRESS: {fr.address}</div>
            <div className='w-full flex items-center justify-center'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>{router.push(`freelancers/${fr._id}`)}}>View More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
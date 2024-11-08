"use client"
import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import jwt from 'jsonwebtoken'
import { Input } from '@mui/material'

function page() {
  const [user, setUser] = useState(null)
  const [freelancers, setFreelancers] = useState(null)
  const [search, setSearch] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const fetchFreelancerArray = async(freelancerIds)=>{
    console.log(freelancerIds)
    const freelancerData = await Promise.all(
      freelancerIds.map(async (id) => {
        const response = await fetch(`/api/freelancer/${id}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            },
        });
        // console.log("a",await response.json())
        return await response.json(); // Assuming the API returns JSON
      })
    );
    console.log(freelancerData)
    setFreelancers(freelancerData);
    setSearchResult(freelancerData)
    
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        console.log("token")
        const decodedUser = jwt.decode(token);
        console.log("d",decodedUser)
        setUser(decodedUser);
        fetchFreelancerArray(decodedUser?.freelacers||[])
        if(!decodedUser.isAdmin){
          router.push("/")
        }
    }
    }, [])
    useEffect(()=>{
      const searchPosts =freelancers && freelancers.filter((fr) =>fr.name.toLowerCase().includes(search.trim().toLowerCase()));
      setSearchResult(searchPosts)
  
    },[setSearch,search])
    const handleAccept=async(id)=>{
      // const {adminId,freelancerId,isVerifiedByAdmin} = await req.json()
      const response = await fetch("/api/admin/freelancer", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminId:user?.id,
          freelancerId:id,
          isVerifiedByAdmin:true
        })
      })
      const data = await response.json()
      console.log("dd",data)
      if(data.success&&data.token){
        localStorage.setItem("token",data?.token)
        toast.success('freelancer aprooved Successfuly')
        window.location.reload();
      }else{
        toast.error('freelancer aprooved failed')
      }
    }
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
          <div className='flex flex-col bg-gray-300 rounded-xl mb-3' key={fr?._id || ""}>
            <div className='font-bold text-2xl w-full text-center'>NAME : {fr?.name || ""}</div>
            <div className='rounded-full w-full flex items-center justify-center'>
              <img src={fr?.profilePhoto || ""} className='size-24 rounded-full' alt="freelancer image" />
            </div>
            <div className='ml-2'>EMAIL :  {fr?.email || ""}</div>
            <div className='ml-2'>PHONE NO: {fr?.phone || ""}</div>
            <div className='ml-2'>ADDRESS: {fr?.address || ""}</div>
            <div className='ml-2'>CITY: {fr?.city || ""}</div>
            <div className='ml-2'>PINCODE: {fr?.pincode || ""}</div>
            
            <div className='w-full flex items-center justify-center'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>handleAccept(fr._id)}>Approve the freelancer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
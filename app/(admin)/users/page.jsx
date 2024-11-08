"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import jwt from 'jsonwebtoken'
import { Input } from '@mui/material'
import { useRouter } from 'next/navigation'
function page() {
    const [user, setUser] = useState()
    const [search, setSearch] = useState(null)
    const [searchResult, setSearchResult] = useState(null)
    const router = useRouter()
    const getUsers=async()=>{
        const response = await fetch("/api/admin/user")
        const data = await response.json()
        if(!data.success){
            toast.error('failed to fetch users')
        }else{
            setUser(data.users)
            setSearchResult(data.users)
        }
    }
    useEffect(()=>{
        getUsers()
    },[])
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
        const searchPosts =user && user.filter((u) =>u.name.toLowerCase().includes(search.trim().toLowerCase()));
        setSearchResult(searchPosts)
    
    },[setSearch,search])
    
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center '>
            <div className='w-full flex items-center justify-center mb-5'>
                <Input
                className='w-[50%] rounded-lg placeholder:text-center text-xl transition-colors duration-300 pl-5 border border-gray-500 text-black placeholder-black '
                placeholder='search users'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                />
            </div>
            <div className='h-full w-[90%] grid grid-cols-3 gap-3   '>
                {searchResult?.map((user)=>(
                <div className='flex flex-col bg-gray-300 rounded-xl' key={user?._id}>
                    <div className='font-bold text-2xl w-full text-center'>NAME : {user?.name}</div>
                    <div className='rounded-full w-full flex items-center justify-center'>
                    <img src={user?.profilePhoto} className='size-24 rounded-full' alt="freelancer image" />
                    </div>
                    <div className='ml-2'>EMAIL :  {user?.email}</div>
                    <div className='ml-2'>PHONE NO: {user?.phone}</div>
                    <div className='ml-2'>ADDRESS: {user?.address}</div>
                    <div className='ml-2'>CITY: {user?.city}</div>
                    <div className='ml-2'>PINCODE: {user?.pinCode}</div>
                    <div className='w-full flex items-center justify-center'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>router.push(`/users/${user?._id}`)}>View Details</button>
                    </div>
                </div>
                ))}
            </div>
        </div> 
    )
}

export default page
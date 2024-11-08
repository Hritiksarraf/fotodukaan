"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function page() {
    const [user, setUser] = useState([])
    const {id} = useParams()
    const router = useRouter()
    const removeUser=async(id)=>{
        const response = await fetch(`/api/admin/user/${id}`)
        const data = await response.json()
        if(!data.success){
            toast.error('failed to remove user')
        }else{
            toast.success('user removed')
            router.push('/users')
        }
    }
    const findUser = async()=>{
        const response = await fetch(`/api/admin/user/getUser`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        const data = await response.json()
        if(!data.success){
            toast.error('failed to find user')
        }else{
            setUser(data.user)
        }
    }
    useEffect(()=>{
        findUser()
    },[])
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center '>
        <div className='w-full text-center font-bold text-2xl'>
            {user?.name||""}
        </div>
        <div className='w-full flex items-center justify-center'>
            <img src={user?.profilePhoto||""} className='size-40 rounded-full' a alt="" />
        </div>
        <div>
            Email : {user?.email||""}
        </div>
        <div>
            Phone : {user?.phone||""}
        </div>
        <div>
            Address : {user?.address||""}
        </div>
        <div>
            Pincode : {user?.pinCode}
        </div>
        <div>
            City : {user?.city}
        </div>
        <div className='w-full text-2xl font-bold text-center'>
            Booked Orders
        </div>
        <div className='h-full w-[90%] grid grid-cols-3 gap-3'>

        {user?.booking && user?.booking.map((item, index) => (
            <div key={index} className='bg-slate-300 p-4 rounded-md shadow-md'>
                <div className='w-full text-xl font-bold text-center'>{item?.service || ""}</div>
                <div className='w-full text-lg text-center'>{item?.event || ""}</div>
                <div className='text-sm'>Freelancer name: {item?.freelancerName || ""}</div>
                <div className='text-sm'>Freelancer Email: {item?.freelancerEmail || ""}</div>
                <div className='text-sm'>Freelancer Phone: {item?.freelancerPhone || ""}</div>
                <div className='text-sm'>Date: {item?.date.split('T')[0] || ""}</div>
                <div className='text-sm'>Address: {item?.address || ""}</div>
                <div className='text-sm'>City: {item?.city || ""}</div>
                <div className='text-sm'>Pincode: {item?.pinCode || ""}</div>
                <div className='text-sm'>Total Price: {item?.totalAmount || ""}</div>
                <div className='text-sm'>Paid Amount: {item?.paidAmount || ""}</div>
                <div className='text-sm'>Discount Given: {item?.discount || ""}</div>
            </div>
        ))}
        </div>
        <div className='w-full flex items-center justify-center'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>removeUser(user?._id)}>Remove User</button>
        </div>
    </div>

  )
}

export default page
"use client"
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import jwt from 'jsonwebtoken'
function page() {
const [order, setOrder] = useState(null)
const getOrders=async()=>{
    const response = await fetch(`/api/admin/order`)
    const data = await response.json()
    if(!data.success){
        toast.error('failed to fetch orders')
    }else{
        let arr =[]
        data.orders?.map((order)=>{
            if(order.userCancel){
                arr.push(order)
            }
        })
        setOrder(arr)
        console.log(arr)
        // window.location.reload()
    }
}
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
    getOrders()
},[])
return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center '>
    <div className='w-full text-center font-bold text-3xl mb-5'>ORDERS CANCELLED BY USERS </div>
    <div className='h-full w-[90%] grid grid-cols-3 gap-3 mb-5'>
        {order && order.map((item, index) => (
        <div key={index} className='bg-slate-300 p-4 rounded-md shadow-md'>
            <div className='w-full text-xl font-bold text-center'>{item?.service || ""}</div>
            <div className='w-full text-lg text-center'>{item?.event || ""}</div>
            <div className='text-sm'>Customer name: {item?.customerName || ""}</div>
            <div className='text-sm'>Customer Email: {item?.customerEmail || ""}</div>
            <div className='text-sm'>Customer Phone: {item?.customerPhone || ""}</div>
            <div className='text-sm'>Freelancer Name: {item?.freelancerName || ""}</div>
            <div className='text-sm'>Freelancer Phone: {item?.freelancerPhone || ""}</div>
            <div className='text-sm'>Freelancer Email: {item?.freelancerEmail || ""}</div>
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
    </div>
)
}

export default page
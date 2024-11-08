"use client"
import { Button } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken'
function page() {
    const [freelancer, setFreelancer] = useState(null)
    const [orders, setOrders] = useState([])
    const router = useRouter()
    const { id } = useParams();
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
    const getFeelancer = async () => {
        console.log('getting freelancer')
        console.log("id",id)
        const response = await fetch(`/api/freelancer/${id}`);
        const data = await response.json();
        console.log('got freelancer', data)
        const orderresponse = await fetch(`/api/admin/order`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:id})
        })
        const orders= await orderresponse.json()
        if(!orders.success){
          toast.error('failed to fetch orders')
        }else{
          setOrders(orders.freelancerOrder["orders"])
        }
        setFreelancer(data);
    };
      useEffect(()=>{
        // window.location.reload();
        getFeelancer()
      },[])
      const handleDelete=async()=>{
        const response = await fetch(`/api/admin/freelancer/${id}`)
        const data = await response.json()
        if(!data.success){
          toast.error('failed to delete')
        }else{
          toast.success('freelancer deleted')
          router.push('/freelancers')
          
          
        } 
      }
    return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
        <div className='w-full text-2xl font-bold text-center'>
          Details of {freelancer?.name||""}
        </div>
        <div>
          <div className='flex w-full items-center justify-center'>
            <img src={freelancer?.profilePhoto||""} className='size-40 rounded-full' alt="" />
          </div>
          <div>
            Email :{freelancer?.email||""}
          </div>
          <div>
            Phone Number :{freelancer?.phone||""}
          </div>
          <div>
            Address : {freelancer?.address||""}
          </div>
          <div>
            City: {freelancer?.city||""}
          </div>
          <div>
            About :{freelancer?.aboutYourself||""}
          </div>
          <div>
            Adhaar Details : {freelancer?.aadharDetails||""}
          </div>
        </div>
        <div className='w-full text-2xl font-bold text-center'>
          ORDERS
        </div>
        <div className='h-full w-[90%] grid grid-cols-3 gap-3'>

        {orders && orders.map((item, index) => (
          <div key={index} className='bg-slate-300 p-4 rounded-md shadow-md'>
            <div className='w-full text-xl font-bold text-center'>{item?.service || ""}</div>
            <div className='w-full text-lg text-center'>{item?.event || ""}</div>
            <div className='text-sm'>Customer name: {item?.customerName || ""}</div>
            <div className='text-sm'>Customer Email: {item?.customerEmail || ""}</div>
            <div className='text-sm'>Customer Phone: {item?.customerPhone || ""}</div>
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
            <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleDelete}>Delete the freelancer</Button>
        </div>
    </div>
)
}

export default page
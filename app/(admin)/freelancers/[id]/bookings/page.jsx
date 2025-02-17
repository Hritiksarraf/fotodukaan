"use client"
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useParams } from 'next/navigation'
import OrderCard from '@/components/card/OrderCard'
function page() {
    const {id}=useParams()
    const [user, setUser] = useState(null)
    const [freelancer, setFreelancer] = useState(null)
    const [booking, setBooking] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            console.log("token")
            const decodedUser = jwt.decode(token);
            setUser(decodedUser)
            if(!decodedUser.isAdmin){
                router.push("/")
            }
        }
    
    }, [])
    const getFeelancer = async () => {
        console.log('getting freelancer')
        console.log("id",id)
        // const response = await fetch(`/api/freelancer/${id}`);
        // const data = await response.json();
        // console.log('got freelancerss', data)   
        //     if(Array.isArray(data?.booking)&&data?.orders?.length>0){
        //     const response = await fetch(`/api/admin/freelancer/${id}`,{
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             orderIds: data?.booking
        //         })
        //     })
        //     const data2 = await response.json();   
        //     console.log("dd",data2.bookings)  
        //     setBooking(data2?.bookings)
        // }
        // setFreelancer(data);
        const response = await fetch("/api/dashBoard", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
          });
            const data = await response.json();
            console.log("data",data)
            setBooking(data.orders)
    };
    useEffect(()=>{
        // window.location.reload();
        getFeelancer()
    },[])
    return (
        <div className='w-full min-h-screen flex flex-col'>
            <div className='text-center text-2xl font-bold'>
                BOOKINGS
            </div>
            <OrderCard
            orders={booking}
            onDelete={true}
            onEdit={true}
            />
        </div>
)
}

export default page
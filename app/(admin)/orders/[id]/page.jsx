"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Location from '@/components/location/Location'

function page() {
    const { id } = useParams()
    const router = useRouter()
    const [order, setOrder] = useState({
        customerName: "",
        freelancerName: "",
        customerEmail: "",
        freelancerEmail: "",
        customerPhone: "",
        freelancerPhone: "",
        pinCode: "",
        address: "",
        city: "",
        date: "",
        totalAmount: "",
        paidAmount: ""
    })
    const [place, setPlace] = useState('');
    const [readyToSubmit, setReadyToSubmit] = useState(false); // New state to track readiness

    const getOrder = async () => {
        const response = await fetch(`/api/admin/order/${id}`)
        const data = await response.json()
        setOrder({
            customerName: data.customerName,
            freelancerName: data.freelancerName,
            customerEmail: data.customerEmail,
            freelancerEmail: data.freelancerEmail,
            customerPhone: data.customerPhone,
            freelancerPhone: data.freelancerPhone,
            pinCode: data.pinCode,
            address: data.address,
            city: data.city,
            date: data.date,
            totalAmount: data.totalAmount,
            paidAmount: data.paidAmount
        })
        setPlace(data.city);
        if (!data.success) {
            toast.error('failed to fetch the order')
        } else {
            console.log("o", data)
        }
    }


     useEffect(() => {
            // Update freelancerData.city when place changes
            setOrder((prevState) => ({
                ...prevState,
                city: place,
            }));
        }, [place]);
    
        useEffect(() => {
            // Enable submission only if city is updated
            if (order.city === place) {
                setReadyToSubmit(true);
            }
        }, [order.city, place]);


    useEffect(() => {
        getOrder()
    }, [])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrder((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!order.customerName || !order.customerEmail || !order.customerPhone || !order.freelancerName || !order.freelancerEmail || !order.freelancerPhone || !order.address || !order.pinCode || !order.city) {
            alert("Please fill out all required fields.");
            return;
        }
        console.log("hello")
        const response = await fetch(`/api/admin/order/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
        console.log("hi")
        const data = await response.json()
        console.log("res", data)
        if (!data.success) {
            toast.message("failed to update the order", {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })

        } else {
            toast.success("Order updated successfully", {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            router.push("/orders")
            // getOrder()
        }
    }
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center '>
            <div className="min-h-screen flex justify-center items-center p-10 w-full" >
                <form className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-blue-100" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6">Edit order</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">customer name</label>
                        <input
                            type="text"
                            name="customerName"
                            value={order.customerName}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                    

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Address</label>
                        <textarea
                            type="text"
                            name="address"
                            value={order.address}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">customer Phone</label>
                        <input
                            name="customerPhone"
                            value={order.customerPhone}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">freelancer Phone</label>
                        <input
                            name="freelancerPhone"
                            value={order.freelancerPhone}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">PinCode</label>
                        <input
                            name="pinCode"
                            value={order.pinCode}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <p className="block text-sm font-semibold mb-2 text-gray-700">City</p>
                        <div className="w-full border rounded-xl py-1">
                            <Location onSelectLocation={setPlace} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg"
                    >
                        update order
                    </button>
                </form>
            </div>
        </div>
    )
}

export default page
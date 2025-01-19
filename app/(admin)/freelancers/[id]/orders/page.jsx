"use client";
import OrderCard from '@/components/card/OrderCard';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Page() {
    const { id } = useParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // To manage the loading state

    const getOrders = async () => {
        try {
            const response = await fetch('/api/getOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            const data = await response.json();

            setOrders(data.orders || []);
        } catch (error) {
            toast.error('An error occurred while fetching orders.', {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } finally {
            setLoading(false); // Stop loading after the fetch process
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col ">
            {loading ? (
                <p>Loading orders...</p> // Display a loading message or spinner
            ) : orders.length > 0 ? (
                <OrderCard orders={orders} onEdit={true} onDelete={true} />
            ) : (
                <p>No orders found.</p> // Show a fallback message if no orders are available
            )}
        </div>
    );
}

export default Page;

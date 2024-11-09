'use client'

import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken'; // To decode the token
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [localUser, setLocalUser] = useState(null);
  const [leftAmount, setLeftAmount] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwt.decode(token);
      setLocalUser(decodedUser);
    }
  }, []);

  useEffect(() => {
    async function fetchOrders() {
      if (!localUser) return;
      try {
        const response = await fetch('api/getOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: localUser.userid }),
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders.reverse());
          setLeftAmount(data.totalAmount - data.discount - data.paidAmount)
        } else {
          setError('Failed to fetch orders');
        }
      } catch (error) {
        setError('An error occurred while fetching orders');
      }
      setLoading(false);
    }

    fetchOrders();
  }, [localUser]);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch('/api/cancel-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } else {
        alert('Failed to cancel the order');
      }
    } catch (error) {
      alert('An error occurred while canceling the order');
    }
  };

  if (loading) {
    return (<div className='min-h-[80vh] w-[100vw]'>
      <Box sx={{ display: 'flex' }}>
        <div className='pt-80 flex items-center justify-center text-center mx-auto  '>
          <CircularProgress color="inherit" size="8rem" />
        </div>
      </Box>
    </div>);
  }
  if (error) return <p className="text-red-500 pt-32">{error}</p>;



  return (
    <div className='pt-32 bg-blue-100'>
      <div className="min-h-screen p-8 bg-blue-100">
        <h1 className="text-3xl text-blue-900 font-bold text-center mb-6">Welcome <span className='text-yellow-600'>{localUser.name}</span> This is Your Order History!</h1>

        {orders.length === 0 ? (
          <p className="text-black text-5xl text-center mt-32">You have no orders.</p>
        ) : (
          <div className=''>
            <div className='md:w-[55vw] mx-auto  flex flex-col flex-wrap'>
              {orders.map((order) => {
                return (
                  <section className="text-gray-600 body-font overflow-hidden my-5  bg-gradient-to-r from-white to-white">
                    <div className="container lg:w-[60vw] p-4 md:p-5 py-2 mx-auto  bg-white  ">
                      <div className=" mx-auto p-5 flex flex-wrap   ">
                        {/* <img alt="ecommerce" className="lg:w-1/2 aspect-square w-full lg:h-auto h-64 object-cover object-center rounded" src={'https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg'} /> */}
                        <div className=" w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                          <h2 className="text-sm title-font text-gray-700 tracking-widest">Freelancer</h2>
                          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{order.freelancerName}</h1>
                          <div className="flex mb-4">



                          </div>
                          <div>
                            <h2 className="text-sm title-font text-gray-700 tracking-widest">Service Address</h2>
                            <h1 className='text-xl font-bold'>{order.city} - {order.pinCode}</h1>
                            <p className="leading-relaxed ">{order.address}</p>
                          </div>



                          <div>
                            <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">Date</h2>
                            <h1 className='text-xl font-bold'>{new Date(order.date).toLocaleDateString()}</h1>
                          </div>

                          <div>
                            <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">Service Type</h2>
                            <h1 className='text-xl font-bold'>{order.service} - {order.event}</h1>
                          </div>
                          <div>
                            <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">
                              Service Duration
                            </h2>
                            <h1 className="text-xl font-bold">
                              {order.time}
                            </h1>
                          </div>
                          <div>
                            <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">Amount</h2>
                            <h1 className='text-xl font-bold'> <span className='font-normal'> Paid Amount</span> - ₹{order.paidAmount}</h1>
                            <h1 className='text-xl font-bold'> <span className='font-normal'>discount Amount</span> - ₹{order.discount}</h1>
                            <h1 className='text-xl font-bold'> <span className='font-normal text-lg'>When freelancer visit you need to pay </span> - ₹{(order.totalAmount - order.discount - order.paidAmount).toFixed(2)}</h1>
                          </div>



                          <button href={`/`} className="flex mt-4 mr-auto text-white bg-red-500  border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Cancel</button>
                        </div>
                        <div>

                        </div>

                      </div>




                    </div>

                  </section>
                )
              })}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;

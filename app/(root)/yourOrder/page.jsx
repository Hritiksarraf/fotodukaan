'use client'

import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken'; // To decode the token
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Script from 'next/script';
import Razorpay from 'razorpay';
import { useRouter } from 'next/navigation';

function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [localUser, setLocalUser] = useState(null);
  const [leftAmount, setLeftAmount] = useState(0)
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [formError, setFormError] = useState('');


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
          setOrders(data.orders);
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

  const handleCancelOrder = async (orderId, reason) => {
    const who = 'user'
    try {
      const response = await fetch('/api/order/cancle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, reason, who }),
      });

      if (response.ok) {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        alert('Order canceled successfully');
      } else {
        alert('Failed to cancel the order');
      }
    } catch (error) {
      alert('An error occurred while canceling the order');
    }
  };



  const handlePayment = async (amount, id, name) => {
    // setIsProcessingPayment(true);

    try {
      console.log(amount)
      const payload = { payAmount: amount };
      const response = await fetch('/api/razorpay', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),  // Convert payload to JSON string
      });

      const razorpayOrder = response.json();


      var options = {
        "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        "amount": amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Foto Dukaan", //your business name
        "description": "Order Transaction",
        "image": "https://res.cloudinary.com/hritiksarraf/image/upload/v1728397188/logo-light_bvqacf.png",
        "order_id": razorpayOrder.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
          // handleSubmit(e,razorpayOrder);
          alert('Your order has been placed')
          router.push('/yourOrder')
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": name, //your customer's name

        },
        "notes": {
          orderId: id
        },
        "theme": {
          "color": "#3399cc"
        }

      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log("razorPayerror", error)
    }
  }

  useEffect(() => {
  if(!localStorage.getItem("token"))router.push('/log-in')
}, [])

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
    <div className='md:pt-32 pt-20 bg-blue-100'>
      <div className="min-h-screen p-4 bg-blue-100">
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        <h1 className="text-3xl text-blue-900 font-bold text-center mb-6">Welcome <span className='text-yellow-600'>{localUser.name}</span> This is Your Order History!</h1>

        {orders.length === 0 ? (
          <p className="text-black text-5xl text-center mt-32">You have no orders.</p>
        ) : (
          <div className=''>
            <div className='md:w-[55vw] mx-auto  flex flex-col flex-wrap'>
              {orders.map((order) => {
                return (
                  <section className="text-gray-600 body-font overflow-hidden my-5  bg-gradient-to-r from-white to-white rounded-2xl">
                    <div className="container lg:w-[60vw] p-2 md:p-5 py-2 mx-auto  bg-white  ">
                      <div className=" mx-auto p-5 flex flex-wrap   ">

                        {/* <img alt="ecommerce" className="lg:w-1/2 aspect-square w-full lg:h-auto h-64 object-cover object-center rounded" src={'https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg'} /> */}
                        <div className=" w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                          <h1 className=" text-sm title-font font-medium mb-1 text-gray-700 ">Order id: <span className='text-gray-400'>{order._id}</span> </h1>
                          <Link href={`/freelancer/${order.freelancerId}`}>
                            <h2 className="text-sm title-font text-gray-700 tracking-widest  ">Freelancer</h2>
                            <h1 className=" text-3xl title-font font-medium mb-1 text-blue-700 underline">{order.freelancerName}</h1>
                          </Link>
                          <div className="flex mb-4">



                          </div>
                          <div>
                            <h2 className="text-sm title-font text-gray-700 tracking-widest">Service Address</h2>
                            <h1 className='md:text-xl text-lg font-bold'>{order.city} - {order.pinCode}</h1>
                            <p className="leading-relaxed text-sm md:text-lg ">{order.address}</p>
                          </div>



                          <div>
                            <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">Date</h2>
                            <div className='flex flex-wrap'>
                              {order.date.split(",").map((date, index) => {
                                const formattedDate = date.split("-").reverse().join("-"); // Converts yyyy-mm-dd to dd-mm-yyyy
                                return (
                                  <p key={index} className="md:text-xl text-sm font-bold mb-1 px-2 border-r-2">
                                    {formattedDate}
                                  </p>
                                );
                              })}

                            </div>
                          </div>

                          <div>
                            <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">Service Type</h2>
                            <h1 className='md:text-xl text-lg font-bold'>{order.service} - {order.event}</h1>
                          </div>
                          <div>
                            <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">
                              Service Duration
                            </h2>
                            <h1 className="md:text-xl text-lg font-bold">
                              {order.time
                                .split(",")
                                .map((value, index) =>
                                  value === "extraHourPrice"
                                    ? ""
                                    : value === "fullDayPrice"
                                      ? "Full Day"
                                      : value === "halfDayPrice"
                                        ? "Half Day"
                                        : `${value}${index === 1 ? " Hours" : ""}` // Add "Hours" to the number
                                )
                                .join(" ")}
                            </h1>
                          </div>
                          <div>
                            <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">Amount</h2>
                            <h1 className='text-xl font-bold'> <span className=' font-medium text-lg md:text-xl'> Paid Amount</span> - ₹{order.paidAmount}</h1>
                            <h1 className='text-xl font-bold'> <span className='font-medium text-lg md:text-xl'>discount Amount</span> - ₹{order.discount}</h1>
                            <h1 className='text-xl font-bold'> <span className='font-medium text-lg md:text-xl'>When freelancer visit you need to pay </span> - ₹{(order.totalAmount - order.discount - order.paidAmount).toFixed(2)}</h1>
                          </div>
                          {order.freelancerAproved && <h1 className='text-xl font-bold'> <span className='font-medium text-lg md:text-xl text-green-500'>Order Completed !! 🎉</span></h1>}

                          {(!order.freelancerCancel && !order.customerCancel && !order.freelancerAproved) && <div className='flex justify-between'>
                            <button
                              onClick={() => {
                                setCancelOrderId(order._id);
                                setShowCancelModal(true);
                              }}
                              className="flex mt-4 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded"
                            >
                              Cancel
                            </button>
                            {(order.totalAmount - order.discount - order.paidAmount).toFixed(2) > 1 && <button onClick={() => { handlePayment((order.totalAmount - order.discount - order.paidAmount).toFixed(2), order._id, order.customerName) }} className="flex mt-4  text-white bg-green-500  border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Pay Now</button>}




                            {showCancelModal && (
                              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] md:w-[40vw]">
                                  <h2 className="text-xl font-bold mb-4">Cancel Order</h2>
                                  <p className='my-2 text-gray-400 font-bold'>This will be considered toward your refund</p>
                                  <textarea
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter the reason for cancellation"
                                    rows="4"
                                    required
                                    error={!!formError}
                                    helperText={formError}
                                  ></textarea>
                                  {cancelReason.trim() === '' && (
                                    <p className="text-red-500 text-sm mt-1">
                                      Reason for cancellation is required.
                                    </p>
                                  )}
                                  <div className="flex justify-end mt-4">
                                    <button
                                      onClick={() => setShowCancelModal(false)}
                                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
                                    >
                                      Close
                                    </button>
                                    <button
                                      onClick={async () => {
                                        if (cancelReason.trim() === '') {
                                          return; // Prevent calling the function if the reason is empty
                                        }
                                        await handleCancelOrder(cancelOrderId, cancelReason);
                                        setShowCancelModal(false);
                                      }}
                                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                      Cancel Order
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}



                          </div>}
                          {(order.freelancerCancel || order.customerCancel) && (
                            <div className="flex flex-col justify-between mt-2">
                              <p className='text-red-500 text-sm md:text-lg font-bold'>Cancel Date:- {order.additionalDetails.find((detail) => detail.cancel)?.cancel
                                ?.cancelTime || "date missing"}</p>
                              {order.customerCancel && (
                                <p className='text-red-500 font-bold text-sm md:text-xl'>
                                  You canceled this order giving reason:-{" "}
                                  <span className='text-gray-500'>{
                                    order.additionalDetails.find((detail) => detail.cancel)?.cancel
                                      ?.reason || "No reason provided"
                                  }</span>

                                </p>

                              )}
                              {order.freelancerCancel && (
                                <p className='text-red-500 font-bold text-sm md:text-xl'>
                                  Freelancer canceled this order giving reason:-{" "}
                                  <span className='text-gray-500'>{
                                    order.additionalDetails.find((detail) => detail.cancel)?.cancel
                                      ?.reason || "No reason provided"
                                  }</span>
                                </p>
                              )}
                              {
                                !order.additionalDetails.find((detail) => detail.cancel)?.cancel?.refund && order.additionalDetails.find((detail) => detail.cancel)?.cancel?.eligible && <p className='text-green-600 text-sm md:text-lg my-2'>We will Soon check eligiblity and refund the amount in 7-10 days</p>
                              }
                              {
                                !order.additionalDetails.find((detail) => detail.cancel)?.cancel?.eligible && <p className='text-red-600 text-sm md:text-lg my-2'>You are not eligible for refund</p>
                              }
                              {
                                order.additionalDetails.find((detail) => detail.cancel)?.cancel?.refund && <p className='text-green-600 text-sm md:text-lg my-2'>Refund amount of {order.additionalDetails.find((detail) => detail.cancel)?.cancel?.refundAmount}  has been inicieded on {order.additionalDetails.find((detail) => detail.cancel)?.cancel?.refundTime} and will reflect in your bank account in 5-7 days</p>
                              }
                            </div>
                          )}

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

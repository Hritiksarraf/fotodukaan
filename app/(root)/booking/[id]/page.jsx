'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import jwt from "jsonwebtoken";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import EditBar from '@/components/editBar/EditBar';

export default function OrderForm() {
    const [step, setStep] = useState(1);
  const { id } = useParams();
  const [freelancerData, setFreelancerData] = useState({});
  const [orderData, setOrderData] = useState({
    customerName: '',
    address: '',
    pincode: '',
    mobileNumber: '',
    eventType: '',
    selectedCity: '',
    selectedService: '',
    eventDate: '',
    couponCode: '',
    time: '',
    event:''
  });

  const [loading, setLoading] = useState(true);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [originalTokenAmount, setOriginalTokenAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [couponMessage, setCouponMessage] = useState('');
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [events,setEvents]=useState([]);
  const [isRefundPolicyAccepted, setIsRefundPolicyAccepted] = useState(false);
  const [time,setTime]=useState([])

  // Fetch freelancer data
  const getFreelancer = async () => {
    try {
      const response = await fetch(`/api/freelancer/${id}`);
      const data = await response.json();
      setFreelancerData(data);
      // Set the token amount based on the full day price initially
      setTokenAmount(data.startingPrice);
      setOriginalTokenAmount(data.startingPrice);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching freelancer data:', error);
    }
  };

  useEffect(() => {
    if (id) {
      getFreelancer();
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
    if (name === 'selectedService') {
      setEvents([])
      const eventsdata = userData?.freelancerDetails[value]?.subcategories || [];
      setEvents(eventsdata);
      console.log("Subcategories for selected service:", eventsdata);
      setOrderData((prevData) => ({ ...prevData, eventType: value, time: '',event: '' })); 
      setTime([])
      setTokenAmount(0);
      setOriginalTokenAmount(0);
      if (userData?.freelancerDetails[value]?.price) {
      const availableTimes = [];
      if (userData?.freelancerDetails[value]?.price?.fullDayPrice !== '') {
        availableTimes.push('fullDay');
      }
      if (userData?.freelancerDetails[value]?.price?.halfDayPrice !== '') {
        availableTimes.push('halfDay');
      }
      setTime(availableTimes); // Update the time state with available options
    }
    }
    if(name==='event'){
      setOrderData((prevData) => ({ ...prevData,time: '' })); 
      setTokenAmount(0);
      setOriginalTokenAmount(0);
    }
    if (name === 'time') {
      setOrderData((prevData) => ({ ...prevData, time: value }));
    
      // Update token amount based on selected event and time
      if (orderData.event === 'Wedding') {
        if (value === 'halfDay') {
          setTokenAmount(userData?.freelancerDetails[orderData?.selectedService]?.weddingPrice?.halfDayPrice || 0);
          setOriginalTokenAmount(userData?.freelancerDetails[orderData?.selectedService]?.weddingPrice?.halfDayPrice || 0);
        } else if (value === 'fullDay') {
          setTokenAmount(userData?.freelancerDetails[orderData?.selectedService]?.weddingPrice?.fullDayPrice || 0);
          setOriginalTokenAmount(userData?.freelancerDetails[orderData?.selectedService]?.weddingPrice?.fullDayPrice || 0);
        }
      } else {
        // Non-wedding event pricing
        if (value === 'halfDay') {
          setTokenAmount(userData?.freelancerDetails[orderData?.selectedService]?.price?.halfDayPrice || 0);
          setOriginalTokenAmount(userData?.freelancerDetails[orderData?.selectedService]?.price?.halfDayPrice || 0);
        } else {
          setTokenAmount(userData?.freelancerDetails[orderData?.selectedService]?.price?.fullDayPrice || 0);
          setOriginalTokenAmount(userData?.freelancerDetails[orderData?.selectedService]?.price?.fullDayPrice || 0);
        }
      }
    }
    // Update price based on selected time (Half Day or Full Day)
  };

  // Apply coupon logic
  const applyCoupon = () => {
    if (orderData.couponCode === "TRYFIRST" && userData.booking.length === 0) {
      const discountedAmount = tokenAmount * 0.1; // 90% discount
      setTokenAmount(discountedAmount);
      setCouponApplied(true);
      setIsCouponValid(true);
      setCouponMessage('Coupon applied successfully!');
    } else {
      setTokenAmount(originalTokenAmount); // Reset token amount if invalid coupon
      setCouponApplied(true);
      setIsCouponValid(false);
      setCouponMessage('Invalid coupon code.');
    }
  };

  const getUser = async () => {
    if (localUser) {
      const response = await fetch(`/api/freelancer/${localUser.userid}`);
      const data = await response.json();
      setUserData(data);
    }
  };

  useEffect(() => {
    getUser();
  }, [localUser]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwt.decode(token);
      setLocalUser(decodedUser);
      setLoading(false);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isRefundPolicyAccepted) {
      alert('You must accept the refund policy to proceed.');
      return;
  }
    const userid = userData._id;
    const freelancerid = freelancerData._id;
    const discount= originalTokenAmount - tokenAmount

console.log('i am here')

    const orderDetails = {
      name: orderData.customerName,
      email: localUser?.email || '', // Assuming email is fetched from user token
      phone: orderData.mobileNumber,
      pinCode: orderData.pincode,
      address: orderData.address,
      city: orderData.selectedCity,
      date: orderData.eventDate,
      paidAmount: tokenAmount,
      totalAmount: originalTokenAmount,
      discount: discount,
      service: orderData.selectedService,
      event: orderData.event,
      additionalDetails: [],
      userid,
      freelancerid,
      time: orderData.time,
      isPolicyAccepted:isRefundPolicyAccepted
    };

    console.log(orderDetails)

    try {
      const response = await fetch('/api/order/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });
      console.log('i am here3')
      const result = await response.json();
      if (response.ok) {
        alert('Order placed successfully');
        // Redirect or take other action
      } else {
        alert('Error placing order: ' + result.message);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  const handleNext = () => {
    setStep(2); // Move to the next step
  };

  const handleBack = () => {
    setStep(1); // Go back to the first step
  };

  if (loading) {
    return (
      <div className='min-h-[80vh] w-[100vw]'>
        <Box sx={{ display: 'flex' }}>
          <div className='pt-80 flex items-center justify-center text-center mx-auto'>
            <CircularProgress color="inherit" size="8rem" />
          </div>
        </Box>
      </div>
    );
  }
  return (
    <div className="pt-32 min-h-[80vh] bg-gray-50">
      <div className="container mx-auto px-4 max-w-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Place Your Order
        </h2>
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Step 1 - Basic Details */}
            {step === 1 && (
              <>
                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={orderData.customerName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Full Address</label>
                  <input
                    type="text"
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your address"
                    required
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={orderData.pincode}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your area pincode"
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={orderData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>

                {/* City Dropdown */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">City</label>
                  <select
                    name="selectedCity"
                    value={orderData.selectedCity}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select your city</option>
                    <option value="Patna">Patna</option>
                    <option value="Muzzferpur">Muzzferpur</option>
                  </select>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                >
                  Next
                </button>
              </>
            )}

            {/* Step 2 - Additional Details */}
            {step === 2 && (
              <>
                {/* Event Date */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Event Date</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={orderData.eventDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                  />
                </div>

                {/* Freelancer Service Dropdown */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Service</label>
                  <select
                    name="selectedService"
                    value={orderData.selectedService}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select a service</option>
                    {Object.keys(freelancerData.freelancerDetails || {}).map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>


                {/* Event */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Event</label>
                  <select
                    name="event"
                    value={orderData.event}
                    onChange={handleInputChange} 
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select the Event</option>
                    {events?.map((event) => (
                      <option key={event} value={event}>
                        {event}
                      </option>
                    ))}
                  </select>
                </div>

                
                {/* Time Selector */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Time</label>
                  <select
                    name="time"
                    value={orderData.time}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select the time</option>
                    {time.map((time) =>(
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}

                  </select>
                </div>

                {/* Coupon Code */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Coupon Code</label>
                  <input
                    type="text"
                    name="couponCode"
                    value={orderData.couponCode}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter coupon code (if any)"
                  />
                  <button
                    type="button"
                    className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
                    onClick={applyCoupon}
                    disabled={couponApplied}
                  >
                    {couponApplied ? "Coupon Applied" : "Apply Coupon"}
                  </button>
                  {couponApplied && (
                    <p className={`mt-2 text-sm font-semibold ${isCouponValid ? 'text-green-600' : 'text-red-600'}`}>
                      {couponMessage}
                    </p>
                  )}
                </div>
                {/* Refund Policy Checkbox */}
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="refundPolicy"
                        checked={isRefundPolicyAccepted}
                        onChange={(e) => setIsRefundPolicyAccepted(e.target.checked)}
                        className="mr-2"
                        required // Optionally make it required
                    />
                    <label htmlFor="refundPolicy" className="text-sm text-gray-700">
                        I accept the <a href="https://example.com/refund-policy" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">refund policy</a>
                    </label>
                  </div>

                {/* Amount to be Paid */}
                <p className="text-lg font-bold text-gray-800">Amount to be Paid: ₹{tokenAmount}</p>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                >
                  Place Order
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={handleBack}
                  className="mt-4 w-full bg-gray-500 text-white py-4 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                >
                  Back
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  
  
  );
}

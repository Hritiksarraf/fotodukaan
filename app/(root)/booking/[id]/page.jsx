'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import jwt from "jsonwebtoken";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import EditBar from '@/components/editBar/EditBar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { format } from 'date-fns';
import { Typography } from '@mui/material'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';


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
    event: ''
  });

  const [loading, setLoading] = useState(true);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [originalTokenAmount, setOriginalTokenAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [couponMessage, setCouponMessage] = useState('');
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [events, setEvents] = useState([]);
  const [isRefundPolicyAccepted, setIsRefundPolicyAccepted] = useState(false);
  const [time, setTime] = useState([])
  const [selectedDate, setSelectedDate] = useState(null);
  const [blockedDates, setBlockedDates] = useState([]);
  useEffect(() => {
    console.log("id", id)
    getBlockedDates(id)
    // console.log(blockedDates)
  }, [])
  const getBlockedDates = async (Id) => {
    const data = await fetch(`/api/dates/${Id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const blockedDates2 = await data.json();
    console.log("f", blockedDates2)
    const blockedDates1 = []
    blockedDates2.map((ele) => blockedDates1.push(ele?.date || ""))
    console.log(blockedDates1)
    const formattedDates = blockedDates1.map(date => {
      const d = new Date(date);
      return d.toISOString().split('T')[0]; // Get only 'yyyy-mm-dd' part
    });
    console.log(formattedDates)
    setBlockedDates(formattedDates);
  }
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
      const eventsdata = freelancerData?.freelancerDetails[value]?.subcategories || [];
      setEvents(eventsdata);
      console.log("Subcategories for selected service:", eventsdata);
      setOrderData((prevData) => ({ ...prevData, eventType: value, time: '', event: '' }));
      setTime([])
      setTokenAmount(0);
      setOriginalTokenAmount(0);
      if (freelancerData?.freelancerDetails[value]?.price) {
        const availableTimes = [];
        if (freelancerData?.freelancerDetails[value]?.price?.fullDayPrice !== '') {
          availableTimes.push('fullDay');
        }
        if (freelancerData?.freelancerDetails[value]?.price?.halfDayPrice !== '') {
          availableTimes.push('halfDay');
        }
        setTime(availableTimes); // Update the time state with available options
      }
    }
    if (name === 'event') {
      setOrderData((prevData) => ({ ...prevData, time: '' }));
      setTokenAmount(0);
      setOriginalTokenAmount(0);
    }
    if (name === 'time') {
      setOrderData((prevData) => ({ ...prevData, time: value }));

      // Update token amount based on selected event and time
      if (orderData.event === 'Wedding') {
        if (value === 'halfDay') {
          setTokenAmount(freelancerData?.freelancerDetails[orderData?.selectedService]?.weddingPrice?.halfDayPrice || 0);
          setOriginalTokenAmount(freelancerData?.freelancerDetails[orderData?.selectedService]?.weddingPrice?.halfDayPrice || 0);
        } else if (value === 'fullDay') {
          setTokenAmount(freelancerData?.freelancerDetails[orderData?.selectedService]?.weddingPrice?.fullDayPrice || 0);
          setOriginalTokenAmount(freelancerData?.freelancerDetails[orderData?.selectedService]?.weddingPrice?.fullDayPrice || 0);
        }
      } else {
        // Non-wedding event pricing
        if (value === 'halfDay') {
          setTokenAmount(freelancerData?.freelancerDetails[orderData?.selectedService]?.price?.halfDayPrice || 0);
          setOriginalTokenAmount(freelancerData?.freelancerDetails[orderData?.selectedService]?.price?.halfDayPrice || 0);
        } else {
          setTokenAmount(freelancerData?.freelancerDetails[orderData?.selectedService]?.price?.fullDayPrice || 0);
          setOriginalTokenAmount(freelancerData?.freelancerDetails[orderData?.selectedService]?.price?.fullDayPrice || 0);
        }
      }
    }
    // Update price based on selected time (Half Day or Full Day)
  };

  // Apply coupon logic
  const applyCoupon = () => {
    if (orderData.couponCode === "TRYFIRST" && freelancerData.booking.length === 0) {
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

  
  const shouldDisableDate = (date) => {
    if (!date || !(date instanceof Date)) {
      return false; // If date is null or not a Date object, do not disable
    }
    const formattedDate = date.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
    // console.log("f",formattedDate)
    return blockedDates.includes(formattedDate) || date < new Date();
  };

  const handleDateChange = (newDate) => {
    if (newDate) { // Check if newDate is not null
      const formattedNewDate = newDate.toISOString().split('T')[0]; // Format selected date

      // Create a new date object for the next day
      const nextDay = new Date(newDate);
      nextDay.setDate(nextDay.getDate() + 1); // Increment day by 1
      console.log("nxt", nextDay)
      // Check if the selected next day is blocked
      if (shouldDisableDate(nextDay)) {
        setSelectedDate(null); // Clear the selected date
        alert(`The date ${nextDay.toISOString().split('T')[0]} is already booked. Please select another date.`);
        nextDay.setDate(nextDay.getDate() - 1); // Increment day by 1
        return


      } else {
        console.log("A", newDate)
        setSelectedDate(newDate);
        // console.log(`Selected date: ${formattedNewDate}`);
      }
    } else {
      setSelectedDate(null); // Handle case when date is cleared
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
    const discount = originalTokenAmount - tokenAmount

    console.log('i am here')
    console.log("s", selectedDate)
    if (selectedDate == null) {
      alert('please select a valid date ')
      return
    }
    const date = new Date(selectedDate);
    console.log("ff", date)
    if (blockedDates.includes(date)) {
      date.setDate(date.getDate() + 1);
      alert(`The date ${date.toISOString().split('T')[0]} is already booked.`)
    } else {
      date.setDate(date.getDate() + 1);
      console.log("date", date)
      const formattedDate = date.toISOString().split('T')[0];
      console.log(formattedDate)
      const orderDetails = {
        name: orderData.customerName,
        email: localUser?.email || '', // Assuming email is fetched from user token
        phone: orderData.mobileNumber,
        pinCode: orderData.pincode,
        address: orderData.address,
        city: orderData.selectedCity,
        date: formattedDate,
        paidAmount: tokenAmount,
        totalAmount: originalTokenAmount,
        discount: discount,
        service: orderData.selectedService,
        event: orderData.event,
        additionalDetails: [],
        userid,
        freelancerid,
        time: orderData.time,
        isPolicyAccepted: isRefundPolicyAccepted
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
        <div className="bg-white p-8 shadow-lg rounded-lg mb-10">
          <form onSubmit={handleSubmit} className="space-y-6 ">

            {/* Step 1 - Basic Details */}
            {step === 1 && (
              <>

                {/* Event Date */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Event Date</label>
                  
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Select a date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      shouldDisableDate={shouldDisableDate}
                      renderInput={(params) => <TextField {...params} />}
                      renderDay={(day, selectedDates, pickersDayProps) => {
                        const previousDay = new Date(day);
                        previousDay.setDate(previousDay.getDate() + 1);

                        const isDisabled = shouldDisableDate(previousDay)
                        return (
                          <Box
                            {...pickersDayProps} // Pass necessary props to Box
                            sx={{
                              width: '36px',
                              height: '36px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: isDisabled ? 'normal' : 'bold',
                              color: isDisabled ? 'red' : '#000', // Gray for disabled, black for enabled
                              margin: '2px',
                              backgroundColor: selectedDates.includes(day) ? '#cfe8fc' : 'transparent', // Highlight selected date
                              cursor: 'pointer', // Change cursor if disabled
                            }}
                            onClick={() => handleDateChange(day)} // Handle click only if not disabled
                          >
                            <Typography>{day.getDate()}</Typography>
                          </Box>
                        );
                      }}
                    />
                  </LocalizationProvider>
                </div>


                {/* Customer Name */}


                <div>
                  <label className="block text-sm font-semibold mb-2  text-gray-700">Customer Name</label>
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
                
                {/* <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  shouldDisableDate={shouldDisableDate} // Disable specific dates
                  renderDay={(day, selectedDates, pickersDayProps) => {
                  const isDisabled = shouldDisableDate(day); // Check if date is disabled

                  return (
                    <Box
                      {...pickersDayProps}
                      sx={{
                        width: '36px',    // Define a fixed width for each day
                        height: '36px',   // Define a fixed height for each day
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: isDisabled ? 'normal' : 'bold',
                        color: isDisabled ? '#b0b0b0' : '#000', // Gray for disabled, black for enabled
                        margin: '2px',    // Add a small margin to separate each day
                      }}
                    >
                      <Typography>{day.getDate()}</Typography>
                      </Box>
      );
    }}
  /> */}

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
                    {time.map((time) => (
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

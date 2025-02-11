"use client";

import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken"; // To decode the token
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OTPInput from "react-otp-input";
import { auth } from "@/app/firebase.config";
import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Image from "next/image";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [localUser, setLocalUser] = useState(null);
  const [leftAmount, setLeftAmount] = useState(0);
  const [enterOtp, setEnterOtp] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [orderId, setOrderId] = useState("");
  const router = useRouter();
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
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
        const response = await fetch("api/dashBoard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: localUser.userid }),
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
          // console.log(data);
          setLeftAmount(data.totalAmount - data.discount - data.paidAmount);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (error) {
        setError("An error occurred while fetching orders");
      }
      setLoading(false);
    }

    fetchOrders();
  }, [localUser]);


  const handleCancelOrder = async (orderId, reason) => {
    const who = 'freelancer'
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

  const handleworkstart = async () => {
    const id = orderId;
    try {
      const response = await fetch("/api/order/freelancerWorkStart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert("Work have been started");
        window.location.reload();
      } else {
        alert("Failed to cancel the order");
      }
    } catch (error) {
      alert("An error occurred while canceling the order");
    }
  };

  const handleAmountPaid = async (oid) => {
    const id = oid;
    try {
      const response = await fetch("/api/order/amountPaid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Failed to Update Try Again");
      }
    } catch (error) {
      alert("An error occurred while canceling the order");
    }
  };

  //for otp start here
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              // console.log("reCAPTCHA solved:", response);
            },
            "expired-callback": () => {
              // console.log("reCAPTCHA expired");
            },
          }
        );
        window.recaptchaVerifier.render().then((widgetId) => {
          window.recaptchaWidgetId = widgetId;
          setRecaptchaLoaded(true);
        });
      } catch (error) {
        // console.error("Error initializing reCAPTCHA:", error);
      }
    }
  }

  const sendOTP = async (e, oid, cphone) => {
    e.preventDefault();

    setOrderId(oid);
    if (!recaptchaLoaded) {
      alert("error sending otp");
    }
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = "+91" + String(cphone);
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setEnterOtp(true);
      })
      .catch((error) => {
        // console.error("Error sending OTP:", error);
      });
  };

  function OTPVerify(e) {
    e.preventDefault();
    setOtpLoading(true);
    window.confirmationResult
      .confirm(otpValue)
      .then(async (res) => {
        // console.log(res);
        handleworkstart();
      })
      .catch((err) => {
        // console.log("Invalid OTP:", err);
        setOtpLoading(false);
        alert('Inviled otp')
      });
  }

  useEffect(() => {
    onCaptchVerify();
  }, [orders]);

  if (loading) {
    return (
      <div className="min-h-[80vh] w-[100vw]">
        <Box sx={{ display: "flex" }}>
          <div className="pt-80 flex items-center justify-center text-center mx-auto  ">
            <CircularProgress color="inherit" size="8rem" />
          </div>
        </Box>
      </div>
    );
  }
  if (error) return <p className="text-red-500 pt-32">{error}</p>;

  return (
    <div className="md:pt-32 pt-20 bg-blue-100">
      <div id="recaptcha-container"></div>
      {!enterOtp && (
        <div className="min-h-screen md:p-8 p-4 bg-blue-100">
          <h1 className="text-3xl text-blue-900 font-bold text-center mb-6">
            Welcome <span className="text-yellow-600">{localUser.name}</span>{" "}
            These Are The Order You GOT!
          </h1>

          {orders.length === 0 ? (
            <p className="text-black text-5xl text-center mt-32">
              You have no orders.
            </p>
          ) : (
            <div className="">
              <div className="md:w-[55vw] mx-auto  flex flex-col flex-wrap">
                {orders.map((order) => {
                  return (
                    <section className="text-gray-600 body-font overflow-hidden my-5  bg-gradient-to-r from-white to-white rounded-2xl">
                      <div className="container lg:w-[60vw] p-4 md:p-5 py-2 mx-auto  bg-white  ">
                        <div className=" mx-auto p-5 flex flex-wrap   ">
                          {/* <img alt="ecommerce" className="lg:w-1/2 aspect-square w-full lg:h-auto h-64 object-cover object-center rounded" src={'https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg'} /> */}
                          <div className="lg:w- w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-700 tracking-widest">
                              Customer Name
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                              {order.customerName}
                            </h1>
                            <div className="flex mb-4"></div>
                            <div>
                              <h2 className="text-sm title-font text-gray-700 tracking-widest">
                                Service Address
                              </h2>
                              <h1 className="sm:text-xl text-lg font-bold">
                                {order.city} - {order.pinCode}
                              </h1>
                              <p className="leading-relaxed  ">
                                {order.address}
                              </p>
                            </div>

                            <div>
                              <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">
                                Date
                              </h2>
                              <div className='flex flex-wrap'>
                                {order.date.split(",").map((date, index) => (
                                  <p key={index} className="md:text-xl text-sm font-bold mb-1 px-2 border-r-2 ">
                                    {date}
                                  </p>
                                ))}
                              </div>

                            </div>

                            <div>
                              <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">
                                Service Type
                              </h2>
                              <h1 className="md:text-xl text-lg font-bold">
                                {order.service} - {order.event}
                              </h1>
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
                              <h2 className="text-sm title-font  text-gray-700 mt-3 tracking-widest">
                                Amount
                              </h2>

                              <h1 className="md:text-xl text-lg font-bold">
                                {" "}
                                <span className="font-bold text-lg">
                                  Amount you will get after completion of work{" "}
                                </span>{" "}
                                - ₹
                                {(
                                  order.totalAmount*0.8
                                ).toFixed(2)}

                                {order.paidOnWeb && <h1 className="font-bold text-sm text-green-600">
                                  Contact fotodukaan for payment
                                </h1> }
                              </h1>
                            </div>
                            <div>
                              <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">
                                Work Started?
                              </h2>
                              <h1 className="text-xl font-bold">
                                {" "}
                                <span className="font-normal"> </span>{" "}
                                {order.freelancerAproved ? (
                                  <div className="flex ">
                                    <span className="text-green-600">Yes</span>

                                    {/* {order.freelancerAproved &&
                                      !order.additionalDetails[0].amountPaid ? (
                                      <button
                                        onClick={() => { handleAmountPaid(order._id) }}
                                        className="flex mr-auto text-white bg-green-500 border-0 text-sm py-2 px-2 ml-20 focus:outline-none hover:bg-yellow-600 rounded"
                                      >
                                        Click if Amount Paid
                                      </button>
                                    ) : (
                                      <p className="ml-20 mr-auto">Payment is completed by coustomer</p>
                                    )} */}
                                  </div>
                                ) : (
                                  <span className="text-red-500">No</span>
                                )}
                              </h1>
                            </div>

                            {!order.freelancerCancel && !order.customerCancel && !order.freelancerAproved && (
                              <div className="flex flex-col gap-2 justify-between">
                                <button
                                  onClick={(e) =>
                                    sendOTP(e, order._id, order.customerPhone)
                                  }
                                  className="flex mt-4 mr-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded"
                                >
                                  SEND OTP To Start Work
                                </button>
                                
                              </div>
                            )}
                            {(!order.freelancerCancel && !order.customerCancel && !order.freelancerAproved) && <div className='flex justify-between'>
                                  <button
                                    onClick={() => {
                                      setCancelOrderId(order._id);
                                      setShowCancelModal(true);
                                    }}
                                    className="flex mt-4  text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded"
                                  >
                                    Cancel
                                  </button>





                                  {showCancelModal && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                      <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] md:w-[40vw]">
                                        <h2 className="text-xl font-bold mb-4">Cancel Order</h2>
                                        <p className='my-2 text-gray-400 font-bold'>Multiple Canceled Order will leed to deletion of your account</p>
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
                                  <div className="flex flex-col justify-between">
                                    <p className='text-red-500 font-bold'>Cancel Date:- {order.additionalDetails.find((detail) => detail.cancel)?.cancel
                                      ?.cancelTime || "date missing"}</p>
                                    {order.customerCancel && (
                                      <p className='text-red-500 font-bold md:text-xl text-sm'>
                                        Costumer canceled this order giving reason:-{" "}
                                        <span className='text-gray-500 text-sm'>{
                                          order.additionalDetails.find((detail) => detail.cancel)?.cancel
                                            ?.reason || "No reason provided"
                                        }</span>

                                      </p>

                                    )}
                                    {order.freelancerCancel && (
                                      <p className='text-red-500 font-bold md:text-xl text-sm'>
                                        You canceled this order giving reason:-{" "}
                                        <span className='text-gray-500 text-sm'>{
                                          order.additionalDetails.find((detail) => detail.cancel)?.cancel
                                            ?.reason || "No reason provided"
                                        }</span>
                                      </p>
                                    )}
                                    
                                  </div>
                                )}
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {enterOtp && (
        <section className="bg-gradient-to-b from-white to-blue-200 h-[100vh] w-[100vw] flex flex-col gap-8 justify-center items-center">
          <div className="flex flex-col gap-8 justify-center items-center ">
            <Link
              href="/"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <Image
                className="mr-2"
                src="/assets/logo-light.png"
                width={150}
                height={50}
                alt="fotodukaan logo"
              />
            </Link>

            <div>
              <h1 className="text-black text-3xl md:text-5xl">
                Please Verify Your OTP
              </h1>
            </div>
            <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
              <BsFillShieldLockFill className="" size={30} />
            </div>
            <label
              htmlFor="otp"
              className="font-bold text-xl  text-blue-600 text-center"
            >
              Enter your OTP
            </label>
            <div className="text-5xl ">
              <OTPInput
                value={otpValue}
                onChange={setOtpValue}
                numInputs={6}
                renderSeparator={<span className="m-1"></span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <button
              onClick={OTPVerify}
              className="bg-emerald-600 px-32 flex gap-1 items-center justify-center py-2.5 text-white rounded"
            >
              {otpLoading && (
                <CgSpinner size={20} className="mt-1 animate-spin" />
              )}
              <span>Verify OTP</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default OrdersPage;

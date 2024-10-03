'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
// import $ from 'jquery';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { auth } from '@/app/firebase.config';
import { RecaptchaVerifier } from 'firebase/auth';
import { signInWithPhoneNumber } from 'firebase/auth';



export default function Pages() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpStatus, setOtpStatus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // const [recapt, setrecapt] = useState(second)

  // Function to send OTP using jQuery
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  // const [Recap, setRecap] = useState(second)

//   useEffect(() => {
//     const recaptchaVerifier = new RecaptchaVerifier(
//       auth,
//       'recaptcha-container',
//       {
// size: 'invisible',
//       }
//     )

  
//     return () => {
//       second
//     }
//   }, [auth])
  

  function onCaptchVerify() {
    // Ensure RecaptchaVerifier is initialized correctly
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',  // Correct container ID here
          {
            size: 'normal',
            callback: (response) => {
              console.log('reCAPTCHA solved:', response);
            },
            'expired-callback': () => {
              console.log('reCAPTCHA expired');
            },
          } // Correctly passing the Firebase Auth instance
        );
        
        window.recaptchaVerifier.render().then((widgetId) => {
          window.recaptchaWidgetId = widgetId;
          console.log('reCAPTCHA initialized with widget ID:', widgetId);
          setRecaptchaLoaded(true);  // Mark reCAPTCHA as loaded
        });
      } catch (error) {
        console.error('Error initializing reCAPTCHA:', error);
      }
    }
  }

  function onSignup(e) {
    e.preventDefault();
    console.log('onsignup called');
    
    if (!recaptchaLoaded) {
      console.error('Recaptcha verifier is not loaded');
      return;
    }

    // onCaptchVerify();  // Ensure reCAPTCHA is verified before phone sign-in
    
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = '+91' + phone;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log('amost there')
        window.confirmationResult = confirmationResult;
        console.log('OTP sent');
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
      });
  }

  useEffect(() => {
    onCaptchVerify();  // Initialize recaptcha on component mount
  }, []);
  

  // const handleSignUp = async (e) => {
  //   e.preventDefault();

  //   // Validation logic
  //   let formErrors = {};

  //   // Name validation: minimum length 3
  //   if (name.length < 3) {
  //     formErrors.name = 'Name must be at least 3 characters long.';
  //   }

  //   // Phone validation: must be 10 digits
  //   if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
  //     formErrors.phone = 'Phone number must be 10 digits.';
  //   }

  //   // Password validation: at least 8 characters and 1 number
  //   if (password.length < 8 || !/\d/.test(password)) {
  //     formErrors.password = 'Password must be at least 8 characters long and contain at least one number.';
  //   }

  //   // If there are errors, update the state
  //   if (Object.keys(formErrors).length > 0) {
  //     setErrors(formErrors);
  //   } else {
  //     setErrors({})

  //   const data = { name,email,phone,password };

  //   try {
  //     let res = await fetch('/api/sign-up', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //     });

  //     let response = await res.json();
  //     console.log(response);
      
  //     toast.success('Signup Successful', {
  //       position: 'top-left',
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: 'light',
  //     });
      

  //     // Redirect to another page if needed
  //     router.push('/sign-in');
      
  //   } catch (error) {
  //     toast.error('Signup Failed', {
  //       position: 'top-left',
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: 'light',
  //     });
  //   }
  // }
  // };

  return (
    <div>
      <section className="bg-gradient-to-b from-white to-blue-200 h-[100vh]">
      <div id='recaptcha-container'></div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <Image
              className="mr-2"
              src="/assets/logo-light.png"
              width={150}
              height={50}
              alt="fotodukaan logo"
            />
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                Sign up for an account
              </h1>
              <form className="space-y-4 md:space-y-6" >
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Mani"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    Your Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="7061652485"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <button
                  type="submit"
                  onClick={onSignup}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-black">
                  Already have an account?{' '}
                  <Link href="/log-in" className="font-medium text-primary-600 hover:underline dark:text-blue-500">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <ToastContainer/> */}
    </div>
  );
}

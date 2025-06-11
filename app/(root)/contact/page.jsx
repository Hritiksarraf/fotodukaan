'use client'

import React, { useRef } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import emailjs from '@emailjs/browser';

export default function page() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_d7664kk', 'template_5qmppy8', form.current, {
        publicKey: 'h8XZ93qdMng-duPB2',
      })
      .then(
        () => {
          alert('Message sent successfully');
        },
        (error) => {
          alert('Message failed to send');
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <div className="pt-20 bg-gradient-to-tr from-white to-blue-100 min-h-screen">
      {/* Hero section for large screens */}
      <div className='hidden md:block h-[80vh] bg-[url("/assets/contact.jpg")] bg-cover bg-center'>
        <div className="w-full h-full flex flex-col justify-center pl-16">
          <h1 className="text-yellow-500 text-6xl font-bold">Need Help!</h1>
          <h1 className="text-white text-6xl font-bold">Contact Us</h1>
          <h1 className="text-white text-6xl font-bold mb-8">Call Or Message Us</h1>
          <p className="text-black text-2xl">Scroll down for details</p>
        </div>
      </div>

      {/* Redesigned Mobile Contact Info Section */}
      <section className='py-10 px-6 sm:px-10'>
        <h2 className='text-center text-3xl font-bold text-blue-700 mb-10'>Get in touch with us</h2>
        <div className="flex flex-col gap-6 max-w-sm mx-auto">
          <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
            <div className="bg-blue-100 p-2 rounded-full">
              <PermPhoneMsgIcon className='text-blue-600 text-3xl' />
            </div>
            <div>
              <p className="text-blue-700 font-semibold text-lg">Phone</p>
              <p className='text-black text-sm'>+91 72588 66055</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
            <div className="bg-blue-100 p-2 rounded-full">
              <EmailIcon className='text-blue-600 text-3xl' />
            </div>
            <div>
              <p className="text-blue-700 font-semibold text-lg">Email</p>
              <p className='text-black text-sm break-all'>info@fotodukaan.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
            <div className="bg-blue-100 p-2 rounded-full">
              <LocationOnIcon className='text-blue-600 text-3xl' />
            </div>
            <div>
              <p className="text-blue-700 font-semibold text-lg">Location</p>
              <p className='text-black text-sm'>154, 1st Floor, Maharaja Kameshwar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 pb-20">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-2xl font-bold text-center text-blue-700 mb-4">Have a question?</h3>
          <p className="text-center text-gray-600 mb-6">Please do not hesitate to send us a message</p>

          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="w-full bg-blue-100 border border-yellow-500 text-black rounded-md p-3 mb-4"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone No"
            required
            pattern="^[0-9]{10}$"
            inputMode="numeric"
            maxLength={10}
            className="w-full bg-blue-100 border border-yellow-500 text-black rounded-md p-3 mb-4"
          />

          <textarea
            name="message"
            placeholder="How can we help you"
            required
            className="w-full bg-blue-100 border border-yellow-500 text-black rounded-md p-3 h-32 mb-4"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          >
            SEND MESSAGE
          </button>
        </form>
      </section>
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
    { name: 'Photography', subcategories: ['Wedding', 'Corporate', 'Toure & Travel', 'Pre wedding', 'Maternity', 'Birthday', 'Anniversary', 'Engagement', 'Portfolio', 'Food', 'New Born Baby', 'Fashion', 'Event', 'Brand Promotion', 'Other'] },
    { name: 'Videography', subcategories: ['Wedding', 'Toure & Travel', 'Pre wedding', 'Birthday', 'Anniversary', 'Engagement', 'Event', 'New Born Baby', 'Corporate', 'Brand Promotion', 'Fashion', 'Other'] },
    { name: 'Drone', subcategories: ['Wedding', 'Corporate', 'Event', 'Other'] },
    { name: 'Video Editing', subcategories: ['Music Video & Album', 'Wedding', 'Event', 'Pre-Wedding', 'Film & Web Series', 'Youtube Vlogs', 'Reels', 'Content & Brand Promotion Videos', 'Other'] },
    { name: 'Crane', subcategories: ['Wedding', 'Event', 'Other'] }
];

export default function Page() {
    const [selectedCategories, setSelectedCategories] = useState({});

    const handleCategoryClick = (category) => {
        setSelectedCategories(prevState => {
            // If the category is already selected, remove it
            if (prevState[category]) {
                const updatedCategories = { ...prevState };
                delete updatedCategories[category];  // Remove category from state
                return updatedCategories;
            }

            // Otherwise, add the category
            return {
                ...prevState,
                [category]: { subcategories: [], cameraDetails: {} }
            };
        });
    };


    const handleSubcategoryClick = (category, subcategory) => {
        setSelectedCategories(prevState => {
            const categoryData = prevState[category] || { subcategories: [], cameraDetails: {} };
            const updatedSubcategories = categoryData.subcategories.includes(subcategory)
                ? categoryData.subcategories.filter(sub => sub !== subcategory)
                : [...categoryData.subcategories, subcategory];

            return {
                ...prevState,
                [category]: { ...categoryData, subcategories: updatedSubcategories }
            };
        });
    };

    const handleCameraDetailsChange = (category, field, value) => {
        setSelectedCategories(prevState => {
            const categoryData = prevState[category] || { subcategories: [], cameraDetails: {} };
            const updatedCameraDetails = { ...categoryData.cameraDetails, [field]: value };

            return {
                ...prevState,
                [category]: { ...categoryData, cameraDetails: updatedCameraDetails }
            };
        });
        console.log(selectedCategories)
    };

    const [steps, setStep] = useState({
        stepsItems: ["Details", "Service", "Profile"],
        currentStep: 1
    });

    return (
        <div>
            <div className="max-w-2xl mx-auto mt-10 p-4   shadow-2xl ">
                <ul aria-label="Steps" className="items-center text-gray-600 font-medium flex">
                    {steps.stepsItems.map((item, idx) => (
                        <li aria-current={steps.currentStep === idx + 1 ? "step" : false} key={idx} className="flex-1 last:flex-none flex gap-x-2 md:items-center">
                            <div className="flex items-center flex-col gap-x-2">
                                <div className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${steps.currentStep > idx + 1 ? "bg-indigo-600 border-indigo-600" : "" || steps.currentStep === idx + 1 ? "border-indigo-600" : ""}`}>
                                    <span className={`${steps.currentStep > idx + 1 ? "hidden" : "" || steps.currentStep === idx + 1 ? "text-indigo-600" : ""}`}>
                                        {idx + 1}
                                    </span>
                                    {steps.currentStep > idx + 1 && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    )}
                                </div>
                                
                            </div>
                            <div className="h-8 flex items-center md:h-auto">
                                <h3 className={`text-sm ${steps.currentStep === idx + 1 ? "text-indigo-600" : ""}`}>
                                    {item}
                                </h3>
                            </div>
                            <hr className={`hidden mr-2 w-full md:border  md:block ${idx + 1 === steps.stepsItems.length ? "hidden" : "" || steps.currentStep > idx + 1 ? "md:border-indigo-600" : ""}`} />
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                {steps.currentStep === 1 && (
                    <section>
                        {/* this is details section */}
                        <section className="bg-gradient-to-b from-white to-yellow-200 h-[100vh]">
                            <div className="flex flex-col items-center  h-[80vh] px-6 py-2 mx-auto md:h-screen lg:py-0">
                                <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                    <Image className="mr-2" src="/assets/logo-light.png" width={150} height={50} alt="fotodukaan logo" />
                                </Link>
                                <div className="w-full rounded-lg shadow dark:border dark:border-gray-700 md:mt-0 text-black sm:max-w-md xl:p-0 bg-gradient-to-r from-white to-white">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                                            Sign-up as a freelancer and start earning
                                        </h1>
                                        <form className="space-y-4 md:space-y-6" action="#">
                                            <div>
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your Name</label>
                                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hritik Sarraf" required />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
                                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-black dark:text-black">Your Phone Number</label>
                                                <input type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="7061652485" required />
                                            </div>
                                            <div>
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-black">Password</label>
                                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                            </div>

                                            <button onClick={() => setStep(prevState => ({ ...prevState, currentStep: 2 }))} type="submit" className="w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>
                                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                Already have an account? <Link href="/auth/login" className="font-medium text-blue-400 hover:underline">Sign in</Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                )}
                {steps.currentStep === 2 && (
                    
                    <section className="bg-gradient-to-b md:min-h-[100vh] min-h-[100vh]  from-white to-yellow-200 ">
                       <div className="flex flex-col items-center    px-6  mx-auto ">
                                <Link href="/" className="flex items-center  text-2xl font-semibold text-gray-900 dark:text-white">
                                    <Image className="mr-2" src="/assets/logo-light.png" width={150} height={50} alt="fotodukaan logo" />
                                </Link>
                                </div>
                        <div className="flex flex-col items-center my-auto justify-center shadow-2xl bg-white  border-2 w-[90vw] md:w-[30vw]  px-6 py-8 mx-auto  lg:py-0">
                        
                            <h1 className="text-xl font-bold mt-5 md:mt-15 leading-tight tracking-tight text-blue-500 md:text-3xl ">
                                Step-2
                            </h1>
                            <h1 className="text-xl font-bold mt-4 mb-10 leading-tight tracking-tight text-black md:text-4xl ">
                                Select Your Services
                            </h1>
                            <div className="flex flex-col bg-white items-start justify-start w-full ">
                                {categories.map((category) => (
                                    <div key={category.name} className="w-full">
                                        <button onClick={() => handleCategoryClick(category.name)} className={`flex gap-5 shadow-md justify-center items-center w-full md:w-[27vw] p-4  text-left border-b rounded-lg my-2 ${selectedCategories[category.name] ? 'bg-blue-600 text-white' : 'bg-yellow-400'}`}>
                                            <span>{category.name}</span>
                                            {/* <span>{selectedCategories[category.name]?.subcategories.length || 0}</span> */}
                                        </button>
                                        {selectedCategories[category.name] && (
                                            <div className="p-1 ">
                                                <div className=" flex flex-wrap">
                                                    {category.subcategories.map((subcategory) => (

                                                        <div
                                                            key={subcategory}
                                                            className={`flex items-center w-[100%] md:[45%]  m-2 cursor-pointer p-2  rounded-md transition-colors duration-200 ${selectedCategories[category.name]?.subcategories?.includes(subcategory) ? 'bg-green-500' : 'bg-yellow-400'}`}
                                                            onClick={() => handleSubcategoryClick(category.name, subcategory)}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedCategories[category.name]?.subcategories?.includes(subcategory) || false}  // Ensure subcategories exist and includes is called on an array
                                                                onChange={(e) => {
                                                                    e.stopPropagation(); // Prevents the div's onClick event from firing when clicking directly on the checkbox
                                                                    handleSubcategoryClick(category.name, subcategory);
                                                                }}
                                                                onClick={(e) => e.stopPropagation()} // Prevents the div click from triggering when clicking the checkbox
                                                                className={`  m-1 w-6 h-6 appearance-none border-2 border-gray-300 bg-white rounded-md checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-200`}
                                                            />
                                                            <label className="text-gray-700 ml-2 text-sm font-medium hover:text-blue-500 cursor-pointer transition-colors duration-200">
                                                                {subcategory}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Camera Details Section */}
                                                {category.name == "Photography" && (
                                                    <div className="mt-2 mb-5 ">
                                                        <div className='block w-[100%] h-[100%]'>
                                                            <h2 className="text-3xl text-center my-5 font-semibold">Camera Details</h2>

                                                            <label htmlFor="brand" className="block mb-2">Camera Brand</label>
                                                            <select
                                                                id="brand"
                                                                value={selectedCategories[category.name]?.cameraDetails?.brand || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'brand', e.target.value)}
                                                                className="block w-full bg-blue-100 p-2 border rounded"
                                                            >
                                                                <option value="" disabled>Select Camera Brand</option>
                                                                <option value="Nikon">Nikon</option>
                                                                <option value="Canon">Canon</option>
                                                                <option value="GoPro">GoPro</option>
                                                                <option value="Sony">Sony</option>
                                                                <option value="Fujifilm">Fujifilm</option>
                                                                <option value="Panasonic">Panasonic</option>
                                                                <option value="Leica">Leica</option>
                                                                <option value="Hasselblad">Hasselblad</option>
                                                                <option value="Red">Red</option>
                                                                <option value="Arri">Arri</option>
                                                            </select>

                                                            <label htmlFor="model" className="block mb-2 mt-4">Camera Model</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Camera Model"
                                                                value={selectedCategories[category.name]?.cameraDetails?.model || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'model', e.target.value)}
                                                                className="block bg-blue-100 w-full p-2 border rounded"
                                                            />

                                                            <label htmlFor="specs" className="block mb-2 mt-4">Camera Lense</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Camera Lense"
                                                                value={selectedCategories[category.name]?.cameraDetails?.lanse || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'lanse', e.target.value)}
                                                                className="block bg-blue-100 w-full p-2 border rounded mt-2"
                                                            />
                                                            <label htmlFor="Gimble" className="block mb-2 mt-4">Gimble</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Camera Lense"
                                                                value={selectedCategories[category.name]?.cameraDetails?.gimble || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'gimble', e.target.value)}
                                                                className="block w-full bg-blue-100 p-2 border rounded mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                )}


                                                {category.name == "Videography" && (
                                                    <div className="mt-2 mb-5 mr-20">
                                                        <div className='block w-[100%] h-[100%]'>
                                                            <h2 className="text-3xl text-center my-5 font-semibold">Camera Details</h2>

                                                            <label htmlFor="brand" className="block mb-2">Camera Brand</label>
                                                            <select
                                                                id="brand"
                                                                value={selectedCategories[category.name]?.cameraDetails?.brand || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'brand', e.target.value)}
                                                                className="block w-full bg-blue-100 p-2 border rounded"
                                                            >
                                                                <option value="" disabled>Select Camera Brand</option>
                                                                <option value="Nikon">Nikon</option>
                                                                <option value="Canon">Canon</option>
                                                                <option value="GoPro">GoPro</option>
                                                                <option value="Sony">Sony</option>
                                                                <option value="Fujifilm">Fujifilm</option>
                                                                <option value="Panasonic">Panasonic</option>
                                                                <option value="Leica">Leica</option>
                                                                <option value="Hasselblad">Hasselblad</option>
                                                                <option value="Red">Red</option>
                                                                <option value="Arri">Arri</option>
                                                            </select>

                                                            <label htmlFor="model" className="block mb-2 mt-4">Camera Model</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Camera Model"
                                                                value={selectedCategories[category.name]?.cameraDetails?.model || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'model', e.target.value)}
                                                                className="block bg-blue-100 w-full p-2 border rounded"
                                                            />

                                                            <label htmlFor="specs" className="block mb-2 mt-4">Camera Lense</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Camera Lense"
                                                                value={selectedCategories[category.name]?.cameraDetails?.lanse || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'lanse', e.target.value)}
                                                                className="block bg-blue-100 w-full p-2 border rounded mt-2"
                                                            />
                                                            <label htmlFor="Gimble" className="block mb-2 mt-4">Gimble</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Camera Lense"
                                                                value={selectedCategories[category.name]?.cameraDetails?.gimble || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'gimble', e.target.value)}
                                                                className="block w-full bg-blue-100 p-2 border rounded mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {category.name == "Drone" && (
                                                    <div className="mt-2 mb-5 mr-20">
                                                        <div className='block w-[100%] h-[100%]'>
                                                            <h2 className="text-3xl text-center my-5 font-semibold">Drone Details</h2>

                                                            <label htmlFor="specs" className="block mb-2 mt-4">Drone Brand</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Camera Lense"
                                                                value={selectedCategories[category.name]?.cameraDetails?.brand || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'brand', e.target.value)}
                                                                className="block bg-blue-100 w-full p-2 border rounded mt-2"
                                                            />

                                                            <label htmlFor="model" className="block mb-2 mt-4">Drone Model</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Camera Model"
                                                                value={selectedCategories[category.name]?.cameraDetails?.model || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'model', e.target.value)}
                                                                className="block bg-blue-100 w-full p-2 border rounded"
                                                            />


                                                        </div>
                                                    </div>
                                                )}

                                                {category.name == "Video Editing" && (
                                                    <div className="mt-2 mb-5 mr-20">
                                                        <div className='block w-[100%] h-[100%]'>
                                                            <h2 className="text-3xl text-center my-5 font-semibold">Video Editing Software</h2>

                                                            <label htmlFor="brand" className="block mb-2">Software 1</label>
                                                            <select
                                                                id="brand"
                                                                value={selectedCategories[category.name]?.cameraDetails?.Software1 || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'Software1', e.target.value)}
                                                                className="block w-full bg-blue-100 p-2 border rounded"
                                                            >
                                                                <option value="" disabled>Select Software-1</option>
                                                                <option value="Adobe After Effects">Adobe After Effects</option>
                                                                <option value="Adobe Premiere Pro">Adobe Premiere Pro</option>
                                                                <option value="GoPro">Finel Cut Pro</option>
                                                                <option value="Davinci Resolve">Davinci Resolve</option>
                                                                <option value="CapCut">CapCut</option>
                                                                <option value="Filmora">Filmora</option>
                                                                <option value="Other Software">Other Software</option>

                                                            </select>

                                                            <label htmlFor="brand" className="block mb-2">Software 2</label>
                                                            <select
                                                                id="brand"
                                                                value={selectedCategories[category.name]?.cameraDetails?.Software2 || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'Software2', e.target.value)}
                                                                className="block w-full bg-blue-100 p-2 border rounded"
                                                            >
                                                                <option value="" disabled>Select Software-2</option>
                                                                <option value="Adobe After Effects">Adobe After Effects</option>
                                                                <option value="Adobe Premiere Pro">Adobe Premiere Pro</option>
                                                                <option value="GoPro">Finel Cut Pro</option>
                                                                <option value="Davinci Resolve">Davinci Resolve</option>
                                                                <option value="CapCut">CapCut</option>
                                                                <option value="Filmora">Filmora</option>
                                                                <option value="Other Software">Other Software</option>

                                                            </select>


                                                        </div>
                                                    </div>
                                                )}




                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-between w-[100%] md:mb-20'>
                                <button onClick={() => setStep(prevState => ({ ...prevState, currentStep: 1 }))} className="mt-4  md:w-[15%]  text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">back</button>
                                <button onClick={() => setStep(prevState => ({ ...prevState, currentStep: 3 }))} className="mt-4  md:w-[15%]  text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>

                            </div>
                        </div>
                    </section>
                )}

                {steps.currentStep === 3 && (
                   <section>
                   {/* this is profile section */}
                   <section className="bg-gradient-to-b from-white py-5 to-yellow-200">
                       <div className="flex flex-col items-center my-auto justify-center px-6 py-8 mx-auto lg:py-0">
                           <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                               <Image className="mr-2" src="/assets/logo-light.png" width={150} height={50} alt="fotodukaan logo" />
                           </Link>
                           <div className="w-full rounded-lg shadow dark:border dark:border-gray-700 md:mt-0 text-black sm:max-w-md xl:p-0 bg-gradient-to-r from-white to-white">
                               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                   <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                                       Set Up Your Profile
                                   </h1>
                                   <form className="space-y-4 md:space-y-6" action="#">
                                       {/* Profile Photo */}
                                       <div>
                                           <label htmlFor="profile-photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Profile Photo</label>
                                           <input type="file" accept="image/*" name="profile-photo" id="profile-photo" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                       </div>
                                       
                                       {/* City */}
                                       <div>
                                           <label htmlFor="city" className="block mb-2 text-sm font-medium text-black dark:text-black">City</label>
                                           <select name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                               <option value="patna">Patna</option>
                                               <option value="muzaffarpur">Muzaffarpur</option>
                                           </select>
                                       </div>
                       
                                       {/* Full Address */}
                                       <div>
                                           <label htmlFor="address" className="block mb-2 text-sm font-medium text-black dark:text-black">Full Address</label>
                                           <input type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your full address" required />
                                       </div>
               
                                       {/* Starting Price */}
                                       <div>
                                           <label htmlFor="starting-price" className="block mb-2 text-sm font-medium text-black dark:text-black">Starting Price</label>
                                           <input type="number" name="starting-price" id="starting-price" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter starting price" required />
                                       </div>
               
                                       {/* Half Day Price */}
                                       <div>
                                           <label htmlFor="half-day-price" className="block mb-2 text-sm font-medium text-black dark:text-black">Half Day Price</label>
                                           <input type="number" name="half-day-price" id="half-day-price" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter half-day price" required />
                                       </div>
               
                                       {/* Charge */}
                                       <div>
                                           <label htmlFor="charge" className="block mb-2 text-sm font-medium text-black dark:text-black">Charge</label>
                                           <input type="number" name="charge" id="charge" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter charge" required />
                                       </div>
               
                                       {/* Extra Hour Price */}
                                       <div>
                                           <label htmlFor="extra-hour-price" className="block mb-2 text-sm font-medium text-black dark:text-black">Extra Hour Price</label>
                                           <input type="number" name="extra-hour-price" id="extra-hour-price" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter extra hour price" required />
                                       </div>
               
                                       {/* About Yourself */}
                                       <div>
                                           <label htmlFor="about-yourself" className="block mb-2 text-sm font-medium text-black dark:text-black">About Yourself</label>
                                           <textarea name="about-yourself" id="about-yourself" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a few sentences about yourself" rows="4" required></textarea>
                                       </div>
               
                                       {/* Buttons */}
                                       <div className='flex gap-4'>
                                           <button onClick={() => setStep(prevState => ({ ...prevState, currentStep: 2 }))} type="submit" className="w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</button>
                                           <a onClick={() => setStep(prevState => ({ ...prevState, currentStep: 4 }))} href='/' type="submit" className="w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</a>
                                       </div>
                                   </form>
                               </div>
                           </div>
                       </div>
                   </section>
               </section>
               
                
                
                )}



                {/* {steps.currentStep === 3 && (
                    <section className="bg-gradient-to-b from-white to-yellow-200 h-[100vh]">
                        <div className="flex flex-col items-center my-auto justify-center h-[80vh] px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                                Confirm Your Information
                            </h1>
                            <div className="flex flex-col items-start justify-start w-full max-w-md">
                                {Object.entries(selectedCategories).map(([categoryName, details]) => (
                                    <div key={categoryName} className="border-b pb-2 mb-2">
                                        <h2 className="font-semibold">{categoryName}</h2>
                                        <p>Subcategories: {details.subcategories.join(', ')}</p>
                                        <p>Camera Model: {details.cameraDetails.model}</p>
                                        <p>Camera Specs: {details.cameraDetails.specs}</p>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setStep(prevState => ({ ...prevState, currentStep: 4 }))} className="mt-4 w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            <button onClick={() => setStep(prevState => ({ ...prevState, currentStep: 2 }))} className="mt-4 w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">back</button>
                        </div>
                    </section>
                )}
                {steps.currentStep === 4 && (
                    <section className="bg-gradient-to-b from-white to-yellow-200 h-[100vh]">
                        <div className="flex flex-col items-center my-auto justify-center h-[80vh] px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                                Registration Complete
                            </h1>
                            <p className="mt-4">Thank you for registering!</p>
                            <Link href="/" className="mt-4 w-full text-center text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go to Home</Link>
                        </div>
                    </section>
                )} */}
            </div>
        </div>
    );
}

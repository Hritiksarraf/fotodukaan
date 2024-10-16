'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import jwt from "jsonwebtoken";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import EditBar from '@/components/editBar/EditBar';
import Link from 'next/link';

import Image from 'next/image';



const categories = [
    { name: 'Photography', subcategories: ['Wedding', 'Corporate', 'Toure & Travel', 'Pre wedding', 'Maternity', 'Birthday', 'Anniversary', 'Engagement', 'Portfolio', 'Food', 'New Born Baby', 'Fashion', 'Event', 'Brand Promotion', 'Other'] },
    { name: 'Videography', subcategories: ['Wedding', 'Toure & Travel', 'Pre wedding', 'Birthday', 'Anniversary', 'Engagement', 'Event', 'New Born Baby', 'Corporate', 'Brand Promotion', 'Fashion', 'Other'] },
    { name: 'Drone', subcategories: ['Wedding', 'Corporate', 'Event', 'Other'] },
    { name: 'Video Editing', subcategories: ['Music Video & Album', 'Wedding', 'Event', 'Pre-Wedding', 'Film & Web Series', 'Youtube Vlogs', 'Reels', 'Content & Brand Promotion Videos', 'Other'] },
    { name: 'Crane', subcategories: ['Wedding', 'Event', 'Other'] }
];

export default function page() {

    const [loading, setLoading] = useState(true);
    const [localUser, setLocalUser] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState({});
    const [freelancerData, setFreelancerData] = useState({
    });
    const [uploading, setUploading] = useState(false);


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

     const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = Object.values(selectedCategories).some(
            (category) => category.subcategories && category.subcategories.length > 0
        );
        if (!isValid) {
            alert("Please select at least one category and subcategory.");
            return
        }

        setUploading(true);
        const id=freelancerData._id

        // Post the updated freelancer profile data
        const response = await fetch('/api/edit/service', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                selectedCategories,
                id
            }),
        });
        const data = await response.json();
        if (response.ok) {
            alert("Profile updated successfully");
            setFreelancerData(data.freelancer.freelancerDetails); // Clear the selected file after successful upload
        } else {
            alert("Failed to update profile");
        }

        setUploading(false);
    };




    const getUser = async () => {
        if(localUser){
        const response = await fetch(`/api/freelancer/${localUser.userid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data)
        setSelectedCategories(data.freelancerDetails)
        setFreelancerData(data);
        setLoading(false)
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

        }
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
    


  return (
    <div className='min-h-[80vh] pt-32'>
        <div>
        <EditBar/>
        </div>
        <div>
        <section className="bg-gradient-to-b md:min-h-[100vh] min-h-[100vh] mt-10  from-white to-yellow-200 ">
                        <div className="flex flex-col items-center    px-6  mx-auto ">
                            
                        </div>
                        <div className="flex flex-col items-center my-auto justify-center shadow-2xl bg-white  border-2 w-[90vw] md:w-[30vw]  px-6 py-8 mx-auto  lg:py-0">

                           
                            <h1 className="text-xl font-bold mt-4 mb-10 leading-tight tracking-tight text-black md:text-4xl ">
                                Update Your Services
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
                            <button
                    onClick={handleSubmit}
                    disabled={uploading}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg"
                >
                    {uploading ? "Updating..." : "Update Profile"}
                </button>
                            </div>
                        </div>
                    </section>
        </div>
    </div>
  )
}

'use client'
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';

const cityArray = [
  "Mumbai, Maharashtra",
  "Delhi, National Capital Territory",
  "Bangalore (Bengaluru), Karnataka",
  "Hyderabad, Telangana",
  "Ahmedabad, Gujarat",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
  "Jaipur, Rajasthan",
  "Surat, Gujarat",
  "Lucknow, Uttar Pradesh",
  "Kanpur, Uttar Pradesh",
  "Nagpur, Maharashtra",
  "Indore, Madhya Pradesh",
  "Patna, Bihar",
  "Bhopal, Madhya Pradesh",
  "Vadodara, Gujarat",
  "Ludhiana, Punjab",
  "Agra, Uttar Pradesh",
  "Nashik, Maharashtra",
  "Coimbatore, Tamil Nadu",
  "Kochi (Cochin), Kerala",
  "Visakhapatnam, Andhra Pradesh",
  "Ghaziabad, Uttar Pradesh",
  "Thiruvananthapuram, Kerala",
  "Varanasi, Uttar Pradesh",
  "Rajkot, Gujarat",
  "Meerut, Uttar Pradesh",
  "Faridabad, Haryana",
  "Amritsar, Punjab",
  "Jodhpur, Rajasthan",
  "Madurai, Tamil Nadu",
  "Raipur, Chhattisgarh",
  "Aurangabad, Maharashtra",
  "Gwalior, Madhya Pradesh",
  "Ranchi, Jharkhand",
  "Guwahati, Assam",
  "Bhubaneswar, Odisha",
  "Mysore, Karnataka",
  "Jabalpur, Madhya Pradesh",
  "Goa, Maharashtra",
  "Muzaffarpur, Bihar"
];


const categories = [
  {
  name: 'Traditional Photography',
  subcategories: ['Wedding', 'Corporate', 'Toure & Travel', 'Pre wedding', 'Maternity', 'Birthday', 'Anniversary', 'Engagement', 'Portfolio', 'Food', 'New Born Baby', 'Fashion', 'Event', 'Brand Promotion', 'Other'],
  pricing: {
      fullDayPrice: true,
      halfDayPrice: true,
      extraHourPrice: true,
  },
  weddingPrice: {
      fullDayPrice: true,
      halfDayPrice: true,
      extraHourPrice: true,
      },
  },
  {
  name: 'Candid Photography',
  subcategories: ['Wedding', 'Corporate', 'Toure & Travel', 'Pre wedding', 'Maternity', 'Birthday', 'Anniversary', 'Engagement', 'Portfolio', 'Food', 'New Born Baby', 'Fashion', 'Event', 'Brand Promotion', 'Other'],
  pricing: {
      fullDayPrice: true,
      halfDayPrice: true,
      extraHourPrice: true,
  },
  weddingPrice: {
      fullDayPrice: true,
      halfDayPrice: true,
      extraHourPrice: true,
      },
  },
  {
  name: 'Traditional Videography',
  subcategories: ['Wedding', 'Toure & Travel', 'Pre wedding', 'Birthday', 'Anniversary', 'Engagement', 'Event', 'New Born Baby', 'Corporate', 'Brand Promotion', 'Fashion', 'Other'],
  pricing: {
      fullDayPrice: true,
      halfDayPrice: true,
      extraHourPrice: true,
  },
  weddingPrice: {
      fullDayPrice: true,
      halfDayPrice: true,
      extraHourPrice: true,
      },
  },
  {
  name: 'Cinematography',
  subcategories: ['Wedding', 'Corporate', 'Toure & Travel', 'Pre wedding', 'Maternity', 'Birthday', 'Anniversary', 'Engagement', 'Portfolio', 'Food', 'New Born Baby', 'Fashion', 'Event', 'Brand Promotion', 'Other'],
  pricing: {
      fullDayPrice: true,
      halfDayPrice: true,
      extraHourPrice: true,
  },
  weddingPrice: {
      fullDayPrice: true,
      halfDayPrice: true,
      extraHourPrice: true,
      },
  },
  {
  name: 'Drone',
  subcategories: ['Wedding', 'Corporate', 'Event', 'Other'],
  pricing: {
      fullDayPrice: true,
  },
  weddingPrice: {
      fullDayPrice: true,
  },
  },
  {
  name: 'Crane',
  subcategories: [ 'Events'],
  pricing: {
      fullDayPrice: true,
  },
  },
  {
  name: 'LED wall',
  subcategories: ['Events'],
  ledDetails: { size: '' },
  pricing: {
      fullDayPrice: true,
  },
  },
  {
  name: 'LED TV',
  subcategories: ['Events'],
  ledDetails: { size: '' },
  pricing: {
      fullDayPrice: true,
  },
  },
];


export default function SearchBar() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [place, setPlace] = useState("");
  const isSearchDisabled = !category;


  
  const selectedCategory = categories.find(cat => cat.name === category);
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  const uniqueSortedCities = [...new Set(cityArray.map(city => city.split(",")[0]))].sort();



  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white rounded-md md:shadow-lg p-6 w-full sm:w-[45vw] flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-0 md:gap-x-4">
        
        {/* Category Select */}
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setSubCategory(""); }} // Reset subCategory on category change
          className="w-full sm:w-40 border-gray-300 rounded-md p-1 md:p-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        
        {/* Subcategory Select */}
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="w-full sm:w-auto border-gray-300 rounded-md p-1 md:p-2"
          disabled={!subcategories.length} // Disable if no subcategories available
        >
          <option value="">Select SubCategory</option>
          {subcategories.map((sub, index) => (
            <option key={index} value={sub}>{sub}</option>
          ))}
        </select>

        {/* Place Select */}
        <select
      value={place}
      onChange={(e) => setPlace(e.target.value)}
      className="w-full sm:w-32 border-gray-300 rounded-md p-1 md:p-2"
      disabled={!subCategory}
    >
      <option value="">Select Place</option>
      {uniqueSortedCities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>

        {/* Search Button */}
        <Link
          href={isSearchDisabled ? "#" : `/freelancer/type/${category}/${subCategory}/${place}`}
          className={`w-full sm:w-auto px-4 py-2 rounded-md text-white ${isSearchDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`}
        >
          Find Freelancer →
        </Link>
      </div>
    </div>
  );
}
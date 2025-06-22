'use client';

import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import Location from '@/components/location/Location';
import dynamic from 'next/dynamic';
import { ArrowDropDown, LocationOn } from '@mui/icons-material';
import { useRouter } from 'next/navigation';



const categories = [
  {
  name: 'Traditional Photography',
  displayName: 'Traditional Photographer',
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
  displayName: 'Candid Photographer',
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
  displayName: 'Traditional Videographer',
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
  displayName: 'Cinematographer',
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
  displayName: 'Drone',
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
  displayName: 'Crane',
  subcategories: [ 'Events'],
  pricing: {
      fullDayPrice: true,
  },
  },
  {
  name: 'LED wall',
  displayName: 'LED wall',
  subcategories: ['Events'],
  ledDetails: { size: '' },
  pricing: {
      fullDayPrice: true,
  },
  },
  {
  name: 'LED TV',
  displayName: 'LED TV',
  subcategories: ['Events'],
  ledDetails: { size: '' },
  pricing: {
      fullDayPrice: true,
  },
  },
];

export default function SearchPage() {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [place, setPlace] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewportHeight, setViewportHeight] = useState('100vh');

  useEffect(() => {
  let previousHeight = window.innerHeight;

  const updateHeight = () => {
    const newHeight = window.innerHeight;
    setViewportHeight(`${newHeight}px`);

    // Keyboard closed: scroll back to top
    if (newHeight > previousHeight) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    previousHeight = newHeight;
  };

  window.addEventListener('resize', updateHeight);
  updateHeight(); // call once on mount

  return () => window.removeEventListener('resize', updateHeight);
}, []);


  const router = useRouter();

  const selectedCategory = categories.find(cat => cat.name === category);
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  const isSearchDisabled = !category || (place && !subCategory);



  const handleSearch = () => {
    if (isSearchDisabled || loading) return;
    setLoading(true);
    router.push(`/freelancer/type/${category}/${subCategory}/${place}`);
  };

  return (
    <div
  className="sm:hidden z-30 overflow-hidden bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] px-4 pt-20 pb-24 relative"
  style={{ height: viewportHeight }}
>
 {/* Header */}
      <div className="mt-4 text-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Find Your Freelancer</h1>
        <p className="text-sm text-gray-600 mt-1">
          Search freelancers for any event in your city.
        </p>
      </div>

      {/* Scrollable Form */}
      <div className="overflow-y-auto  pb-6 flex flex-col gap-6">
        {/* Category */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <label className="text-sm text-gray-600 font-medium mb-1 block">Select Category</label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubCategory('');
              }}
              className="w-full appearance-none px-4 py-3 pr-10 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose...</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat.name}>{cat.displayName}</option>
              ))}
            </select>
            <ArrowDropDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Subcategory */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <label className="text-sm text-gray-600 font-medium mb-1 block">Select Subcategory</label>
          <div className="relative">
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              disabled={!subcategories.length}
              className="w-full appearance-none px-4 py-3 pr-10 rounded-md border border-gray-300 text-gray-800 disabled:bg-gray-100 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose...</option>
              {subcategories.map((sub, i) => (
                <option key={i} value={sub}>{sub}</option>
              ))}
            </select>
            <ArrowDropDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Location */}
        <div className="bg-white  shadow-md rounded-xl p-4">
          <label className="text-sm text-gray-600 font-medium mb-2 block">Select Location</label>
          <div className="relative">
            <Location onSelectLocation={setPlace} place={place} />
            <LocationOn className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className=" bottom-20  transform -z-10  w-[90%] text-center">
        <button
          onClick={handleSearch}
          disabled={isSearchDisabled || loading}
          className={`w-full py-4 rounded-full font-semibold text-white shadow-md text-sm tracking-wide transition ${
            isSearchDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600'
          }`}
        >
          {loading ? 'Searching...' : 'Search Freelancer'}
        </button>

        {isSearchDisabled && (
          <p className="text-xs text-red-500 mt-2">
            {category === ''
              ? 'Please select a category.'
              : !subCategory && place
              ? 'Please select a subcategory.'
              : ''}
          </p>
        )}
      </div>
      </div>

      {/* Search Button */}
      
    </div>
  );
}

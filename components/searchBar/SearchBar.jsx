'use client'
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';

export default function SearchBar() {
  const [category, setCategory] = useState("");
  const [place, setPlace] = useState("");
  const isSearchDisabled = !category;
  return (
    <div className='flex items-center justify-center my-10'>
      <div className="bg-white rounded-md shadow-lg p-6 w-full sm:w-[45vw] flex flex-col sm:flex-row items-center justify-center gap-9 space-y-178rdswteqg wghao[]
        \ w12345w6e78tkp[l] sm:space-y-0 sm:space-x-4">
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value) }}
          className="w-full sm:w-auto border-gray-300 rounded-md p-1 md:p-2"
        >
          <option value="">Select Category</option>
          <option>Photography</option>
          <option>Candid Photography</option>
          <option>Videography</option>
          <option>Cinematography</option>
          <option>Drone</option>
          <option>Crane</option>
          <option>LED wall</option>
          <option>LED TV</option>

        </select>

        <select
          value={place}
          onChange={(e) => { setPlace(e.target.value) }}
          className="w-full sm:w-auto border-gray-300 rounded-md p-1 md:p-2"
        >
          <option value="">Select Place</option>
          <option>patna</option>
          <option>muzaffarpur</option>
        </select>

        <Link
          href={isSearchDisabled ? "#" : `/freelancer/type/${category}/${place}`}
          className={`w-full sm:w-auto px-4 py-2 rounded-md text-white ${isSearchDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
            }`}
        >
          Find Freelancer →
        </Link>
      </div>
    </div>
  )
}

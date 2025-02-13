"use client";

import React, { useState, useEffect } from "react";
export default function Location({ onSelectLocation, place }) {
  const [input, setInput] = useState(place?place:'');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (input === "") {
      setSuggestions([]);
    }
  }, [input]);

  const fetchSuggestions = async (value) => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/autocomplete?input=${encodeURIComponent(value)}`);
      if (!response.ok) throw new Error("Failed to fetch suggestions");
      const data = await response.json();
      const cities = data.predictions.map((prediction) => prediction.split(",")[0]);
      setSuggestions(cities);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
    fetchSuggestions(value);
  };

  const handleSelect = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
    setShowDropdown(false);
    onSelectLocation(suggestion);
  };

  const handleFocus = () => setShowDropdown(true);

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Location"
          className="w-full px-4 py-2 rounded-lg focus:outline-none placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {loading && <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>}
          
          {!loading &&
            suggestions.slice(0, 5).map((suggestion, index) => (
              <li
                key={index}
                onMouseDown={() => handleSelect(suggestion)}
                onTouchStart={() => handleSelect(suggestion)}
                className="dropdown-item px-4 py-2 cursor-pointer hover:bg-gray-100"
                tabIndex={-1}
              ><span> 📍 </span>
                {suggestion}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

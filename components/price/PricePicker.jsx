import { useState } from 'react';

import React from 'react'


export default function PricePicker({ freelancerData }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [timeOption, setTimeOption] = useState('fullDayPrice');
    const [price, setPrice] = useState('');

    const handlePriceUpdate = () => {
        const categoryDetails = freelancerData.freelancerDetails[selectedCategory];
        if (categoryDetails) {
            const { price, weddingPrice } = categoryDetails;
            const isWedding = selectedSubcategory === 'Wedding';
            const selectedPrice = isWedding ? weddingPrice : price;
            setPrice(selectedPrice ? selectedPrice[timeOption] : 'Not Available');
        }
    };

    return (
        <div className="">
            <h3 className="text-lg font-bold mb-2">Price Checker</h3>
            <div className="flex gap-4 flex-col sm:flex-row">
                {/* Category Selection */}
                <select
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setSelectedSubcategory('');
                    }}
                    className="p-2 border w-40 rounded"
                >
                    <option value="">Select Category</option>
                    {Object.keys(freelancerData.freelancerDetails).map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                {/* Subcategory Selection */}
                <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="p-2 border w-40 rounded"
                >
                    <option value="">Select Subcategory</option>
                    {freelancerData.freelancerDetails[selectedCategory]?.subcategories.map((sub, index) => (
                        <option key={index} value={sub}>{sub}</option>
                    ))}
                </select>

                {/* Time Option Selection */}
                <select
                    value={timeOption}
                    onChange={(e) => setTimeOption(e.target.value)}
                    className="p-2 border w-40 rounded"
                >
                    <option value="fullDayPrice">Full Day</option>
                    <option value="halfDayPrice">Half Day</option>
                    <option value="extraHourPrice">Extra Hour</option>
                </select>
            </div>
            <div className='flex gap-5'>

            <button
                onClick={handlePriceUpdate}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
                Check Price
            </button>

            {/* Display Price */}
            {price && (
                <p className="mt-4 text-lg font-semibold">
                    Price: ₹{price} 
                </p>
            )}

</div>
        </div>
    );
};

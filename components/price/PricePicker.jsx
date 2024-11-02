import { useState, useEffect } from 'react';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function PricePicker({ freelancerData }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [timeOption, setTimeOption] = useState('fullDayPrice');
    const [price, setPrice] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [blockedDates, setBlockedDates] = useState([]);

    const getBlockedDates = async (Id) => {
        const data = await fetch(`/api/dates/${Id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const blockedDates2 = await data.json();
        const blockedDates1 = blockedDates2.map((ele) => ele?.date || "");
        const formattedDates = blockedDates1.map((date) => {
            const d = new Date(date);
            return d.toISOString().split('T')[0];
        });
        setBlockedDates(formattedDates);
    };

    const shouldDisableDate = (date) => {
        if (!date || !(date instanceof Date)) return false;
        const formattedDate = date.toISOString().split('T')[0];
        return blockedDates.includes(formattedDate) || date < new Date();
    };

    const handleDateChange = (newDate) => {
        if (newDate) {
            if (shouldDisableDate(newDate)) {
                setSelectedDate(null);
                const nextDay = new Date(newDate);
                nextDay.setDate(nextDay.getDate() + 1);
                alert(`The date ${nextDay.toISOString().split('T')[0]} is already booked. Please select another date.`);
            } else {
                setSelectedDate(newDate);
            }
        } else {
            setSelectedDate(null);
        }
    };

    const handlePriceUpdate = () => {
        const categoryDetails = freelancerData.freelancerDetails[selectedCategory];
        if (categoryDetails) {
            const { price, weddingPrice } = categoryDetails;
            const isWedding = selectedSubcategory === 'Wedding';
            const selectedPrice = isWedding ? weddingPrice : price;
            setPrice(selectedPrice ? selectedPrice[timeOption] : 'Not Available');
        }
    };

    useEffect(() => {
        if (freelancerData._id) {
            getBlockedDates(freelancerData._id);
        }
    }, [freelancerData]);

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Check Exact Price</h3>
            <div className="flex gap-4 flex-wrap flex-row">
                <select
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setSelectedSubcategory('');
                    }}
                    className="p-2 border w-[35vw] md:w-36 rounded"
                >
                    <option value="">Select Category</option>
                    {Object.keys(freelancerData.freelancerDetails).map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="p-2 border w-[30vw] md:w-36 rounded"
                >
                    <option value="">Select Subcategory</option>
                    {freelancerData.freelancerDetails[selectedCategory]?.subcategories.map((sub, index) => (
                        <option key={index} value={sub}>{sub}</option>
                    ))}
                </select>

                <select
                    value={timeOption}
                    onChange={(e) => setTimeOption(e.target.value)}
                    className="p-2 border w-[35vw] md:w-36 rounded"
                >
                    <option value="fullDayPrice">Full Day</option>
                    <option value="halfDayPrice">Half Day</option>
                    <option value="extraHourPrice">Extra Hour</option>
                </select>
            </div>
            <div className='flex items-center gap-5'>
                <button
                    onClick={handlePriceUpdate}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Check Price
                </button>

                {price && (
                    <p className="mt-4 text-lg font-semibold">
                        Price: ₹{price}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-semibold mt-4 mb-1 text-gray-700">Check Available Dates!</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Select a date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        shouldDisableDate={shouldDisableDate}
                        renderInput={(params) => <TextField {...params} />}
                        renderDay={(day, selectedDates, pickersDayProps) => {
                            const isDisabled = shouldDisableDate(day);
                            return (
                                <Box
                                    {...pickersDayProps}
                                    sx={{
                                        width: '36px',
                                        height: '36px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: isDisabled ? 'normal' : 'bold',
                                        color: isDisabled ? 'red' : '#000',
                                        margin: '2px',
                                        backgroundColor: selectedDates.includes(day) ? '#cfe8fc' : 'transparent',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleDateChange(day)}
                                >
                                    <Typography>{day.getDate()}</Typography>
                                </Box>
                            );
                        }}
                    />
                </LocalizationProvider>
            </div>
        </div>
    );
}

'use client'
import { useState, useEffect } from 'react';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBooking } from "../../app/(root)/context/BookingContext";
import Button from "@mui/material/Button";
import { DesktopDatePicker } from '@mui/x-date-pickers';
import jwt from 'jsonwebtoken';

export default function PricePicker({ freelancerData }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [timeOption, setTimeOption] = useState('fullDayPrice');
    const [price, setPrice] = useState('');
    const [selectedDates, setSelectedDates] = useState([]); // Array to hold selected dates
    const [blockedDates, setBlockedDates] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [extraHours, setExtraHours] = useState(1); // State to hold the selected extra hours
    const { setBookingData } = useBooking();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    // Fetch blocked dates
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
            const localDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            return localDate.toISOString().split('T')[0]; // Convert back to YYYY-MM-DD format
        });
        setBlockedDates(formattedDates);
    };

    // Disable dates that are blocked or in the past
    const shouldDisableDate = (date) => {
        if (!date || !(date instanceof Date)) return false;
        const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
            .toISOString()
            .split('T')[0];
        return blockedDates.includes(normalizedDate) || date < new Date();
    };

    // Handle toggling of selected dates
    const handleDateToggle = (newDate) => {
        // Format the date as YYYY-MM-DD in local time
        const formattedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;

        if (selectedDates.includes(formattedDate)) {
            // Deselect the date
            setSelectedDates(selectedDates.filter((date) => date !== formattedDate));
        } else {
            // Select the date
            setSelectedDates([...selectedDates, formattedDate]);
        }
    };


    // Handle month change
    const handleMonthChange = (date) => {
        setCurrentMonth(date.getMonth());
        setCurrentYear(date.getFullYear());
    };

    // Update the price dynamically based on selected category, subcategory, time, and dates
    const updatePrice = () => {
        if (!selectedCategory || !selectedSubcategory || !timeOption) {
            return; // Do not update if any required field is missing
        }

        const categoryDetails = freelancerData.freelancerDetails[selectedCategory];
        if (categoryDetails) {
            const { price, weddingPrice, birthdayPrice } = categoryDetails;
            const isWedding = selectedSubcategory === 'Wedding';
            const isany = selectedSubcategory === 'Birthday' || selectedSubcategory === 'Anniversary' || selectedSubcategory === 'Engagement';
            const selectedPrice = isWedding ? weddingPrice : isany ? birthdayPrice : price;

            if(isany && !birthdayPrice){
                setSelectedSubcategory("");
                alert('You cannot book as price details is not availabe ')
            }
            if (selectedPrice) {
                const basePrice = selectedPrice[timeOption];

                if (basePrice) {
                    let totalPrice = 0;
                    if (timeOption === 'extraHourPrice') {
                        totalPrice = selectedDates.length > 0
                            ? basePrice * selectedDates.length * extraHours
                            : basePrice * extraHours;

                    } else {
                        // Calculate total price based on selected dates
                        totalPrice = selectedDates.length > 0
                            ? basePrice * selectedDates.length
                            : basePrice;
                    }

                    setPrice(totalPrice);
                } else {
                    setPrice('Not Available');
                }
            }
            
            else {
                setPrice('Not Available');
            }
        }
    };

    // Watch for changes in selectedCategory, selectedSubcategory, timeOption, extraHours, and selectedDates to update the price
    useEffect(() => {
        if (freelancerData._id) {
            getBlockedDates(freelancerData._id);
        }
    }, [freelancerData]);

    // Recalculate price whenever dates are selected/deselected
    useEffect(() => {
        updatePrice();
    }, [selectedCategory, selectedSubcategory, timeOption, selectedDates, extraHours]);





    const router = useRouter();

    function sendprops() {

        if (!selectedCategory) {
            alert("Please select a category.");
            return;
        }
        if (!selectedSubcategory) {
            alert("Please select a subcategory.");
            return;
        }
        if (!timeOption) {
            alert("Please select Duration.");
            return;
        }
        if (selectedDates.length === 0) {
            alert("Please select at least one date.");
            return;
        }

        if (!price) {
            alert("Please check the price.");
            return;
        }

        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = jwt.decode(token);
        }
        else {
            alert('please login before making an order')
            router.push('/log-in')
            return;
        }


        const formattedTimeOption =
            timeOption === 'extraHourPrice' ? `${timeOption},${extraHours}` : timeOption;

        setBookingData({
            price,
            selectedCategory,
            selectedSubcategory,
            timeOption: formattedTimeOption,
            selectedDates: selectedDates.join(','),
        });

        router.push(`/booking/${freelancerData._id}`);
    }

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Check Sure Price</h3>
            <div className="flex gap-4 flex-wrap flex-row ">
                <select
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setSelectedSubcategory('');
                    }}
                    className="px-1 py-2 border w-[40vw] text-sm md:w-[9vw] rounded"
                >
                    <option className='' value="">Select Category</option>
                    {Object.keys(freelancerData.freelancerDetails).map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="px-1 py-2 border w-[40vw] text-sm md:w-[10vw] rounded"
                >
                    <option value="">Select Subcategory</option>
                    {freelancerData.freelancerDetails[selectedCategory]?.subcategories.map((sub, index) => (
                        <option key={index} value={sub}>{sub}</option>
                    ))}
                </select>

                {!(selectedSubcategory === 'Birthday' || selectedSubcategory === 'Anniversary' || selectedSubcategory === 'Engagement') &&<select
                    value={timeOption}
                    onChange={(e) => setTimeOption(e.target.value)}
                    className="px-1 py-2 border w-[40vw] text-sm md:w-[8vw] rounded"
                >
                    <option value="">Select Time Option</option>
                    {Object.entries(freelancerData.freelancerDetails[selectedCategory]?.price || {}).map(
                        ([key, value]) =>
                            value && Number(value) > 0 && ( // Only include valid, non-zero options
                                <option key={key} value={key}>
                                    {key === "fullDayPrice" ? "Full Day" :
                                        key === "halfDayPrice" ? "Half Day" :
                                            key === "extraHourPrice" ? "Hourly" :
                                                key}
                                </option>
                            )
                    )}
                </select>}
            </div>

            {/* Show extra hour dropdown when the "Extra Hour" option is selected */}
            {timeOption === 'extraHourPrice' && (
                <div className="mt-4">
                    <label htmlFor="extraHours" className="block text-sm font-semibold">Select no of Hours</label>
                    <select
                        id="extraHours"
                        value={extraHours}
                        onChange={(e) => setExtraHours(parseInt(e.target.value))}
                        className="px-1 py-2 border w-36 text-sm rounded"
                    >
                        {[1, 2, 3, 4].map((hour) => (
                            <option key={hour} value={hour}>{hour} Hour{hour > 1 ? 's' : ''}</option>
                        ))}
                    </select>
                </div>
            )}

            <div className='flex items-center gap-5 w-[29vw] mt-2'>
                {/* Button is enabled only when category, subcategory, and time option are selected */}
                {/* <button
                    onClick={updatePrice}
                    disabled={!selectedCategory || !selectedSubcategory || !timeOption}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
                >
                    Check Price
                </button> */}

                {price && (
                    <p className="mt-4 text-lg font-semibold">
                        Total Price: ₹{price}
                    </p>
                )}

                {/* <Link href={`/booking/${freelancerData._id}`} className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Book Now</Link> */}

            </div>

            <div>
                <label className="block text-sm font-semibold mt-4 mb-1 text-gray-700">Check Available Dates!</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Select dates"
                        open={isCalendarOpen}
                        onOpen={() => setIsCalendarOpen(true)}

                        value={null} // Keeps the calendar open for multiple selections
                        onChange={(date) => {
                            if (date) handleDateToggle(date);
                        }}
                        shouldDisableDate={shouldDisableDate}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onClick={() => setIsCalendarOpen(true)} // Open calendar when clicking the input
                            />
                        )}
                        renderDay={(day, _selectedDates, pickersDayProps) => {
                            const formattedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                            const isSelected = selectedDates.includes(formattedDate);

                            return (
                                <PickersDay
                                    {...pickersDayProps}
                                    sx={{
                                        ...(pickersDayProps.disabled && {
                                            color: 'red !important',
                                            border: '1px solid red',
                                            borderRadius: "4px",
                                            margin: "2px"

                                        }),
                                        ...(isSelected && {
                                            backgroundColor: 'blue !important',
                                            color: 'white !important',
                                            borderRadius: '90%',
                                        }),
                                    }}
                                />
                            );
                        }}
                    />
                    <button
                        onClick={() => setIsCalendarOpen(false)}
                        className="mt-4 bg-blue-500 ml-2 text-white py-2 px-4 rounded"
                    >
                        Done
                    </button>
                </LocalizationProvider>
                <div className="">
                    <h4 className="text-sm font-semibold">Selected Dates:</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {selectedDates.length > 0 ? (
                            selectedDates.map((date, index) => {
                                const formattedDate = date.split("-").reverse().join("-"); // Converts yyyy-mm-dd to dd-mm-yyyy
                                return (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-blue-200 text-blue-700 text-xs rounded border border-blue-300"
                                    >
                                        {formattedDate}
                                    </span>
                                );
                            })
                        ) : (
                            <p className="text-gray-500 text-sm py-1">No dates selected.</p>
                        )}
                    </div>
                </div>
                <div className='mt-2 flex  justify-end'>
                    <a onClick={sendprops} className="  inline-block text-white bg-pink-500 border-0 py-3 my-2 px-6 text-lg cursor-pointer focus:outline-none hover:bg-yellow-600 rounded">Book Now</a>
                </div>


            </div>
        </div>
    );
}

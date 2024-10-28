  'use client'
  import React, { useEffect, useState } from 'react';
  import { LocalizationProvider } from '@mui/x-date-pickers';
  import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
  import { StaticDatePicker } from '@mui/x-date-pickers';
  import { format } from 'date-fns';
  import jwt from 'jsonwebtoken'

  function BlockedDatesCalendar() {
    const [blockedDates, setBlockedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [freelancerId, setFreelancerId] = useState(null);
    const [alreadyBlockedDates,setAlreadyBlockedDates] = useState([]);
    const [allEvents, setAllEvents] = useState([])
    const [initialEvents, setInitialEvents] = useState([])
    const [events, setEvents] = useState(null);
    const [input, setInput] = useState(null);
    const today = new Date().toISOString().split('T')[0];
    useEffect(()=>{
      const token = localStorage.getItem("token");
      if (token) {
          const decodedUser = jwt.decode(token);
          setFreelancerId(decodedUser.userid);
          getEvents(decodedUser.userid)
          getBlockedDates(decodedUser.userid)
      }
    },[])
    const getEvents = async (id) => {
      try {
        console.log("abc",id)
          const response = await fetch('/api/dates', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: id })
          });
          
          const data = await response.json();
          console.log("Events data:", data);
          setEvents(data);
      } catch (error) {
          console.error("Error fetching events:", error);
      }
  };
  const getBlockedDates=async(Id)=>{
    const data = await fetch(`/api/dates/${Id}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
      }
    })
    const blockedDates2 = await data.json();
    console.log("bd2",blockedDates2)
    setAllEvents(blockedDates2)
    setInitialEvents(blockedDates2)
    const blockedDates = []
    blockedDates2.map((ele)=>blockedDates.push(ele?.date||""))
    console.log("bd",blockedDates)

    const formattedDates = blockedDates.map(date => {
      const d = new Date(date);
      return d.toISOString().split('T')[0]; // Get only 'yyyy-mm-dd' part
    });
    setAlreadyBlockedDates(formattedDates);
  }
    // Function to check if a date should be disabled
    const shouldDisableDate = (date) => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      return alreadyBlockedDates.includes(formattedDate);
    };

    const handleInputChange = (e) => {
      const value = e.target.value;
      const formattedValue = format(new Date(value), 'yyyy-MM-dd');
    
      if (alreadyBlockedDates.includes(formattedValue)) {
        console.log("Unblocking date:", formattedValue);
    
        setAlreadyBlockedDates((prev) => prev.filter(date => date !== formattedValue));
    
        setAllEvents((prev) => prev.filter(obj => {
          const eventDate = new Date(obj.date).toISOString().split('T')[0];
          return eventDate !== formattedValue;
        }));
        
        console.log("Updated allEvents:", allEvents);
      } else {
        // Add the date to blockedDates
        if(blockedDates.includes(formattedValue)){
          setBlockedDates((prev)=>prev.filter(obj=>obj!==formattedValue))
        }else{
          setBlockedDates([...blockedDates, formattedValue]);
          setAlreadyBlockedDates([...alreadyBlockedDates,formattedValue])
        }
      }
    };
    const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log(blockedDates)
      console.log(blockedDates.length)
      if(blockedDates.length==1){
        console.log("hello")
        setBlockedDates([])
      }
      console.log(blockedDates.length)
      console.log(initialEvents,allEvents)
      if(blockedDates.length==0&&initialEvents===allEvents){
        alert("Please select at least one date");
      }else if(blockedDates.length==0&&initialEvents!==allEvents){
        const data = await fetch(`/api/dates/${freelancerId}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({allEvents})
        })
          setBlockedDates([])
          setSelectedDate(null);
          console.log("data",data)
          if(data?.ok)
          alert("unblocked successfully");
      }
      else{
        try {
          
          console.log("f",freelancerId)
          console.log("blockedDates",blockedDates)
          if(input===null||input===' '){
            alert("Please enter a valid reason")
          }else{
          if(blockedDates.length==1){
            const obj={
              date:blockedDates[0],
              event:input
            }
            allEvents.push(obj)
          }else{
            blockedDates.map((date)=>{
              const obj={
                date:date,
                event:input
              }
            allEvents.push(obj)
            })
          }
          console.log("events",allEvents)
          const data = await fetch(`/api/dates/${freelancerId}`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({allEvents})
          })
          setBlockedDates([])
          setSelectedDate(null);
          console.log("data",data)
          if(data?.ok)
          alert("Blocked dates saved successfully");
        }
        } catch (error) {
          alert("Failed to block dates")

        }
      }

    }

    return (
      <div className=' pt-32'>
        <div className='w-full text-center text-xl font-bold mb-10'>
          Block/Unblock the dates according to your availabilities
        </div>
        <div className='w-full flex items-center justify-center'>
          <div className='w-[20%]'>

              <label className='text-center'>Select the dates to block/unblock</label>
              <input 
                type="date" 
                min={today}
                className="block w-full p-2 mb-4 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 appearance-none "
                onChange={handleInputChange}
              />
          </div>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            shouldDisableDate={shouldDisableDate}  // Disable specific dates
          />
        </LocalizationProvider>
        <div className='w-full flex items-center justify-center'>

          <div className=' flex-col justify-center '>
            <div className=''>
              <label className='text-center'>Enter the reason for blocking date</label>
              <input
              type="text" 
              className="block w-full p-2 mb-4 text-sm text-gray-700 bg-gray-300 rounded-lg"
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              />
            </div>
            <div className='w-full flex items-center justify-center'>

              <button className='bg-blue-400 rounded-3xl p-4 text-white' onClick={handleSubmit}>
                Save Blocked Dates
              </button>
            </div>
          </div>
        </div>
        <div className='h-full mt-24'>
          <div className='w-full flex-col items-center justify-center'>
          {
            allEvents?.map((item, index) => (
              item && typeof item === 'object' ? ( // Check if item is an object
                <div key={index}>
                  <p>Date - {item.date ? new Date(item.date).toISOString().split('T')[0] : "N/A"}</p>
                  <p>Event - {item.event || "No event information available"}</p>
                </div>
              ) : null // Skip if item is not an object
            ))
          }
          </div>
        </div>

        <div className='h-full mt-24'>
          <div className='text-2xl font-bold text-center mb-5'>
            My Events
          </div>
          <div className='w-full h-[100vh] flex items-start justify-center'>
            <div className='w-[80%] grid grid-cols-3 gap-2'>
              {
                events?.map((event)=>(
                  <div key={events.id} className='bg-gray-300 p-4 rounded-lg shadow-md flex items-center flex-col'>
                    <div className='text-lg font-bold'>{event?.event||""}</div>
                    <div className='text-lg font-bold'>{event?.service||""}</div>
                    <div className='text-lg font-bold'>
                      {event.date ? event.date.split('T')[0] : ""}
                    </div>
                    <div className='text-lg font-bold'>
                      <div>Location:</div>
                      <div>city:{event?.city||""}</div>
                      <div>pincode:{event?.pinCode||""}</div>
                      <div>address:{event?.address||""}</div>
                    </div>
                    <div>
                      total amount:{event?.totalAmount||""}
                    </div>
                    <div>
                      paid amount:{event?.paidAmount||""}
                    </div>
                    <div>
                      time:{event?.time||""}
                    </div>
                    <div>
                      customer:{event?.customerName||""}
                    </div>

                    
                  </div>  
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default BlockedDatesCalendar;
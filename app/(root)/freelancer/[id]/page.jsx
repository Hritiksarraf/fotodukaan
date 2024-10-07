'use client'
import React from 'react'
import { useParams } from "next/navigation";
import { useState,useEffect } from 'react';

export default function page() {
    const {id} =useParams();

    const [userData, setUserData] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/freelancer/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data)
    setUserData(data);
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return (
    <div className='pt-32'>{userData.name}</div>
  )
}

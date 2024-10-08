'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ServiceCard from '@/components/card/ServiceCard';

export default function Page() {
  const { people, place } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFreelancers = async () => {
    try {
      const response = await fetch(`/api/freelancer/type/${people}/${place}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const datas = await response.json();

      // Check if there is a message (like "No data found")
      if (datas.message) {
        setData([]);
      } else {
        setData(datas);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching freelancers:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFreelancers();
  }, [people, place]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pt-24">
      {data.length === 0 ? (
        <p>No freelancers found for {people} in {place}.</p>
      ) : ( <div className='flex flex-wrap gap-8'>
        {data.map((freelancer) => (
          <ServiceCard key={freelancer._id} {...freelancer} />
        ))}
        </div>)}
    </div>
  );
}

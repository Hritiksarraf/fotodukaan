'use client'
import React from 'react'
import { useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CustomizedAccordions from '@/components/accordian/Accordion';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Image from 'next/image';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ReactCardFlip from 'react-card-flip';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Slider from "react-slick";
import Modal from 'react-modal';
import PricePicker from '@/components/price/PricePicker';
import ReviewSection from '@/components/review/ReviewSection'


export default function page() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [freelancerData, setFreelancerData] = useState({
    freelancerDetails: {}
  });
  const [readMore, setReadMore] = useState(true)
  const [userName, setUserName] = useState('');
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(5);

  const handleSubmitReview = () => {
    // Submit the review data (userName, userReview, userRating) to your backend or state management
    console.log({
      name: userName,
      review: userReview,
      rating: userRating,
    });
    setIsReviewModalOpen(false);
    setUserName('');
    setUserReview('');
    setUserRating(5);
  };

  


  //review section start here
  const TestimonialData = [
    {
      id: 1,
      name: "Hritik",
      text: "The photographers and videographers from this platform truly captured the essence of our event. Their professionalism and creativity exceeded all expectations.",
      img: "https://www.shutterstock.com/image-photo/young-handsome-business-man-dressed-260nw-1487434763.jpg",
      star: 5,
      skills: ['photographer', 'videographer', 'drone']
    },
    {
      id: 2,
      name: "Mani",
      text: "Hiring a photographer through this platform was the best decision for our corporate event. The attention to detail and the quality of the photos were outstanding.",
      img: "https://www.shutterstock.com/image-photo/have-great-idea-handsome-businessman-260nw-1282628038.jpg",
      star: 4,
      skills: ['photographer']
    },
    {
      id: 3,
      name: "Piyush",
      text: "The drone operator captured breathtaking aerial shots of our wedding. The cinematic quality of the video blew everyone away. Highly recommended!",
      img: "https://media.gettyimages.com/id/1310980400/photo/portrait-of-burnout-businesswoman-in-an-office.jpg?s=612x612&w=gi&k=20&c=fLkvB7hcl7zWJIOUBamNe0lbKIkc4kWFQ1vpQrVwTXQ=",
      star: 5,
      skills: ['videographer', 'drone']
    },
    {
      id: 4,
      name: "Saurav",
      text: "From photography to videography, the team was on point. The visuals turned out beautifully, and their professionalism was evident throughout the event.",
      img: "https://media.gettyimages.com/id/641199822/photo/businesswomen-at-workstation-in-start-up-office.jpg?s=612x612&w=gi&k=20&c=uk6k1ILVRf7yKT26DtfgemzQtOyISm72Egn5xr_XT_4=",
      star: 4,
      skills: ['photographer', 'videographer', 'drone']
    },
    {
      id: 5,
      name: "Aditya",
      text: "The entire experience, from booking a photographer to getting the final edits, was seamless. The quality and timeliness of the deliverables were impressive.",
      img: "https://t4.ftcdn.net/jpg/01/42/20/17/360_F_142201762_qMCuIAolgpz4NbF5T5m66KQJzYzrEbUv.jpg",
      star: 5,
      skills: ['photographer', 'videographer', 'drone']
    },
    {
      id: 6,
      name: "Riya",
      text: "The candid photography was superb! They really know how to capture those fleeting moments that matter the most. I couldn’t have asked for better photographers.",
      img: "https://www.shutterstock.com/image-photo/portrait-happy-woman-smiling-camera-260nw-1531112350.jpg",
      star: 5,
      skills: ['photographer', 'candid photography']
    },
    {
      id: 7,
      name: "Amit",
      text: "We hired a cinematographer through this platform, and the end result was incredible. The video quality was top-notch, and the storytelling was perfect for our corporate project.",
      img: "https://www.shutterstock.com/image-photo/portrait-confident-young-man-standing-260nw-767916349.jpg",
      star: 4,
      skills: ['cinematographer', 'videographer']
    },
    {
      id: 8,
      name: "Sanya",
      text: "The drone footage for our outdoor event was stunning. The wide angles and smooth shots added a cinematic feel to the final video. I highly recommend their drone services!",
      img: "https://www.shutterstock.com/image-photo/young-woman-holding-paper-coffee-260nw-1172777339.jpg",
      star: 5,
      skills: ['drone', 'videographer']
    },
    {
      id: 9,
      name: "Karthik",
      text: "The crane operator we hired added an extra layer of professionalism to our event's video production. The dynamic camera movements made our footage stand out. Exceptional service!",
      img: "https://www.shutterstock.com/image-photo/smiling-handsome-young-man-260nw-729510768.jpg",
      star: 5,
      skills: ['crane operator', 'videographer']
    },
    {
      id: 10,
      name: "Anjali",
      text: "The LED wall setup transformed our event’s visual experience. It was perfect for showcasing live footage and presentations. We were thrilled with the results.",
      img: "https://www.shutterstock.com/image-photo/young-woman-glasses-sitting-coffee-260nw-1922522086.jpg",
      star: 4,
      skills: ['LED wall', 'event management']
    }
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);



  const handleReadMoreClick = (review) => {
    setSelectedReview(review);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedReview(null);
  };

  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '600px',
      padding: '20px',
      borderRadius: '15px',
      backgroundColor: '#fff',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
  };

  var settings = {

    infinite: true,
    speed: 350,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 600,
        settings: {

          infinite: true,
          speed: 350,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: true,
        }
      },]
  };



  const getUser = async () => {
    const response = await fetch(`/api/freelancer/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data)
    setFreelancerData(data);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [id]);

  const displayCategories = (details) => {
    if (!details) return null;
    return Object.keys(details).map(category => (
      <div key={category}>
        <h4 className="flex w-full text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">{category}</h4>

      </div>
    ));
  };


  function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }
  let minamount = Number.MAX_VALUE;
  Object.keys(freelancerData?.freelancerDetails).forEach((key) => {
    const details = freelancerData?.freelancerDetails[key];
    const fullDayPrice = Number(details?.price?.fullDayPrice) || Number.MAX_VALUE;
    const weddingPrice = Number(details?.weddingPrice?.fullDayPrice) || Number.MAX_VALUE;

    minamount = Math.min(minamount, fullDayPrice, weddingPrice);
  });


  const [flippedCardIndex, setFlippedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setFlippedCardIndex(flippedCardIndex === index ? null : index);
  };


  //for accordian

  const [openIndex, setOpenIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  if (loading) {
    return (<div className='min-h-[80vh] w-[100vw]'>
      <Box sx={{ display: 'flex' }}>
        <div className='pt-80 flex items-center justify-center text-center mx-auto  '>
          <CircularProgress color="inherit" size="8rem" />
        </div>
      </Box>
    </div>);
  }

  //for image section



  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
};

const closeModalpic = () => setIsModalOpen(false);

const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : freelancerData.image.length - 1
    );
};

const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
        prevIndex < freelancerData.image.length - 1 ? prevIndex + 1 : 0
    );
};


  return (
    <div className='pt-20 overflow-x-hidden'>
      <section>
        <section className="text-gray-600 body-font overflow-hidden  bg-gradient-to-r from-white to-white">
          <div className="container lg:w-[75vw] px-4 md:p-10 pt-10 mx-auto  bg-white  ">
            <div className=" mx-auto px-10 py-5 shadow-2xl md:p-10 flex flex-wrap   ">
              <img alt="ecommerce" className="lg:w-1/2 aspect-square w-full lg:h-auto h-64 object-cover object-center rounded" src={freelancerData.profilePhoto} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-700 tracking-widest">Freelancer</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{freelancerData.name}</h1>
                <div className="flex mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, index) =>
                      index < Number(freelancerData.stars?.star) ? (
                        <StarIcon key={index} size="small" className="text-yellow-500" />
                      ) : (
                        <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                      )

                    )}
                  <span className="flex items-center">

                    <span className="text-gray-600 ml-3">{freelancerData.stars?.noOfPeople} Review</span>
                  </span>

                </div>
                <div>
                  <h1 className='text-xl font-bold'>{freelancerData.city}</h1>
                </div>

                <p className="leading-relaxed min-h-16 md:min-h-16">{freelancerData.aboutYourself}</p>
                

                <div className="flex flex-col mt-2 md:flex-row">
                  <p className='text-sm'> <span className='font-semibold text-3xl'>{minamount} ₹ </span > Starting Price  </p>
                  <Link href={`/booking/${freelancerData._id}`} className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Book Now</Link>


                </div>
                <div className='my-5'>
                <PricePicker freelancerData={freelancerData} />
                </div>
                {/* <div className="hidden md:block mt-4">
                  
                  <h3 className="text-lg  font-bold mb-2">Categories</h3>
                  <div className='flex gap-4 flex-wrap'>
                    {displayCategories(freelancerData.freelancerDetails)}
                  </div>
                </div> */}
              </div>

            </div>




          </div>

        </section>



      </section>


      {/* this is for accordion */}
      {/* <section>
            {freelancerData.freelancerDetails && Object.keys(freelancerData.freelancerDetails).length > 0 ? (
              <CustomizedAccordions freelancerDetails={freelancerData.freelancerDetails}/>
            ) : (
              <p>Loading categories...</p>
            )}
        </section> */}

      <div className="w-full px-4 pt-5 ">
        <h1 className="text-3xl md:text-5xl text-center text-black mb-8" style={{ fontFamily: 'Poppins' }}>
          Check Out My Services
        </h1>
        <div className="md:w-[50vw] md:mx-[15vw] bg-gradient-to-b  md:p-4 rounded-lg ">
          {Object.entries(freelancerData.freelancerDetails).map(([category, details], index) => (
            <div key={index} className=" border-b-2   rounded-lg">
              <div
                onClick={() => handleAccordionClick(index)}
                className="flex items-center justify-between cursor-pointer p-4 text-lg font-semibold text-blue-500  rounded-lg"
              >
                <div>
                  <p className='text-center'>{category.replace(/\b\w/g, (char) => char.toUpperCase())}</p>
                </div>
                <span className=" text-2xl">{openIndex === index ? '-' : '+'}</span>
              </div>

              {openIndex === index && (
                <div className=" text-white bg-">
                  <div className="flex flex-col items-start">
                    {/* <h2 className="text-xl font-bold text-[#0E2041]">Subcategories:</h2> */}
                    <div className="flex items-center   flex-wrap  mb-4">
                      {details.subcategories.map((sub, idx) => (
                        <span key={idx} className="  text-lg  font-semibold border-r-2 px-3 text-gray-600">
                          {sub.replace(/\b\w/g, (char) => char.toUpperCase())}
                        </span>
                      ))}
                    </div>

                    {details.cameraDetails && (
                      <div className="mb-4 flex items-center justify-center mx-auto   flex-col   ">
                        <h3 className="text-xl my-2 text-center   font-serife font-bold text-blue-600">
                          {category === 'Photography' || category === 'Videography' || category === 'Candid Photography' || category === 'Cinematography' ? 'Camera Details' :
                            category === 'Drone' ? 'Drone Details' :
                              category === 'Video Editing' ? 'Video Editing Software' : ''}
                        </h3>
                        <div className="text-sm flex flex-wrap gap-x-5 items-center justify-center  text-[#0E2041]">
                          {Object.entries(details.cameraDetails).map(([key, value]) => (
                            <div className=''>

                              <p key={key} className="font-bold  px-1">
                                <span className='font-bold text-xl text-gray-700'>{key.replace(/\b\w/g, (char) => char.toUpperCase())} : </span>
                                <span className='font-medium text-xl text-gray-600'>{value}</span>
                              </p>
                            </div>

                          ))}
                        </div>
                      </div>
                    )}

                    
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* image section */}

      <section className='w-[100vw] mx-auto md:pr-[25vw] md:pl-[15vw]'>
    {freelancerData.image.length > 0 && freelancerData.video.length > 0 && (
      <h2 className='text-center text-4xl md:text-5xl my-6' style={{ fontFamily: 'Poppins' }}>
        Glimpses of My Work
      </h2>
    )}

    {freelancerData.image.length > 0 && (
      <>
        <h2 className='text-center text-3xl text-blue-500 font-bold mb-6'>Image Gallery</h2>
        <div className='flex flex-wrap'>
          {freelancerData.image.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Freelancer Image ${index + 1}`}
              onClick={() => openModal(index)} // Pass index here
              className='md:w-[12vw] mx-auto w-[40vw] object-cover aspect-square my-4 md:mx-4 rounded-xl shadow-lg'
            />
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            {/* Close Button */}
            <button
              onClick={closeModalpic}
              className="absolute top-8 right-8 text-white text-5xl font-bold bg-black bg-opacity-70 p-3 rounded-full hover:bg-opacity-90"
            >
              &times;
            </button>

            {/* Image */}
            <div className="relative max-w-screen-lg flex justify-center items-center">
              <img
                src={freelancerData.image[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1}`}
                className="w-full max-h-[80vh] object-contain"
              />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={showPreviousImage}
              className="absolute bottom-10 left-4 text-white text-3xl font-bold bg-black bg-opacity-70 p-4 rounded-full hover:bg-opacity-90"
            >
              &#9664;
            </button>
            <button
              onClick={showNextImage}
              className="absolute bottom-10 right-4 text-white text-3xl font-bold bg-black bg-opacity-70 p-4 rounded-full hover:bg-opacity-90"
            >
              &#9654;
            </button>
          </div>
        )}
      </>
    )}
</section>




      {/* Video Section */}
      {freelancerData.video.length>0 && <section className='mt-10 px-auto md:pr-[25vw] md:pl-[15vw] w-[100vw]'>
        <h2 className='text-center text-3xl  text-blue-500 font-bold mb-6'>Video Gallery</h2>
        <div className='flex flex-wrap  '>
          {freelancerData.video?.map((videoLink, index) => (
            <div key={index} className=' mx-auto md:mx-0 md:w-[20vw] w-[93vw] p-4'>
              <div className='relative' style={{ paddingBottom: '70%' }}>
                <iframe
                  className='absolute top-0 left-0 w-full h-full rounded-xl'
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoLink)}`}
                  title={`Freelancer Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </section>}

      <section>
        {/* <ReviewSection/> */}
      </section>

      <section className=' px-auto md:pr-[25vw] md:pl-[15vw] w-[100vw]'>
        <div className='bg-gradient-to-r from-white to-white'>
          <div className=' text-3xl px-5  '>
            <h3 className='py-5 text-2xl lg:text-4xl font-extrabold' style={{ fontFamily: 'Caveat' }}>
              Review and Rating
            </h3>
            <p className='text-lg text-gray-600 '> 5.0 | 30 review</p>
          </div>
          <div className=''>
            <Slider {...settings}>
              {TestimonialData.map(({ id, img, name, text, star }) => {


                const truncatedText = text.split(' ').length > 20
                  ? text.split(' ').slice(0, 20).join(' ')
                  : text;

                return (
                  <>
                    <div key={id} className='relative w-[90vw] md:w-[18vw] mx-auto bg-gradient-to-r h-[21rem] md:h-full from-white to-white  dark:text-black my-6  shadow-lg flex flex-col bg-primary/10 px-5 '>
                    {/* <div className='block w-24 h-24 mx-auto rounded-full pt-4'>
                        <img src={img} alt="" className='rounded-full h-24 w-24' />
                      </div> */}
                      <div className='h-5 flex items-end '>
                          {Array(5).fill(0).map((_, index) => (
                            index < star ? (
                              <StarIcon key={index} size="small" className="text-yellow-500" />
                            ) : (
                              <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                            )
                          ))}
                          <p className='text-[0.6rem] px-2'>2/11/2024</p>
                        </div>
                        <div>
                          <p className='my-3 font-bold text-xl '>Excellent</p>
                        </div>
                      <div className='flex flex-col items-center mt-5'>
                        <p className='text-sm h-28 md:h-20  text-gray-500'>{truncatedText} {text.split(' ').length > 18 && <button onClick={() => handleReadMoreClick({ img, name, text, star })} className='blue1 inline-block'>...read more</button>}</p>

                        {/* <p className='text-xl font-bold my-4'>{name}</p> */}
                        {/* <p className='absolute top-0 right-0 dark:text-gray-400  text-9xl font-serif text-black/20'>,,</p> */}
                      </div>
                      <div className='flex py-5 items-center gap-x-4'>
                      <div className='block w-10 h-10 rounded-full '>
                        <img src={img} alt="" className='rounded-full h-10 w-10 object-cover' />
                      </div>
                      <p className='text-xl font-bold my-4'>{name}</p>
                      </div>
                    </div>
                  </>
                )
              })}
            </Slider >
          </div>
        </div>

        {/* Modal */}
        {selectedReview && (
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customModalStyles} contentLabel="Review Modal">
            <div className="text-center">
              <img src={selectedReview.img} alt={selectedReview.name} className="rounded-full  md:w-24 h-24 mx-auto mb-4 object-cover" />
              <h2 className="text-2xl font-bold mb-2">{selectedReview.name}</h2>
              <div className="flex justify-center mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, index) =>
                    index < selectedReview.star ? (
                      <StarIcon key={index} size="small" className="text-yellow-500" />
                    ) : (
                      <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                    )
                  )}
              </div>
              <p className="text-gray-700">{selectedReview.text}</p>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </Modal>
        )}

<section className="my-5 mx-5 border-y-2">
      <h1 className="text-2xl py-2 font-bold">Write a review</h1>
      <div
        className="my-2 cursor-pointer"
        onClick={() => {
          setIsReviewModalOpen(true);
        }}
      >
        <div className="flex gap-x-5 items-center text-2xl">
          <Rating name="half-rating" defaultValue={5} precision={1} />
          <p className="cursor-pointer"> {`>`} </p>
        </div>
      </div>

      {/* Modal for writing a review */}
      <Modal
        isOpen={isReviewModalOpen}
        onRequestClose={() => {
          setIsReviewModalOpen(false);
        }}
        style={customModalStyles}
        contentLabel="Review Modal"
      >
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>
          
          {/* Input for Name */}
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mb-4 p-2 border rounded-lg"
          />

          {/* Text Area for Review */}
          <textarea
            placeholder="Write your review here..."
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            className="w-full mb-4 p-2 border rounded-lg"
            rows="4"
          />

          {/* Star Rating Selection */}
          <div className="mb-4">
            <p className="text-lg mb-2">Rating:</p>
            <Rating
              name="user-rating"
              value={userRating}
              precision={1}
              onChange={(e, newValue) => setUserRating(newValue)}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitReview}
            className="mt-4 bg-blue-500 text-white py-2 px-4 mx-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit Review
          </button>

          {/* Close Button */}
          <button
            onClick={() => setIsReviewModalOpen(false)}
            className="mt-2 bg-red-500 mx-2 py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 text-white hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </section>
      </section>
      



    </div>
  )
}


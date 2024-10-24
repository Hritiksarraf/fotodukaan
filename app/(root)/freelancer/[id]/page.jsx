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


export default function page() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [freelancerData, setFreelancerData] = useState({
        freelancerDetails: {}
    });
    const [readMore, setReadMore] = useState(true)


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


    if (loading) {
        return (<div className='min-h-[80vh] w-[100vw]'>
            <Box sx={{ display: 'flex' }}>
                <div className='pt-80 flex items-center justify-center text-center mx-auto  '>
            <CircularProgress color="inherit" size="8rem" />
            </div>
          </Box>
        </div>);
      }

    return (
        <div className='pt-20'>
            <section>
                <section className="text-gray-600 body-font overflow-hidden  bg-gradient-to-r from-white to-white">
                    <div className="container lg:w-[75vw] p-4 md:p-10 py-10 mx-auto  bg-white  ">
                        <div className=" mx-auto p-10 flex flex-wrap   ">
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

                                <p className="leading-relaxed min-h-32">{freelancerData.aboutYourself}</p>

                                <div className="flex">
                                    <p className='text-sm'> <span className='font-semibold text-3xl'>{minamount} ₹ </span > Starting Price  </p>
                                    <Link href={`/booking/${freelancerData._id}`} className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Book Now</Link>


                                </div>
                                <div className="mt-4">
                                    {/* Display Freelancer Categories */}
                                    <h3 className="text-lg font-bold mb-2">Categories</h3>
                                    <div className='flex gap-4 flex-wrap'>
                                        {displayCategories(freelancerData.freelancerDetails)}
                                    </div>
                                </div>
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


<div className="bg-cover bg-center w-full flex flex-col md:flex-row text-center bg-gradient-to-b md:bg-gradient-to-r  py-5">
            <div className="flex flex-col items-center w-full justify-center py-10 md:px-20">
                <h1 className="text-3xl md:text-5xl text-center text-black" style={{ fontFamily: 'Poppins' }}>
                    CheckOut My Servicess
                </h1>
                <div className='flex flex-row flex-wrap items-center justify-center gap-5  w-[90vw] mt-9'>
                    {Object.entries(freelancerData.freelancerDetails).map(([category, details], index) => (
                        <ReactCardFlip isFlipped={flippedCardIndex === index} flipDirection="horizontal" key={index}>
                            {/* Front Side of the Card */}
                            <div
                                className='md:flex-row flex flex-col items-center justify-center w-[90vw] md:w-[25vw] h-[45vh]  bg-[#0E2041]   shadow-2xl bg-cover bg-center  m-1 p-7'
                                onClick={() => handleCardClick(index)}
                                style={{ backgroundImage: `url()` }}
                            >
                                <div className=''>
                                    <h1 className='text-xl md:text-4xl font-bold text-center text-[#F5AA2B]'>
                                        {category.replace(/\b\w/g, (char) => char.toUpperCase())}
                                    </h1>
                                    <div className=' my-5 flex flex-wrap text-left  justify-center items-center   text-white'>
                                        {details.subcategories.map((sub, idx) => (
                                            <span key={idx} className=" px-2 text-sm font-semibold ">
                                                {sub.replace(/\b\w/g, (char) => char.toUpperCase())}, 
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Back Side of the Card */}
                            <div
                                className='md:flex-row flex flex-col items-center justify-center w-[90vw] md:w-[25vw] h-[45vh]  bg-[#F5AA2B]   shadow-2xl bg-cover bg-center  m-1 p-7'
                                onClick={() => handleCardClick(index)}
                                style={{ backgroundImage: `url(/assets/category${index + 1}.jpg)` }}
                            >
                                <div className=''>
                                    {details.cameraDetails && (
                                        <div className='text-xl md:text-3xl text-center text-[#0E2041] font-bold'>
                                            {category === 'Photography' || category === 'Videography' || category === 'Candid Photography' || category === 'Cinematography' ? 'Camera Details' : 
                                             category === 'Drone' ? 'Drone Details' : 
                                             category === 'Video Editing' ? 'Video Editing Software' : ''}
                                            <div className='text-center'>
                                                {Object.entries(details.cameraDetails).map(([key, value]) => (
                                                    <p className='text-white inline-block font-bold md:text-lg text-sm mx-1' key={key}>
                                                        {`${key.replace(/\b\w/g, (char) => char.toUpperCase())}: ${value}`}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {details.price && (
                                        <div className='mt-4'>
                                            <h1 className='text-xl md:text-3xl text-center text-[#0E2041] font-bold'>Price</h1>
                                            <div>
                                                {Object.entries(details.price).map(([key, value]) => (
                                                    <p className='text-white inline-block font-bold md:text-lg text-sm mx-1' key={key}>
                                                        {`${key.replace(/\b\w/g, (char) => char.toUpperCase())}: ${value}`}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {details.weddingPrice && (
                                        <div className='mt-4'>
                                            <h1 className='text-xl md:text-3xl text-center text-[#0E2041] font-bold'>Wedding Price</h1>
                                            <div>
                                                {Object.entries(details.weddingPrice).map(([key, value]) => (
                                                    <p className='text-white inline-block font-bold md:text-lg text-sm mx-1' key={key}>
                                                        {`${key.replace(/\b\w/g, (char) => char.toUpperCase())}: ${value}`}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ReactCardFlip>
                    ))}
                </div>
            </div>
        </div>





            {/* image section */}
            <section>
                <h2 className='text-center text-5xl  font-bold  my-6'>Glimpses of My Work</h2>
                <h2 className='text-center text-3xl text-blue-500 font-bold mb-6'>Image Gallery</h2>
                <div className='flex flex-wrap mx-auto md:w-[80vw] items-center justify-center'>
                    {freelancerData.image?.map((imgSrc, index) => (
                        <img
                            key={index}
                            src={imgSrc} // dynamically load the image from the freelancerData
                            alt={`Freelancer Image ${index + 1}`}
                            className='md:w-[22vw] w-[85vw] object-cover aspect-square m-4 rounded-xl shadow-lg'
                        />
                    ))}
                </div>
            </section>


            {/* Video Section */}
            <section className='mt-10'>
                <h2 className='text-center text-3xl  text-blue-500 font-bold mb-6'>Video Gallery</h2>
                <div className='flex flex-wrap  mx-auto md:w-[80vw] items-center justify-center'>
                    {freelancerData.video?.map((videoLink, index) => (
                        <div key={index} className=' md:w-[25vw] w-[90vw] p-4'>
                            <div className='relative' style={{ paddingBottom: '70%' }}>
                                <iframe
                                    className='absolute top-0 left-0 w-full h-full rounded-3xl'
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
            </section>

            <section className='mt-20'>
      <div className='bg-gradient-to-r from-blue-100 to-blue-300'>
        <div className='text-center text-3xl lg:text-9xl'>
          <h3 className='text-center py-5 text-[18px] lg:text-6xl font-extrabold' style={{ fontFamily: 'Caveat' }}>
            Testimonial
          </h3>
        </div>
            <div className=''>
            <Slider {...settings}>
            {TestimonialData.map(({ id, img, name, text, star }) => {

              
              const truncatedText = text.split(' ').length > 20
                ? text.split(' ').slice(0, 20).join(' ')
                : text;

              return (
                <>
                  <div key={id} className='relative md:w-[30vw] mx-auto bg-gradient-to-r h-[21rem] md:h-80 from-white to-white  dark:text-black my-6  shadow-lg flex flex-col bg-primary/10 px-5 '>
                    <div className='block w-24 h-24 mx-auto rounded-full pt-4'>
                      <img src={img} alt="" className='rounded-full h-24 w-24' />
                    </div>
                    <div className='flex flex-col items-center text-center mt-10'>
                      <p className='text-sm h-28 md:h-20 text-center text-gray-500'>{truncatedText} {text.split(' ').length > 20 && <button onClick={() => handleReadMoreClick({ img, name, text, star })} className='blue1 inline-block'>...read more</button>}</p>

                      <div className='h-5 flex'>
                        {Array(5).fill(0).map((_, index) => (
                          index < star ? (
                            <StarIcon key={index} size="small" className="text-yellow-500" />
                          ) : (
                            <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                          )
                        ))}
                      </div>

                      <p className='text-xl font-bold my-4'>{name}</p>
                      <p className='absolute top-0 right-0 dark:text-gray-400  text-9xl font-serif text-black/20'>,,</p>
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
            <img src={selectedReview.img} alt={selectedReview.name} className="rounded-full w-24 h-24 mx-auto mb-4" />
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
    </section>


        </div>
    )
}

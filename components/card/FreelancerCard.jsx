"use client"
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { Box, Button, CircularProgress, Input, Modal } from '@mui/material';
import { toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DrawRoundedIcon from '@mui/icons-material/DrawRounded';

function FreelancerCard({
    approve = false,
    todelete = false,
    booking = false,
    edit = false,
    orders = false,
    viewMore = false,
    profile = false,
}) {
    const [freelancer, setFreelancer] = useState(null)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchResult, setSearchResult] = useState(null)
    const [selectedFr, setSelectedFr] = useState(null)
    const [user, setUser] = useState(null)
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [selectedFrName,setSelectedFrName]=useState('');
    const getFeelancer = useCallback(async () => {
        try {
            setLoading(true)
            console.log('getting freelancer')
            const response = await fetch("/api/freelancer");
            const data = await response.json();
            console.log('got freelancers', data)
            if (approve) {
                const res = data.filter((fr) => fr.isVerifiedByAdmin === false)
                setFreelancer(res);
                setSearchResult(res)
            } else {
                setFreelancer(data);
                setSearchResult(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }, [])
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log("token")
            const decodedUser = jwt.decode(token);
            setUser(decodedUser);
            if (!decodedUser.isAdmin) {
                router.push("/")
            }
        }
    }, [])
    useEffect(() => {
        // window.location.reload();
        getFeelancer()
    }, [getFeelancer])
    useEffect(() => {
        // const searchPosts =freelancer && freelancer.filter((fr) =>fr.name.toLowerCase().includes(search.trim().toLowerCase()));
        // setSearchResult(searchPosts)
        if (/\d/.test(search)) {
            const searchPosts = freelancer && freelancer.filter((u) =>
                u.phone.toString().includes(search.trim())
            );
            setSearchResult(searchPosts);
        } else {
            const searchPosts = freelancer && freelancer.filter((u) => u.name.toLowerCase().includes(search.trim().toLowerCase()));
            setSearchResult(searchPosts)
        }

    }, [setSearch, search])
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/admin/freelancer/${selectedFr}`)
            const data = await response.json()
            if (!data.success) {
                toast.error('failed to delete the freelancer', {
                    position: 'top-left',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
                setOpen(false)
            } else {
                toast.success('freelancer deleted successfully', {
                    position: 'top-left',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
                setOpen(false)
                getFeelancer()
            }
        } catch (error) {
            setOpen(false)
            console.log(error)
        }
    }
    const handleAccept = async (id) => {
        // const {adminId,freelancerId,isVerifiedByAdmin} = await req.json()
        const response = await fetch("/api/admin/freelancer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                adminId: user?.id,
                freelancerId: id,
                isVerifiedByAdmin: true
            })
        })
        const data = await response.json()
        console.log("dd", data)
        if (data.success && data.token) {
            localStorage.setItem("token", data?.token)
            toast.success('freelancer aprooved Successfuly', {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            getFeelancer()
        } else {
            toast.error('freelancer aprooved failed', {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
        }
    }
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
        <div className='w-full min-h-screen flex flex-col items-center  '>
            <div className='w-full flex  justify-center mb-5'>
                <input
                    className='w-[50%] rounded-lg placeholder:text-center text-xl  p-3 border border-gray-400 text-black placeholder-gray-300 '
                    placeholder='Search Freelancers by name / phone number'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='h-full w-[96%] flex flex-wrap gap-3   '>
                {searchResult?.map((fr) => (
                    <div className='relative flex flex-col bg-white shadow-2xl border p-5 rounded-xl md:w-[23vw] w-[90vw] ' key={fr._id}>
                        <div className='flex items-center gap-x-5'>
                            <img src={fr.profilePhoto} className='size-16 rounded-full border-4 border-gary-700 ' alt="freelancer image" />
                            <div className='flex flex-col '>
                                <div className='font-bold text-xl w-full'>{fr.name}</div>
                                <div className=' text-sm'>{fr.phone}</div>
                            </div>
                        </div>
                        <div className='text-sm text-gray-400 my-2 font-bold'>
                            <p className='text-sm '>Id :  <span className='text-gray-500 font-medium'> {fr._id}</span></p>
                            <p className='text-sm'>Email : <span className='text-gray-500 font-medium'>{fr.email}</span></p>
                            <p className=''>Address: <span className='text-gray-500 font-medium'>{fr.address}</span> </p>
                            <p className=''>City: <span className='text-gray-500 font-medium'>{fr.city}</span> </p>
                        </div>
                        {approve &&
                            <div className='w-full flex items-center justify-center mt-2 '>
                                <button disabled={fr.isVerifiedByAdmin} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${fr.isVerifiedByAdmin ? 'cursor-not-allowed' : ''}`} onClick={() => handleAccept(fr._id)}>Approve</button>
                            </div>
                        }
                        {todelete &&
                            <div className=' absolute right-0  '>
                                <DeleteForeverRoundedIcon
                                    onClick={() => {
                                        setOpen(true);
                                        setSelectedFr(fr._id);
                                        setSelectedFrName(fr.name);
                                    }}
                                    sx={{
                                        color: "red", // Sets the icon color to green
                                        fontWeight: "bold",
                                        borderRadius: "8px",
                                    }}
                                    className='text-4xl'
                                />
                                <h1 className='text-xs mr-2 -mt-1'>Delete</h1>
                                <Modal
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    aria-labelledby="modal-title"
                                    aria-describedby="modal-description"

                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            bgcolor: 'white',
                                            px: 5,
                                            py:10,
                                            borderRadius: 2,
                                            width: 400,
                                        }}
                                    >
                                        <div>
                                        </div>
                                        <div className="flex flex-col text-black">
                                            <div className="text-center text-xl font-bold">
                                                Are you sure you want to delete the <span className='text-red-500 font-bold'>{selectedFrName} </span> freelancer?
                                            </div>
                                            <div className="flex items-center justify-between mt-5">
                                                <Button
                                                    className="rounded-lg bg-red-600 text-white font-semibold px-4 py-2 hover:bg-red-400" 
                                                    onClick={() => handleDelete()}
                                                >
                                                    Delete
                                                </Button>
                                                <Button onClick={() => setOpen(false)} className="rounded-lg bg-green-600 text-white font-semibold px-4 py-2 hover:bg-green-400">
                                                Cancle
                                            </Button>
                                            </div>
                                        </div>
                                    </Box>
                                </Modal>
                            </div>
                        }
                        {edit &&
                                <div className='absolute right-14 top-5  flex items-center flex-col justify-center'>
                                    <DrawRoundedIcon  sx={{
                                        color: "#3b82f6", // Sets the icon color to green
                                        fontWeight: "light",
                                        borderRadius: "",
                                    }}
                                    className='text-3xl' onClick={() => { router.push(`freelancers/${fr._id}/edit/gallery`) }}>Edit</DrawRoundedIcon>
                                    <p className='text-xs mr-2 text-center'>Edit</p>
                                </div>
                            }
                        <div className='flex '>
                            {viewMore &&
                                <div className='w-full flex items-center justify-center mt-2 '>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => { router.push(`freelancers/${fr._id}`) }}>View More</button>
                                </div>
                            }
                            {booking &&
                                <div className='w-full flex items-center justify-center mt-2 '>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => { router.push(`freelancers/${fr._id}/bookings`) }}>Booking</button>
                                </div>
                            }
                            {profile &&
                                <div className='w-full flex items-center justify-center mt-2 '>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => { router.push(`freelancers/${fr._id}/profile`) }}>Profile</button>
                                </div>
                            }
                            {orders &&
                                <div className='w-full flex items-center justify-center mt-2 '>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => { router.push(`freelancers/${fr._id}/orders`) }}>Orders</button>
                                </div>
                            }
                        </div>


                    </div>
                ))}
            </div>
        </div>
    )
}

export default FreelancerCard
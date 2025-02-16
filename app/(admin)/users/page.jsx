"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import jwt from 'jsonwebtoken'
import { Box, Button, Input, Modal } from '@mui/material'
import { useRouter } from 'next/navigation'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DrawRoundedIcon from '@mui/icons-material/DrawRounded';

function page() {
    const [user, setUser] = useState([])
    const [search, setSearch] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const [open, setOpen] = useState(false)
    const [searchResult, setSearchResult] = useState(null)
    const router = useRouter()
    const getUsers = async () => {
        const response = await fetch("/api/admin/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ /* your request payload here */ }),
          });          
        const data = await response.json()
        if (!data.success) {
            toast.error('failed to fetch users')
        } else {
            setUser(data.users)
            setSearchResult(data.users)
        }
    }
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/admin/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
            if (!data.success) {
                setOpen(false)
                toast.error('failed to delete user')
            } else {
                toast.success('user deleted')
                setOpen(false)
                getUsers()
            }
        } catch (error) {
            setOpen(false)
            console.log(error)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            console.log("token")
            const decodedUser = jwt.decode(token);
            if (!decodedUser.isAdmin) {
                router.push("/")
            }
        }

    }, [])
    useEffect(() => {
        if (/\d/.test(search)) {
            const searchPosts = user && user.filter((u) =>
                u.phone.toString().includes(search.trim())
            );
            setSearchResult(searchPosts);
        } else {
            const searchPosts = user && user.filter((u) => u.name.toLowerCase().includes(search.trim().toLowerCase()));
            setSearchResult(searchPosts)
        }
    }, [setSearch, search])

    return (
        <div className='w-full min-h-screen flex flex-col'>
             <h1 className='text-3xl font-bold text-center my-2'>Users</h1>
            <div className='w-full flex items-center justify-center mb-5'>
                <input
                    className='md:w-[50%] w-[95vw] rounded-lg placeholder:text-center text-xl  p-3 border border-gray-400 text-black placeholder-gray-300 '
                    placeholder='search users by name / phone number'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='h-full  flex flex-wrap gap-x-4 gap-y-4 justify-center items-center   mx-4 '>
                {searchResult?.map((user) => (
                    <div className='flex flex-col bg-white shadow-2xl rounded-xl p-4 md:w-[23vw] w-[95vw] relative' key={user?._id}>
                        <p className='text-sm text-gray-400 font-bold'>Id :  <span className='text-gray-500 font-medium'> {user?._id}</span></p>
                        <div className='rounded-full w-full flex items-center gap-x-3 '>
                            <img src={user?.profilePhoto} className='size-16 rounded-full border-4 border-gary-700' alt="freelancer image" />
                            <div>
                                <p className='font-bold text-lg w-full '>{user?.name}</p>
                                <p className='font-medium'>{user?.phone}</p>
                            </div>
                        </div>
                        <div className='absolute top-4 right-4'>
                            <DeleteForeverRoundedIcon sx={{
                                        color: "red", // Sets the icon color to green
                                        fontWeight: "bold",
                                        borderRadius: "8px",
                                    }} onClick={() => { setOpen(true); setSelectedUser(user._id) }} className={`text-4xl `} />
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
                                        p: 4,
                                        borderRadius: 2,
                                        width: 400,
                                    }}
                                >
                                    <div>
                                        <Button onClick={() => setOpen(false)} className="text-black">
                                            Close
                                        </Button>
                                    </div>
                                    <div className="flex flex-col text-black">
                                        <div className="text-center text-xl font-bold">
                                            Are you sure you want to delete the user?
                                        </div>
                                        <div className="flex items-center justify-center mt-5">
                                            <Button
                                                className="rounded-xl bg-blue-400 text-white"
                                                onClick={() => handleDelete()}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                        <div className='w-full flex items-center justify-center mt-2'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => router.push(`/users/${user?._id}/orders`)}>Placed Orders</button>
                        </div>
                        <div className='absolute top-4 right-12'>
                            <DrawRoundedIcon className='text-4xl text-blue-500' onClick={() => router.push(`/users/${user?._id}/edit`)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page
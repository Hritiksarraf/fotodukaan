"use client"
import { Search } from '@mui/icons-material';
import { Box, Button, CircularProgress, Input, Modal } from '@mui/material';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import DrawRoundedIcon from '@mui/icons-material/DrawRounded';

function OrderCard({
    orders,
    cancel = true,
    onDelete = false,
    onEdit = false,
    approve = false,
    isInside = false,
    path = '/'
}) {
    // console.log("ooo0", orders)

    const [openOrder, setOpenOrder] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedCancel, setSelectedCancel] = useState('')
    const [search, setSearch] = useState('')
    const [reason, setReason] = useState(null)
    const [finalorders, setFinalOrders] = useState(orders)
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openPayment, setOpenPayment] = useState(false)

    const router = useRouter()
    useEffect(() => {
        setFinalOrders(orders)
    }, [orders])
    useEffect(() => {
        const filteredOrders = orders?.filter(order => order._id.toString().includes(search));
        console.log("fff", filteredOrders)
        setFinalOrders(filteredOrders);
    }, [setSearch, search])

    const handleApprove = async (id) => {
        const response = await fetch(`/api/admin/order/approve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        })
        const data = await response.json()
        console.log(data)
        console.log("approved", data)
        if (!data.success) {
            toast.error('failed to approve order', {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            toast.success('Order approved', {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setTimeout(() => {
                window.location.reload();
            }, 4000); // 3000 milliseconds = 3 seconds
        }
    }
    const handleCancel = async (item) => {
        console.log(selectedOrderId, reason, selectedCancel)
        try {
            const response = await fetch('/api/order/cancle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId: selectedOrderId, reason: reason, who: selectedCancel }),
            });

            if (response.ok) {
                // window.location.reload();
                alert('Order canceled successfully');
            } else {
                alert('Failed to cancel the order');
            }
        } catch (error) {
            alert('An error occurred while canceling the order');
        }
    };


    const handleCancel2 = async (item) => {
        if (!reason) {
            alert('please enter the reason to cancel the order')
        } else {
            if (selectedCancel == 'user') {
                const response = await fetch("/api/order/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: selectedOrderId, reason: reason, }),
                    cache: "no-store"
                })
                const data = await response.json()
                console.log(data)
                if (!data.success) {
                    toast.error('failed to cancel users order')
                } else {
                    toast.success('users order canceled successfully')
                    setOpen(false)
                    setSelectedCancel('')
                    // window.location.reload()
                }
            } else if (selectedCancel == 'freelancer') {
                const response = await fetch("/api/order/freelancer/cancel", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: selectedOrderId, freelancerCancelReason: reason })
                })
                const data = await response.json()
                if (!data.success) {
                    toast.error('failed to cancel freelancer order')
                } else {
                    toast.success('freelancer order canceled successfully')
                    setOpen(false)
                    setSelectedCancel('')
                }
            } else {
                alert('enter proper role to cancel the order')
            }
        }
    }
    if (!orders) {
        return (<div className='min-h-[80vh] w-[100vw]'>
            <Box sx={{ display: 'flex' }}>
                <div className='pt-80 flex items-center justify-center text-center mx-auto  '>
                    <CircularProgress color="inherit" size="8rem" />
                </div>
            </Box>
        </div>);
    }
    return (
        <div className='w-full h-full flex flex-col '>
            <div className='flex items-center justify-center'>
                <div className='w-[55vw] mx-10 my-5 flex relative'>
                    <input
                        placeholder='search order by id'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='rounded-lg flex-1 px-4 py-3 border-2 border-blue-400'
                    />
                    <div className=' absolute top-2 right-2'>
                        <Search className='text-4xl text-gray-500' />
                    </div>
                </div>
            </div>
            {!finalorders && <h1>no order</h1>}
            <div className='h-full w-[100%] gap-4  mb-5 flex items-center justify-center flex-wrap'>
                {finalorders && finalorders.map((item) => (
                    <div key={item._id} className='bg-white rounded-xl p-6 shadow-2xl w-[24vw] relative border border-gray-300'>
                        <p className='text-xs text-gray-600 font-bold'>Order id: <span className='font-medium text-blue-900'>{item?._id || ""}</span></p>
                        <div className=''>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <div>
                                <h1 className='border-b-2 font-bold text-blue-900'>Freelancers Details</h1>
                                <div className='text-sm text-gray-600 font-bold'>Name: <span className='font-medium'>{item?.freelancerName || ""}</span></div>
                                <div className='text-sm text-gray-600 font-bold'>Phone: <span className='font-medium'> {item?.freelancerPhone || ""}</span></div>
                            </div>
                            <div>
                                <h1 className='border-b-2 font-bold text-blue-900'>Customer Details</h1>
                                <div className='text-sm text-gray-600 font-bold'>Name: <span className='font-medium' >{item.customerName}</span> </div>
                                <div className='text-sm text-gray-600 font-bold'>Phone: <span className='font-medium'>{item?.customerPhone || ""}</span> </div>
                            </div>
                            <div>
                                <h1 className='border-b-2 font-bold text-blue-900'>Service Details</h1>

                                <p className='text-sm text-gray-600 font-bold'>Address: <span className='font-medium'>   {item?.address || ""}</span></p>
                                <div className='flex items-center '>
                                    <p>Date:</p>

                                    <div className='flex flex-wrap'>{item.date.split(",").map((date, index) => (
                                        <p key={index} className="text-sm text-gray-600 px-2 border-r-2 font-medium">
                                            {date}
                                        </p>
                                    ))}</div>

                                </div>
                                <p className='text-sm text-gray-600 font-bold'>City: <span className='font-medium'>{item?.city || ""}</span> </p>
                                <p className='text-sm text-gray-600 font-bold'>Pincode: <span className='font-medium'> {item?.pinCode || ""}</span></p>
                            </div>

                        </div>

                        {cancel && !item?.customerCancel && !item?.freelancerCancel && !item?.freelancerAproved &&
                            <div className='absolute bottom-3 right-16 hover:cursor-pointer'>
                                <CancelPresentationRoundedIcon onClick={() => { setSelectedOrderId(item._id); setOpen(true) }} className={`rounded-xl text-4xl text-red-500  disabled:cursor-not-allowed `} >Cancel</CancelPresentationRoundedIcon>
                                <h1 className='text-xs text-red-500 -mt-1'>Cancle</h1>
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
                                            {selectedCancel === '' && (
                                                <>
                                                    <div className="text-center text-xl font-bold">
                                                        Who Should Cancel the Order?
                                                    </div>
                                                    <div className="flex items-center justify-center mt-5">
                                                        <Button
                                                            className="rounded-xl bg-blue-400 text-white"
                                                            onClick={() => setSelectedCancel('user')}
                                                        >
                                                            User Cancel
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center justify-center mt-5">
                                                        <Button
                                                            className="rounded-xl bg-blue-400 text-white"
                                                            onClick={() => setSelectedCancel('freelancer')}
                                                        >
                                                            Freelancer Cancel
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                            {(selectedCancel === 'user' || selectedCancel === 'freelancer') && (
                                                <>
                                                    <div className="text-center text-xl font-bold">
                                                        Are you sure you want to cancel the order?
                                                    </div>
                                                    <div>Enter the reason for canceling the order:</div>
                                                    <input
                                                        value={reason}
                                                        onChange={(e) => setReason(e.target.value)}
                                                        placeholder="Reason for canceling"
                                                        className="rounded-lg p-2 border w-full mt-2"
                                                    />
                                                    <div className="flex items-center justify-center mt-4">
                                                        <Button
                                                            className="bg-blue-400 text-white rounded-lg"
                                                            onClick={() => handleCancel(item)}
                                                        >
                                                            Cancel the Order
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center justify-center mt-2">
                                                        <Button
                                                            className="bg-gray-400 text-white rounded-lg"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            Close
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </Box>
                                </Modal>
                            </div>
                        }

                        <div className='flex gap-2'>
                            {!item.admineApproved &&
                                <div className=' flex items-center justify-center mt-5'>
                                    <button disabled={(item?.admineApproved || false)} className={`rounded-xl bg-green-500 px-4 py-2 hover:bg-blue-400 text-white ${(item?.admineApproved || false) ? "cursor-not-allowed" : ""} `} onClick={() => handleApprove(item?._id)}>Approve</button>
                                </div>
                            }



                            <div className='  flex items-center justify-center mt-5 hover:cursor-pointer'>
                                <button onClick={() => { setSelectedOrder(item); setOpenPayment(true) }} className={`rounded-xl bg-blue-500 px-4 py-2 hover:bg-blue-400 text-white`} >payment details</button>
                                <Modal
                                    open={openPayment}
                                    onClose={() => setOpenPayment(false)}
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
                                            <div>
                                                <h1 className='border-b-2 font-bold text-blue-900'>Payment Details</h1>
                                                <div className='text-sm text-gray-600 font-bold'>Payment id: <span className='font-medium'>{selectedOrder?.orderId || ""}</span> </div>
                                                <div className='text-sm text-gray-600 font-bold'>Total Amount: <span className='font-medium'>{selectedOrder?.totalAmount || ""}</span> </div>
                                                <div className='text-sm text-gray-600 font-bold'>Paid Amount: <span className='font-medium'>{selectedOrder?.paidAmount || ""}</span> </div>
                                                <div className='text-sm text-gray-600 font-bold'>Discount Given: <span className='font-medium'> {selectedOrder?.discount || ""}</span></div>
                                                <div className='text-sm text-gray-600 font-bold'>Full Payment on website: <span className='font-medium'> {!selectedOrder?.paidOnWeb ? 'No' : 'Yes'}</span></div>
                                            </div>
                                        </div>
                                    </Box>
                                </Modal>
                            </div>



                            {/* {onDelete &&
                            <div className=' absolute top-3 right-3'>
                                <DeleteForeverRoundedIcon className='rounded-xl text-4xl text-red-500 ' onClick={() => handleDelete(item?._id)}>Delete the Order</DeleteForeverRoundedIcon>
                                <h1 className='text-xs mr-2 -mt-1'>Delete</h1>
                            </div>
                        } */}
                            {onEdit &&
                                <div className=' flex flex-col items-center justify-center mt-5 ml-auto absolute bottom-3 right-4 hover:cursor-pointer'>
                                    <DrawRoundedIcon className='rounded-xl bg-white text-blue-500 text-3xl ' onClick={() => router.push(`/orders/${item?._id}`)}>Edit the Order</DrawRoundedIcon>
                                    <h1 className='text-sm text-blue-500'>Edit</h1>
                                </div>
                            }
                        </div>




                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrderCard
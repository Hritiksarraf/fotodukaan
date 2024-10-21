'use client';

import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AddPhotoAlternateOutlined from '@mui/icons-material/AddPhotoAlternateOutlined';
import jwt from "jsonwebtoken";
import EditBar from '@/components/editBar/EditBar';

export default function ProfileUpdateForm() {
    const [loading, setLoading] = useState(true);
    const [freelancerData, setFreelancerData] = useState({
        name: "",
        email: "",
        profilePhoto: null,
        city: "",
        address: "",
        aboutYourself: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [localUser, setLocalUser] = useState(null);

    // Fetch freelancer data
    const getFreelancerData = async () => {
      if(localUser){
        const response = await fetch(`/api/freelancer/${localUser.userid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setFreelancerData(data);
        
      }
    };

    useEffect(() => {
        getFreelancerData();
    }, [localUser]);
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
          const decodedUser = jwt.decode(token);
          setLocalUser(decodedUser);
          setLoading(false);
      }
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [freelancerData])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFreelancerData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!freelancerData.name || !freelancerData.email || !freelancerData.city || !freelancerData.address || !freelancerData.startingPrice || !freelancerData.halfDayPrice || !freelancerData.extraHourPrice || !freelancerData.aboutYourself) {
            alert("Please fill out all required fields.");
            return;
        }

        setUploading(true);

        let profilePhotoUrl = freelancerData.profilePhoto;

        // If new file is selected, upload to Cloudinary
        const id=freelancerData._id;
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("upload_preset", "social");
            formData.append("cloud_name", "hritiksarraf");

            const imgResponse = await fetch("https://api.cloudinary.com/v1_1/hritiksarraf/image/upload", {
                method: "POST",
                body: formData,
            });

            if (imgResponse.ok) {
                const imgResult = await imgResponse.json();
                profilePhotoUrl = imgResult.url;
            } else {
                setUploading(false);
                alert("Image upload failed");
                return;
            }
        }

        // Post the updated freelancer profile data
        const response = await fetch('/api/edit/profile', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...freelancerData,
                profilePhoto: profilePhotoUrl,
                id
            }),
        });

        if (response.ok) {
            alert("Profile updated successfully");
            setSelectedFile(null); // Clear the selected file after successful upload
        } else {
            alert("Failed to update profile");
        }

        setUploading(false);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <div className="flex items-center justify-center min-h-screen mx-auto">
                    <CircularProgress color="inherit" size="8rem" />
                </div>
            </Box>
        );
    }

    return (
      <div className='min-h-75vh] pt-32 overflow-x-hidden'>
        <div>
          <EditBar/>
        </div>
        <div className="min-h-screen flex justify-center items-center p-10">
            <form className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-blue-100" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={freelancerData.name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={freelancerData.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
    <label className="block text-sm font-bold mb-2">City</label>
    <select
        name="city"
        value={freelancerData.city}
        onChange={handleInputChange}
        className="w-full border border-gray-300 p-2 rounded-lg"
        required
    >
        <option value={freelancerData.city}>{freelancerData.city}</option> {/* Placeholder option */}
        <option value="Patna">Patna</option>
        <option value="Muzaffarpur">muzaffarpur</option>
    </select>
</div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={freelancerData.address}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">About Yourself</label>
                    <textarea
                        name="aboutYourself"
                        value={freelancerData.aboutYourself}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Profile Photo</label>
                    <div className="flex items-center">
                        {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected"
                                width={100}
                                height={100}
                                className="object-cover rounded-lg"
                            />
                        ) : freelancerData.profilePhoto ? (
                            <img
                                src={freelancerData.profilePhoto}
                                alt="Profile"
                                width={100}
                                height={100}
                                className="object-cover rounded-lg"
                            />
                        ) : (
                            <AddPhotoAlternateOutlined sx={{ fontSize: "50px", color: "black" }} />
                        )}
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="ml-4"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg"
                >
                    {uploading ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
        </div>
    );
}

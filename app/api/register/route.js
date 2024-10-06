import Freelancer from "@/lib/models/Register";
import { connectToDB } from "@/lib/mongodb/mongoose";
var CryptoJS = require("crypto-js");

export const POST = async (req) => {
  try {
    await connectToDB();

    const { 
      name, 
      email, 
      password, 
      phone, 
      city, 
      address, 
      startingPrice, 
      halfDayPrice, 
      extraHourPrice, 
      aboutYourself,
      profilePhoto,
      selectedCategories 
    } = await req.json();

    // Check if user already exists
    const existingUser = await Freelancer.findOne({ phone: phone });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "freelancer already exists" }),
        { status: 400 }
      );
    }
    const imgData = new FormData();
    imgData.append("file", profilePhoto);
    imgData.append("upload_preset", "FotoDukaan");
    imgData.append("cloud_name", "hritiksarraf");

    const imgResponse = await fetch("https://api.cloudinary.com/v1_1/hritiksarraf/image/upload", {
      method: "POST",
      body: imgData,
    });

    if (!imgResponse.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const imgUrl = await imgResponse.json();
    const profilePhotoUrl = imgUrl.url;
    // Encrypt password
    const encryptedPassword = CryptoJS.AES.encrypt(password, "fotoDukaan@Mani2003").toString();

    // Create new freelancer instance
    let f = new Freelancer({
      name:name,
      email:email,
      phone:phone,
      password: encryptedPassword,
      city:city,
      address:address,
      startingPrice:startingPrice,
      halfDayPrice:halfDayPrice,
      extraHourPrice:extraHourPrice,
      aboutYourself:aboutYourself,
      profilePhoto:profilePhotoUrl,  // If you plan to handle this as a file, ensure you're handling file upload properly
      freelancerDetails:selectedCategories,  // Assuming categories is an array or object
    });

    // Save freelancer to database
    await f.save();

    return new Response(JSON.stringify({ success: "success" }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ error: "freelancer cannot be registered" }),
      { status: 500 }
    );
  }
};

import { connectToDB } from "@/lib/mongodb/mongoose";
import Freelancer from "@/lib/models/Register";
var jwt = require("jsonwebtoken");

// This is the route handler for the POST request
export async function POST(req) {
    try {
        const {
            name,
            email,
            profilePhoto,
            city,
            address,
            startingPrice,
            halfDayPrice,
            extraHourPrice,
            aboutYourself,
            id
        } = await req.json(); // Parse the incoming JSON data

        await connectToDB();  // Connect to the database

        const freelancerId = id ;  // Mock ID for now

        const freelancer = await Freelancer.findById(freelancerId);

        if (!freelancer) {
            return new Response(JSON.stringify({ message: "Freelancer not found" }), { status: 404 });
        }

        freelancer.name = name;
        freelancer.email = email;
        freelancer.profilePhoto = profilePhoto;
        freelancer.city = city;
        freelancer.address = address;
        freelancer.startingPrice = startingPrice;
        freelancer.halfDayPrice = halfDayPrice;
        freelancer.extraHourPrice = extraHourPrice;
        freelancer.aboutYourself = aboutYourself;

        var token = jwt.sign(
            {
              phone: freelancer.phone,
              name: name,
              userid: freelancer._id,
              email: email,
              profilePhoto: profilePhoto,
              freelancer: true,
            },
            "jwtfotoDukaan@Mani2003"
          );

          console.log("Token", token);

        // Save the updated freelancer data
        await freelancer.save();

        

        return new Response(JSON.stringify({ message: "Profile updated successfully", freelancer, token }), { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}

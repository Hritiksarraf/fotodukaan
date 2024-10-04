import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export const POST = async (req) => {
  try {
    await connectToDB();
    const {phone ,password } = await req.json();
    
    // Find the user by email
    let user = await User.findOne({ phone: phone });
    
    // Check if user exists
    if (user) {
      // Decrypt the stored password
      var bytes = CryptoJS.AES.decrypt(user.password, "fotoDukaan@Mani2003");
      var checkpass = bytes.toString(CryptoJS.enc.Utf8);
      
      // Validate the password
      if (password === checkpass) {
        // Generate JWT token
        var token = jwt.sign(
          {
            phone: user.phone,
            name:user.name,
            userid:user._id,
            email:user.email,
            profilePhoto:user.profilePhoto
          },
          "jwtfotoDukaan@Mani2003"  // Token expiry added here
        );
        
        // Return success response with token
        return new Response(JSON.stringify({ success: true, token }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        // Incorrect password
        return new Response(JSON.stringify({ error: "incorrect password" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    } else {
      // No user found
      return new Response(JSON.stringify({ error: "no user found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    // Handle errors
    console.log(err);
    return new Response(JSON.stringify({ error: "Failed to authenticate" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

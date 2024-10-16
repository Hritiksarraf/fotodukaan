import { connectToDB } from "@/lib/mongodb/mongoose";
import Order from "@/lib/models/order";
import User from "@/lib/models/User";
import Freelancer from "@/lib/models/Register";
import { ObjectId } from "mongodb";

export async function POST(req) {
  await connectToDB();

  try {
    const {
      name,
      email,
      phone,
      pinCode,
      address,
      city,
      date,
      paidAmount,
      totalAmount,
      discount,
      service,
      event,
      additionalDetails,
      userid,
      freelancerid,
      time
    } = await req.json();

    // Validation (ensure required fields are present)
    if (!name || !email || !phone || !pinCode || !address || !city || !date || !paidAmount || !totalAmount || !service || !event || !userid || !freelancerid) {
      return new Response(
        JSON.stringify({ error: "All required fields must be filled." }),
        { status: 400 }
      );
    }

    // Create a new order object
    const newOrder = new Order({
      name,
      email,
      phone,
      pinCode,
      address,
      city,
      date,
      paidAmount,
      totalAmount,
      discount,
      service,
      event,
      additionalDetails: additionalDetails || [],
      userId: userid,
      freelancerId: freelancerid,
      time:time
    });

    // Save the order to the database
    await newOrder.save();

    const orderId = newOrder._id;

    // Update the user's order array
    const freelancerUserUpdate = await Freelancer.findById(userid);
    if (freelancerUserUpdate) {
      // Freelancer exists, update the freelancer's orders array
      if (!freelancerUserUpdate.booking) {
        freelancerUserUpdate.booking = []; // Initialize orders array if it doesn't exist
      }
      freelancerUserUpdate.booking.push(orderId);
      await freelancerUserUpdate.save();
    } else {
      // If the freelancer is not found, check in the User collection
      const userUpdate = await User.findById(userid);
      if (!userUpdate) {
        return new Response(
          JSON.stringify({ error: "User not found" }),
          { status: 404 }
        );
      }

      // User exists, update the user's orders array
      if (!userUpdate.booking) {
        userUpdate.booking = []; // Initialize orders array if it doesn't exist
      }
      userUpdate.booking.push(orderId);
      await userUpdate.save();
    }

    // Update the freelancer's order array
    const freelancerUpdate = await Freelancer.findById(freelancerid);
    if (!freelancerUpdate.orders) {
      freelancerUpdate.orders = [];
    }
    freelancerUpdate.orders.push(orderId);
    await freelancerUpdate.save();

    // Return success response with the new order
    return new Response(
      JSON.stringify({ message: "Order created successfully", order: newOrder }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "An error occurred while creating the order." }),
      { status: 500 }
    );
  }
}

import crypto from "crypto";
import { connectToDB } from "@/lib/mongodb/mongoose";
import Order from "@/lib/models/order";
import User from "@/lib/models/User";
import Freelancer from "@/lib/models/Register";

// Secret from Razorpay dashboard (keep this secure)
const RAZORPAY_WEBHOOK_SECRET = "FotoDukaan@RazorPay@WebHook@Secret";

export async function POST(req) {
  await connectToDB();

  // Step 1: Verify the Razorpay webhook signature
  const signature = req.headers["x-razorpay-signature"];
  const body = await req.text(); // Get the raw body for signature verification

  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return new Response(
      JSON.stringify({ error: "Invalid webhook signature" }),
      { status: 400 }
    );
  }

  // Step 2: Parse the JSON data from Razorpay webhook payload
  const payload = JSON.parse(body);
  console.log(payload);

  // Check if it's the `order.paid` event
  

  try {
    // Extract necessary details from the payload
    const {
      email,
      contact,
      notes: {
        name,
        pinCode,
        address,
        city,
        date,
        totalAmount,
        discount,
        service,
        event,
        additionalDetails = [],
        userid,
        freelancerid,
        time,
        isPolicyAccepted,
        orderId
      }
    } = payload.payload.payment.entity;

    // Fetch freelancer details
    const freelancer = await Freelancer.findById(freelancerid);
    if (!freelancer) {
      return new Response(
        JSON.stringify({ error: "Freelancer not found" }),
        { status: 404 }
      );
    }

    // Step 3: Create the order based on the data received
    const newOrder = new Order({
      customerName: name,
      freelancerName: freelancer.name,
      customerEmail: email,
      freelancerEmail: freelancer.email,
      customerPhone: Number(contact),
      freelancerPhone: Number(freelancer.phone),
      pinCode,
      address,
      city,
      date,
      paidAmount: payload.payload.payment.entity.amount / 100, // Amount in INR
      totalAmount: Number(totalAmount),
      discount,
      service,
      event,
      additionalDetails,
      userId: userid,
      freelancerId: freelancerid,
      isPolicyAccepted,
      time,
      orderId
    });

    // Save the order to the database
    await newOrder.save();

    // Update the user's booking and blocked dates in Freelancer and User collections
    const newOrderId = newOrder._id;
    const freelancerUserUpdate = await Freelancer.findById(userid);

    // Update blocked dates and booking in the Freelancer
    const bookingEntry = { date, event };
    freelancerUserUpdate.blockedDates.push(bookingEntry);
    freelancerUserUpdate.booking.push(newOrderId);
    await freelancerUserUpdate.save();

    // Update booking in User collection if not found in Freelancer
    const userUpdate = await User.findById(userid);
    if (userUpdate) {
      userUpdate.booking.push(newOrderId);
      await userUpdate.save();
    }

    // Update freelancer's order list
    freelancer.orders.push(newOrderId);
    await freelancer.save();

    // Respond with a success message
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

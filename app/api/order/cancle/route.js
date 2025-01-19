import User from "@/lib/models/User";
import Freelancer from "@/lib/models/Register";
import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const POST = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body
    const { orderId, reason, who } = await req.json();

    // Validate input
    if (!orderId || !reason || !who) {
      return new Response(
        JSON.stringify({ error: "Provide all required information." }),
        { status: 400 }
      );
    }

    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return new Response(
        JSON.stringify({ error: "Order not found." }),
        { status: 404 }
      );
    }

    // Update cancellation status based on `who`
    if (who === "user") {
      order.customerCancel = true;
    } else if (who === "freelancer") {
      order.freelancerCancel = true;
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid 'who' value. Must be 'user' or 'freelancer'." }),
        { status: 400 }
      );
    }

    // Get the current date in Indian Standard Time (IST)
    const currentISTDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    // Add cancellation details
    if (!order.additionalDetails) {
      order.additionalDetails = [];
    }
    order.additionalDetails.push({
      cancel: {
        reason: reason,
        refund: false,
        cancelTime: currentISTDate, // Store current date in IST
        refundTime: "", // Placeholder for future refund date
        refundAmount:'',
        eligible:true
      },
    });

    // Save the updated order
    await order.save();

    return new Response(
      JSON.stringify({ message: "Order updated successfully.", order }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in POST:", err);
    return new Response(
      JSON.stringify({ error: "Error updating the order." }),
      { status: 500 }
    );
  }
};

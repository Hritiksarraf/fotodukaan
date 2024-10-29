import Freelancer from "@/lib/models/Register";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const user = await Freelancer.findOne({ _id: params.id })
    

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to get user", { status: 500 });
  }
};

// for blocking the dates
export const POST = async (req, { params }) => {
  try {
    await connectToDB();
    const { freelancerId } = params.id;
    const { blockedDates } = req.body;
    const user = await Freelancer.findOne({ _id: freelancerId });
    user.blockedDates = [...user.blockedDates, ...blockedDates];
    await user.save();
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response("Failed to block dates", { status: 500 });
  }
}
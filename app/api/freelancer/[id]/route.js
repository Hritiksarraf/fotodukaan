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

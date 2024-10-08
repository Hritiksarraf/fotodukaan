import { connectToDB } from "@/lib/mongodb/mongoose";
import Freelancer from "@/lib/models/Register"; // Assuming Register is your Freelancer model

export const GET = async (req, { params }) => {
  let { people, place } = params;

  try {
    // Log the incoming query for debugging
    console.log("Category and place query received:", people, place);

    // Ensure the parameters are strings
    people = String(people);
    place = String(place);

    // Connect to the database
    await connectToDB();

    // Use regex for case-insensitive search in both freelancerDetails and place (city)
    const searchedFreelancers = await Freelancer.find({
      [`freelancerDetails.${people}`]: { $exists: true },  // Check if the category exists in freelancerDetails
      city: { $regex: place, $options: "i" }  // case-insensitive search for city/place
    });

    // Check if no freelancers were found
    if (searchedFreelancers.length === 0) {
      return new Response(JSON.stringify({ message: "No data found" }), { status: 404 });
    }

    // Return the found freelancers
    console.log("Searched freelancers by category and place:", searchedFreelancers);
    return new Response(JSON.stringify(searchedFreelancers), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get freelancers by category and place", { status: 500 });
  }
};

import Admin from "@/lib/models/Admin";
import Freelancer from "@/lib/models/Register";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET=async(req,res)=>{
    try {
        await connectToDB();
        const admins = await Admin.findById('6729c8943c69154e63d2e3ee')
        const freelancer = await Freelancer.find().select("_id name email phone profilePhoto address city pinCode")
        admins.freelancerToBeApproved=freelancer
        await admins.save()
        
        return new Response(
            JSON.stringify({
                success: true,
                data: admins
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
} catch (error) {
    console.log(error);
    return new Response(
        JSON.stringify({ error: "Could not do the operation" }),
        {
            status: 500,
            headers: { "Content-Type": "application/json" }
        }
    );
}
}
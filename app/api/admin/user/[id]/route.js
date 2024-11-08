import User from "@/lib/models/User";

export const GET= async(req,{params})=>{
    try {
        const user = await User.findByIdAndDelete(params.id)
        if(!user) {
            return new Response(
                JSON.stringify({ error: "user couldnot be deleted",success:false }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        return new Response(
            JSON.stringify({ message: "user deleted successfully" ,success:true}),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ error: "failed to delete the user" ,success:false}),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}

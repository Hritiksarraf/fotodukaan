import User from "@/lib/models/User";

export const POST= async(req,{params})=>{
    try {
        const {id} = await req.json()
        const user = await User.findById(id).populate({
            path:"booking",
            model:'Order',
        })
        if(!user) {
            return new Response(
                JSON.stringify({ error: "user is not there",success:false }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        return new Response(
            JSON.stringify({ message: "user found successfully" ,user,success:true}),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ error: "failed to find the user" ,success:false}),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}

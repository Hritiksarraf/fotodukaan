import Order from "@/lib/models/order";

export const POST=async(req,{params})=>{
    try {
        const {id} = await req.json()
        const order = await Order.findById(id)
        if(!order){
            return new Response(
                JSON.stringify({ error: "failed to find the order",success:false }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        order.freelancerAproved=false
        await order.save()
        return new Response(
            JSON.stringify({ message: "freelancer approved changed successfully",success:true }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "failed to approve the order",success:false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
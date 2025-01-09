import Order from "@/lib/models/order";

export const POST=async(req,{params})=>{
    try {
        const {id,freelancerCancelReason} = await req.json()
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
        order.orderId=toString(id)
        order.freelancerCancel=true
        order.freelancerAproved=false
        if(freelancerCancelReason) order.freelancerCancelReason=freelancerCancelReason
        await order.save()
        return new Response(
            JSON.stringify({ message: "order cancelled successfully",success:true }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ error: "failed to cancel the order",success:false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
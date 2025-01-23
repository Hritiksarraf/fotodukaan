import Order from "@/lib/models/order";
import Freelancer from "@/lib/models/Register";

export const GET = async(req,{params})=>{
    try {
        const freelancer = await Freelancer.findOneAndDelete({_id:params.id})
        if(!freelancer){
            return new Response(
                JSON.stringify({ error: "failed to delete the freelancer",success:false }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        return new Response(
            JSON.stringify({ message: "freelancer deleted successfully" ,success:true}),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error: "failed to delete the freelancer" ,success:false}),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}

export const POST = async(req,{params})=>{
    try {
        const {orderIds} = await req.json()
        const freelancer = await Freelancer.findById({_id:params.id})
        if(!freelancer){
            return new Response(
                JSON.stringify({ error: "failed to delete the freelancer",success:false }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        console.log(orderIds)
        const orders = await Order.find({ _id: { $in: orderIds } });
        const reversedOrders = orders.reverse();
        console.log(orders)
        if(!orders){
            return new Response(
                JSON.stringify({ error: "failed to fetch booking the freelancer", success:false }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }   

        return new Response(
            JSON.stringify({ message: "booking fetched successfully",bookings:reversedOrders ,success:true}),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error: "failed to delete the freelancer" ,success:false}),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}


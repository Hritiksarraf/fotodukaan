import Order from "@/lib/models/order";

export const GET=async(req,{params})=>{
    try {
        const order = await Order.findByIdAndDelete(params.id)
        if(!order){
            return new Response(
                JSON.stringify({ error: "failed to delete the order",success:false }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        return new Response(
            JSON.stringify({ message: "order deleted successfully",success:true }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "failed to delete the order",success:false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
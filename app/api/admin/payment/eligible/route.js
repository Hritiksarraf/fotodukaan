import Order from "@/lib/models/order";

export const POST = async(req, _) => {
    try {
        const { orderId } = await req.json();
        console.log(orderId)
        const order = await Order.findOne({ _id: orderId });
        console.log(order)
        if (!order) {
            return new Response(
                JSON.stringify({ success: false, message: "order not found" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        console.log(order.additionalDetails)
        // if(Array.isArray(order.additionalDetails) && order.additionalDetails.length > 0){
        //     order.additionalDetails[0].cancel.eligible = true;
        // }

        return new Response(
            JSON.stringify({ success: true, message: "made refund available successfully" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
        
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error: "failed to make refund eligible", success: false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }    
};

import Order from "@/lib/models/order";

export const POST = async(req, _) => {
    try {
        const { orderId,amt } = await req.json();
        const order = await Order.findOne({ _id: orderId });
        if (!order) {
            return new Response(
                JSON.stringify({ success: false, message: "order not found" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        if(Array.isArray(order.additionalDetails) && order.additionalDetails.length > 0){
            order.additionalDetails[0].cancel.eligible = true;
            order.additionalDetails[0].cancel.refundAmount = amt;
            console.log(order.additionalDetails[0])
        }
        await order.save({validateBeforeSave:false});

        return new Response(
            JSON.stringify({ success: true, message: "refund done" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
        
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error: "failed to make refund ", success: false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }    
};

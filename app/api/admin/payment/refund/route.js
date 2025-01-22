import Order from "@/lib/models/order";

export const POST = async (req, _) => {
    try {
        const { orderId,amt } = await req.json();

        if (!orderId) {
            return new Response(
                JSON.stringify({ success: false, message: "Order ID is required" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Find the order by ID
        const order = await Order.findOne({ _id: orderId });

        if (!order) {
            return new Response(
                JSON.stringify({ success: false, message: "Order not found" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Find the cancel detail
        const cancelDetail = order.additionalDetails.find((detail) => detail.cancel);

        if (cancelDetail && cancelDetail.cancel) {
            const currentISTDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            // Toggle the cancel eligibility
            cancelDetail.cancel.refundAmount = amt;
            cancelDetail.cancel.refundTime = currentISTDate;
            cancelDetail.cancel.refund = true;

            // Mark the field as modified
            order.markModified("additionalDetails");

            // Save the updated order
            await order.save();

            return new Response(
                JSON.stringify({ success: true, message: "Refund eligibility updated successfully" }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        } else {
            return new Response(
                JSON.stringify({ success: false, message: "Cancel details not found in the order" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    } catch (error) {
        console.error("Error updating refund eligibility:", error);
        return new Response(
            JSON.stringify({ success: false, error: "Failed to update refund eligibility" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};


import Razorpay from "razorpay"

const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

export const POST = async (req) => {
    const {
        payAmount,
    }= await req.json();
    console.log(payAmount)

    try {
        const order =await razorpay.orders.create({
            amount:payAmount*100,
            currency:'INR',
            receipt:"receipt_"+Math.random().toString(36).substring(7)
        })
        return new Response(
            JSON.stringify({ orderId: order }),
            { status: 200 }
          );
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ errors:error }),
            { status: 500 }
          );
    }

}
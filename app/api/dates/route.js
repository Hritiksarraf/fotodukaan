import { connectToDB } from "@/lib/mongodb/mongoose";
import Freelancer from "@/lib/models/Register";
import Order from "@/lib/models/order";


export const GET = async (req,{params}) => {
    try {
        await connectToDB()
        const freelancer = await Freelancer.findOne({_id:params.id}).populate('orders')
        if(!freelancer){
            return new Response( 'Freelancer not found',{ status: 404} )
        }
        const blockedDates = freelancer.blockedDates;
        const orders = await Order.find({ freelancerId: params.id })
        const bookedDates = orders.map(order => order.date);
        const unavailableDates = [...blockedDates, ...bookedDates];
        return new Response(unavailableDates, { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response("failed to get all the dates",{status:400})
    }
}
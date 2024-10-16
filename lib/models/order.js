import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
    default: null
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  freelancerAproved:{
    type:Boolean,
    default:false
  },
  admineApproved:{
    type:Boolean,
    default:false
  },
  paidAmount:{
    type:Number,
    required:true
  },
  totalAmount:{
    type:Number,
    required:true
  },
  discount:{
    type:Number,
    required:true
  },
  service:{
    type:String,
    require:true,
  },
  event:{
    type:String,
    require:true,
  },
  additionalDetails:{
    type:Array,
    default:[]
  },
  userId:{
    type:String,
    require:true
  },
  freelancerId:{
    type:String,
    require:true
  },
  time:{
    type:String,
    require:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;

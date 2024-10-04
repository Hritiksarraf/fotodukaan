import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    unique: true,
  },
  profilePhoto: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: false,
    default: null
  },
  address: {
    type: String,
    required: false,
    default: ''
  },
  city: {
    type: String,
    required: false,
    default: ''
  },
  booking: {
    type: Array, // Fixed to use Array for storing bookings
    required: false,
    default: []
  },
  review: {
    type: Array, // Fixed to use Array for storing reviews
    required: false,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

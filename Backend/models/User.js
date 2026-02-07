import mongoose from "mongoose";

const emailRegex =
  /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  phoneSuffix: {
    type: String,
    unique: false,
  },
  username: {
    type: String,
    min: 3,
    max: 20,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: [emailRegex, "Please provide a valid email address"],
  },
  emailOpt: {
    type: String,
  },

  emailOptExpiry: { type: Date },

  profilePicture: {
    type: String,
  },

  about: { type: String },

  lastSeen: {
    type: Date,
  },

  isOnline: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  agreed: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

export const User=mongoose.model("User",userSchema)

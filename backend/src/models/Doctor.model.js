import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  feesPerConsultation: {
    type: Number,
    required: true
  },
  availableDays: [String],
  availableTime: {
    start: String,
    end: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  bio: String,
  image: {
    type: String, // 👈 Store image URL or filename
    default: ''   // Optional: can give default profile image URL
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export const Doctor = mongoose.model("Doctor", doctorSchema);

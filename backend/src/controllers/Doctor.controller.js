import { Doctor } from "../models/Doctor.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createDoctorProfile = async (req, res) => {
  try {
    const {
      specialization,
      experience,
      feesPerConsultation,
      availableDays,
      availableTime,
      bio
    } = req.body;

    const userId = req.user?._id;

    if (
      ![specialization, experience, feesPerConsultation, availableDays, availableTime].every(Boolean)
    ) {
      return res.status(400).json({
        message: "Please fill in all required fields",
      });
    }

    const existing = await Doctor.findOne({ userId });
    if (existing) {
      return res.status(400).json({
        message: "Doctor profile already exists",
      });
    }

    const avatarPath = req.file?.path;

    if (!avatarPath) {
      return res.status(400).json({
        message: "Doctor image is required",
      });
    }

    const uploadedImage = await uploadOnCloudinary(avatarPath);
    if (!uploadedImage) {
      return res.status(500).json({
        message: "Image upload failed",
      });
    }

    const doctor = await Doctor.create({
      userId,
      specialization,
      experience,
      feesPerConsultation,
      availableDays: availableDays.split(","), // "Mon,Tue"
      availableTime: JSON.parse(availableTime), // '{"start":"10:00","end":"14:00"}'
      bio,
      image: uploadedImage.url,
    });

    if (!doctor) {
      return res.status(500).json({
        message: "Doctor creation failed",
      });
    }

    res.status(201).json({
      message: "Doctor profile created successfully",
      doctor,
    });
  } catch (error) {
    console.error("❌ Error creating doctor profile:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getDoctorProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      specialization,
      experience,
      feesPerConsultation,
      availableDays,
      availableTime,
      bio,
    } = req.body;

    const doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    // Optional image upload
    if (req.file?.path) {
      const uploadedImage = await uploadOnCloudinary(req.file.path);
      if (uploadedImage) {
        doctor.image = uploadedImage.url;
      }
    }

    doctor.specialization = specialization || doctor.specialization;
    doctor.experience = experience || doctor.experience;
    doctor.feesPerConsultation = feesPerConsultation || doctor.feesPerConsultation;
    doctor.availableDays = availableDays ? availableDays.split(",") : doctor.availableDays;
    doctor.availableTime = availableTime ? JSON.parse(availableTime) : doctor.availableTime;
    doctor.bio = bio || doctor.bio;

    await doctor.save();

    res.status(200).json({ message: "Doctor profile updated successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

const deleteDoctorProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const deleted = await Doctor.findOneAndDelete({ userId });

    if (!deleted) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    res.status(200).json({ message: "Doctor profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed", error: error.message });
  }
};


export { 
  createDoctorProfile,
  getDoctorProfile,
  updateDoctorProfile,
  deleteDoctorProfile
};

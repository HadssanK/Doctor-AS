import { Appointment } from "../models/Appointment.model.js";

// ✅ Create Appointment
const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const patientId = req.user._id;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const newAppointment = await Appointment.create({
      patientId,
      doctorId,
      date,
      time,
      status: "pending",
    });

    res.status(201).json({
      message: "Appointment request sent successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Appointment creation failed",
      error: error.message,
    });
  }
};

// ✅ Get All Appointments (for Admin/Doctor)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email")
      .populate({
        path: "doctorId",
        populate: { path: "userId", select: "name email" },
      });

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

// ✅ Get User Appointments (Patient)
const getMyAppointments = async (req, res) => {
  try {
    const myAppointments = await Appointment.find({ patientId: req.user._id })
      .populate("doctorId")
      .sort({ createdAt: -1 });

    res.json({ myAppointments });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your appointments" });
  }
};

// ✅ Update Appointment Status (Doctor)
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // pending / approved / rejected

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({ message: "Status updated", appointment: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment status" });
  }
};

// ✅ Delete Appointment (Patient or Admin)
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Optional: only patient who booked OR admin can delete
    if (
      req.user.role !== "admin" &&
      appointment.patientId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await appointment.deleteOne();
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete appointment" });
  }
};

export {
  createAppointment,
  getAllAppointments,
  getMyAppointments,
  updateAppointmentStatus,
  deleteAppointment,
};

import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const DoctorProfile = () => {
  const {
    user,
    getDoctorProfile,
    createDoctorProfile,
    updateDoctorProfile,
    deleteDoctorProfile,
  } = useAppContext();

  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    specialization: "",
    experience: "",
    feesPerConsultation: "",
    availableDays: "",
    availableTime: { start: "", end: "" },
    bio: "",
    image: null,
  });

  // Check auth and fetch profile
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "doctor") {
      navigate("/");
      return;
    }

    (async () => {
      try {
        const res = await getDoctorProfile();
        if (res?.doctor) {
          const {
            specialization,
            experience,
            feesPerConsultation,
            availableDays,
            availableTime,
            bio,
          } = res.doctor;

          setFormData({
            specialization,
            experience,
            feesPerConsultation,
            availableDays: availableDays.join(","),
            availableTime,
            bio,
            image: null,
          });
          setEditing(true);
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    })();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "start" || name === "end") {
      setFormData((prev) => ({
        ...prev,
        availableTime: { ...prev.availableTime, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "availableTime") {
        payload.append(key, JSON.stringify(value));
      } else {
        payload.append(key, value);
      }
    });

    try {
      if (editing) {
        await updateDoctorProfile(payload);
        alert("Profile updated successfully");
      } else {
        await createDoctorProfile(payload);
        alert("Profile created successfully");
        setEditing(true);
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
          console.error("⚠️ Error loading doctor profile in component:", err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await deleteDoctorProfile();
        alert("Profile deleted");
        navigate("/");
      } catch (err) {
        alert("Error deleting profile");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 sm:p-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          {editing ? "Update Doctor Profile" : "Create Doctor Profile"}
        </h1>
        <p className="text-gray-600">
          Help patients know you better by sharing your experience, timing and specialty.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl px-8 py-10 space-y-6 animate-fade-in"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Specialization</label>
            <input
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Experience (Years)</label>
            <input
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fees Per Consultation</label>
            <input
              name="feesPerConsultation"
              type="number"
              value={formData.feesPerConsultation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Available Days</label>
            <input
              name="availableDays"
              value={formData.availableDays}
              onChange={handleChange}
              placeholder="Mon,Tue,Wed"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              name="start"
              value={formData.availableTime.start}
              onChange={handleChange}
              placeholder="10:00"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              name="end"
              value={formData.availableTime.end}
              onChange={handleChange}
              placeholder="14:00"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 h-28 focus:outline-blue-500"
            placeholder="Tell patients about yourself..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600"
          />
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded shadow transition"
          >
            {editing ? "Update Profile" : "Create Profile"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 py-2 px-5 rounded transition"
            >
              <Trash2 size={18} />
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;

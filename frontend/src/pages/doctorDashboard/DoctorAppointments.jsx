import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";

const DoctorAppointments = () => {
  const { getAllAppointments, updateAppointmentStatus } = useAppContext();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAllAppointments();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      fetchAppointments(); // Refresh list
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <div className="overflow-x-auto rounded-xl shadow border">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
            <tr>
              <th className="py-3 px-6">Patient</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Time</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((appt) => (
                <tr key={appt._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{appt?.user?.name || "N/A"}</td>
                  <td className="py-3 px-6">{appt.date}</td>
                  <td className="py-3 px-6">{appt.time}</td>
                  <td className="py-3 px-6 capitalize font-medium">
                    {appt.status || "pending"}
                  </td>
                  <td className="py-3 px-6 text-center space-x-2">
                    <button
                      onClick={() => handleStatusChange(appt._id, "approved")}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(appt._id, "rejected")}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointments;

import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { CalendarCheck, Clock, CheckCircle } from "lucide-react";

const JoinAsDoctor = () => {
  const { getMyAppointments } = useAppContext();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getMyAppointments();
        setAppointments(res.appointments || []);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const total = appointments.length;
  const upcoming = appointments.filter((a) => a.status === "pending").length;
  const completed = appointments.filter((a) => a.status === "completed").length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Appointments */}
        <Card
          title="Total Appointments"
          value={total}
          icon={<CalendarCheck className="text-blue-600 w-8 h-8" />}
          color="bg-blue-100"
        />

        {/* Upcoming Appointments */}
        <Card
          title="Upcoming"
          value={upcoming}
          icon={<Clock className="text-yellow-600 w-8 h-8" />}
          color="bg-yellow-100"
        />

        {/* Completed Appointments */}
        <Card
          title="Completed"
          value={completed}
          icon={<CheckCircle className="text-green-600 w-8 h-8" />}
          color="bg-green-100"
        />
      </div>
    </div>
  );
};

const Card = ({ title, value, icon, color }) => {
  return (
    <div className={`rounded-xl shadow-md p-6 flex items-center gap-4 ${color}`}>
      <div className="bg-white p-3 rounded-full shadow">{icon}</div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default JoinAsDoctor;

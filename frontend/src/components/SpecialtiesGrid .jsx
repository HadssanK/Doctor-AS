import React from "react";
import {
  Stethoscope,
  Eye,
//   Tooth,
  Brain,
  HeartPulse,
  Baby,
  User,
  Smile,
  Mic,
  Venus,
//   Male,
  Syringe,
//   Lungs,
//   ShieldHeart,
  Search
} from "lucide-react"; // use icons as needed

const specialties = [
  { name: "Skin Specialist", icon: <Smile size={28} /> },
  { name: "Dermatologist", icon: "ShieldHeart" },
  { name: "Gynecologist", icon: <Venus size={28} /> },
  { name: "Urologist", icon: "Male" },
  { name: "Gastroenterologist", icon: <Syringe size={28} /> },
  { name: "Dentist", icon: "Tooth" },
  { name: "Psychiatrist", icon: <Brain size={28} /> },
  { name: "ENT Specialist", icon: <Mic size={28} /> },
  { name: "Orthopedic Surgeon", icon: <User size={28} /> },
  { name: "Sexologist", icon: <HeartPulse size={28} /> },
  { name: "Neurologist", icon: <Brain size={28} /> },
  { name: "Child Specialist", icon: <Baby size={28} /> },
  { name: "Pulmonologist", icon: "hello"},
  { name: "Eye Specialist", icon: <Eye size={28} /> },
  { name: "General Physician", icon: <Stethoscope size={28} /> },
];

const SpecialtiesGrid = () => {
  return (
    <section className="py-10 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Consult Best Doctors Online</h2>
        <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6">
        {specialties.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center group hover:text-blue-600 transition"
          >
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-2 group-hover:bg-blue-100">
              {item.icon}
            </div>
            <p className="text-sm font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialtiesGrid;

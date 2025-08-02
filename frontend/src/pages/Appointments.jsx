import React from "react";
import { Link } from "react-router-dom";


const doctorData = [
  {
    name: "Dr. Inam E Khuda",
    specialization: "Neurologist",
    degrees:
      "MBBS, FCPS (Neurology), Fellowship of European Board of Neurology",
    waitTime: "15 - 30 Min",
    experience: "20 Years",
    rating: "98% (219)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqhx-oSYcKf30q8ZmipUg1fLNDp_btb8_vng&s",
    hospitals: [
      {
        name: "Neuromed Clinic (Chugtai Lab)",
        availability: "Available today",
        fees: 2900,
      },
      {
        name: "Ziauddin Hospital",
        availability: "Available Mon, Aug 04",
        fees: 4000,
      },
      {
        name: "Medicare Cardiac Hospital",
        availability: "Available Tue, Aug 05",
        fees: 3900,
      },
    ],
  },
  {
    name: "Dr. Ayesha Naz",
    specialization: "Cardiologist",
    degrees: "MBBS, FCPS (Cardiology), Fellowship - UK",
    waitTime: "10 - 15 Min",
    experience: "15 Years",
    rating: "96% (189)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTGhL6GnTHoY1HSRg5YJR2_YDuumcoG9YJSA&s",
    hospitals: [
      {
        name: "NICVD Karachi",
        availability: "Available today",
        fees: 3500,
      },
      {
        name: "South City Hospital",
        availability: "Available Mon, Aug 04",
        fees: 4500,
      },
      {
        name: "Liaquat National",
        availability: "Available Wed, Aug 06",
        fees: 3200,
      },
    ],
  },
  {
    name: "Dr. Usman Ghani",
    specialization: "Dermatologist",
    degrees: "MBBS, MCPS, Diploma in Dermatology",
    waitTime: "20 Min",
    experience: "10 Years",
    rating: "92% (150)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA4tQcK6jubtp6OMYni4iKnrunamhmlOlPZQ&s",
    hospitals: [
      {
        name: "SkinCare Clinic",
        availability: "Available today",
        fees: 2500,
      },
      {
        name: "Altamash Hospital",
        availability: "Available Tue, Aug 05",
        fees: 2800,
      },
      {
        name: "CosmoDerma",
        availability: "Available Thu, Aug 07",
        fees: 3100,
      },
    ],
  },
];

const Appointments = () => {
  return (
  <section className="bg-gray-50 py-20 px-4">
      {/* Top Title and Description */}
      <div className="max-w-3xl mx-auto text-center mb-14 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Find & Book Top Doctors in Pakistan
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Book an appointment with experienced, verified doctors at top hospitals and clinics. Trusted by thousands of patients across the country.
        </p>
      </div>

      {/* All Doctor Cards */}
      <div className="max-w-7xl mx-auto space-y-12 px-4">
        {doctorData.map((doc, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col gap-6"
          >
            {/* Top: Doctor Info */}
            <div className="flex flex-col md:flex-row justify-between gap-6">
              {/* Left: Image & Info */}
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-200"
                />
                <div>
                  <h3 className="text-xl font-bold text-blue-700">{doc.name}</h3>
                  <p className="text-sm text-gray-600">{doc.specialization}</p>
                  <p className="text-sm text-gray-500">{doc.degrees}</p>

                  <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">{doc.waitTime}</span>
                      <div className="text-xs">Wait Time</div>
                    </div>
                    <div>
                      <span className="font-medium">{doc.experience}</span>
                      <div className="text-xs">Experience</div>
                    </div>
                    <div>
                      <span className="font-medium">{doc.rating}</span>
                      <div className="text-xs">Satisfied Patients</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              {/* Actions */}
<div className="flex flex-col gap-3 mt-4 md:mt-0 w-full md:w-auto">
  <Link
    to="/doctor-profile"
    className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100 text-sm text-center"
  >
    View Profile
  </Link>
  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded text-sm">
    Book Appointment
  </button>
</div>

            </div>

            {/* Hospital Availabilities */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {doc.hospitals.map((item, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-3 text-sm flex justify-between items-start"
                >
                  <div>
                    <p className="text-gray-700 font-medium">{item.name}</p>
                    <p className="text-green-600">{item.availability}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Rs. {item.fees}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Appointments;

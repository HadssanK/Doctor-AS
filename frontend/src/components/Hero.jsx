import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import img1 from "../assets/doctor1.png";

const Hero = () => {

const features = [
  {
    title: "Consult Online Now",
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbTtU_-6AWLLNSuBiTxTNe_xS2HdI4CdmlmQ&s",
    label: "1 Doctor Online Now",
  },
  {
    title: "In-Clinic Appointments",
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd5XYaiwk_Lupd6Pe0wRLC2LkFKEix0bQJkw&s" ,
    label: "",
  },
  {
    title: "Laboratory Tests",
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqhx-oSYcKf30q8ZmipUg1fLNDp_btb8_vng&s",
    label: "",
  },
  {
    title: "Procedures & Surgeries",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA4tQcK6jubtp6OMYni4iKnrunamhmlOlPZQ&s",
    label: "",
  },
  {
    title: "Medicines",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTGhL6GnTHoY1HSRg5YJR2_YDuumcoG9YJSA&s",
    label: "",
  },
];


  return (
    <>

    <section className="bg-white px-4 sm:px-6 lg:px-12 pt-4 pb-0">
      <div className="bg-gradient-to-r from-[#4e2e76] to-[#131d56] rounded-3xl text-white overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 pt-6 pb-0 gap-6">
          
          {/* Left Side */}
          <div className="md:w-1/2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug">
              Find and Book the <br />
              <span className="text-yellow-400 font-bold">Best Doctors</span> near you
            </h1>

            <div className="mt-3 inline-flex items-center bg-[#c1b59f]/30 text-green-200 text-sm px-3 py-1 rounded-md font-medium">
              ✅ <span className="ml-2 text-white">50M+ patients served</span>
            </div>

            {/* Search Bar */}
            <div className="mt-5 bg-white rounded-xl shadow-md p-2 flex flex-col sm:flex-row items-center gap-2 sm:gap-0 sm:divide-x w-full">
              <div className="flex items-center px-3 w-full sm:w-[150px]">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Lahore"
                  className="w-full text-sm text-gray-800 focus:outline-none"
                />
              </div>

              <button className="text-blue-700 text-sm font-medium px-3 py-2 hover:bg-blue-50 transition hidden sm:inline">
                Detect
              </button>

              <input
                type="text"
                placeholder="Doctors, Hospital, Conditions"
                className="w-full text-sm px-4 py-2 focus:outline-none text-gray-800"
              />

              <button className="bg-[#f9a825] hover:bg-[#f57f17] text-white px-5 py-2 rounded-md text-sm font-semibold transition">
                Search
              </button>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="md:w-1/2 flex justify-center items-end">
            <img
              src={img1}
              alt="Doctor"
              className="w-[260px] sm:w-[300px] md:w-[340px] rounded-2xl object-cover mb-0 pb-0"
            />
          </div>
        </div>
      </div>
    </section>

    {/* // Features section */}

 <section className="py-8 px-4 sm:px-8 lg:px-16 bg-white">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
    {features.map((item, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
      >
        <div className="relative w-full h-[150px] bg-white flex items-center justify-center">
          <img
            src={item.img}
            alt={item.title}
            className="max-h-full max-w-full object-contain"
          />
          {/* {item.label && (
            <div className="absolute bottom-0 left-0 right-0 bg-orange-500 text-white text-xs font-medium px-2 py-1 text-center">
              {item.label}
            </div>
          )} */}
        </div>
        <div className="text-center py-3 px-2">
          <p className="text-sm font-medium text-gray-700 leading-tight">{item.title}</p>
        </div>
      </div>
    ))}
  </div>
</section>

    </>
  );
};

export default Hero;

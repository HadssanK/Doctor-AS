import React from "react";
import { Link } from "react-router-dom";
import img1 from '../assets/doctor1.png';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 leading-tight">
            Book Your Appointment <br /> with Trusted Doctors
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Find experienced and verified doctors online and schedule your appointment in just a few clicks.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/doctors"
              className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
            >
              Find Doctors
            </Link>
            <Link
              to="/join"
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              Join as Doctor
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={img1}
            alt="Doctor illustration"
            className="w-full max-w-[330px] h-auto object-contain rounded-xl "
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

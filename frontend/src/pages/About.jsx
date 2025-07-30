import React from 'react'

const About = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-4">
  <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
    
    {/* Left Text Content */}
    <div className="w-full md:w-1/2">
      <h2 className="text-4xl font-bold text-blue-800 mb-4">About Us</h2>
      <p className="text-gray-600 text-lg mb-6">
        We are committed to improving the health and wellness of people by connecting them with qualified doctors, specialists, and healthcare services. Whether it's online consultations or in-person visits, we make it easier for patients to get trusted medical advice and treatment.
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>Verified and experienced doctors</li>
        <li>Secure online appointments</li>
        <li>Real patient reviews</li>
        <li>Multiple specialties covered</li>
      </ul>
    </div>

    {/* Right Image */}
    <div className="w-full md:w-1/2">
      <img
        src="https://oladoc.com/dist/images/lab-home.jpg"
        alt="About HealthCare"
        className="w-full h-auto rounded-xl shadow-lg"
      />
    </div>
  </div>
</section>

  )
}

export default About
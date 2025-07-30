import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha Khan",
    role: "Karachi, Pakistan",
    review:
      "Booking appointments online has never been this easy. The doctors are professional and the process is smooth!",
    rating: 5,
  },
  {
    name: "Usman Ali",
    role: "Lahore, Pakistan",
    review:
      "I found the best doctor through this platform. Highly recommended for anyone looking for quick medical help.",
    rating: 4,
  },
  {
    name: "Fatima Noor",
    role: "Islamabad, Pakistan",
    review:
      "Very reliable and fast service. I was able to consult with a specialist in no time!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-blue-50 text-center px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-3">
        Our Customers love us
      </h2>
      <p className="text-gray-700 text-lg mb-12">
        Check out the reviews from our satisfied customers
      </p>

      {/* Reviews Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-left"
          >
            {/* Stars */}
            <div className="flex text-yellow-400 mb-4">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400" />
              ))}
            </div>

            <p className="text-gray-700 mb-4">"{item.review}"</p>
            <div>
              <h4 className="text-blue-600 font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

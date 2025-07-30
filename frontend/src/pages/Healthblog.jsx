import React from "react";
import { FaRegBookmark } from "react-icons/fa"; // Save Icon
const blogs = [
  {
    title: "10 Tips for a Healthier Lifestyle",
    excerpt: "Start small, stay consistent. Discover easy ways to improve your physical and mental well-being.",
    image: "https://d5xz95ax6mbg9.cloudfront.net/images/2025/06/Magnesium-Glycinate-vs-Citrate-vs-Oxide-Which-One-Is-Right-for-You-825x468.webp",
    date: "July 27, 2025",
    time: "4:15 PM",
  },
  {
    title: "How to Choose the Right Doctor",
    excerpt: "Finding a trusted doctor can be tough — learn how to choose the right one for your needs.",
    image: "https://d5xz95ax6mbg9.cloudfront.net/images/2025/06/Renal-Stones-Medical-Therapy-and-Surgical-Options-825x468.webp",
     date: "July 29, 2025",
    time: "10:00 AM",
  },
  {
    title: "Common Myths About Skin Care",
    excerpt: "Stop believing skin myths! Here's what dermatologists really say about your routine.",
    image: "https://d5xz95ax6mbg9.cloudfront.net/images/2025/06/Best-Mouth-Ulcer-Medicine-in-Pakistan-825x468.webp",
    date: "July 29, 2025",
    time: "10:00 AM",
  },
  {
    title: "Mental Health Matters",
    excerpt: "Your mental health is just as important. Here's how to keep it in check daily.",
    image: "https://d5xz95ax6mbg9.cloudfront.net/images/2025/06/Muscle-Relaxant-Tablets-in-Pakistan-825x468.webp",
    date: "July 29, 2025",
    time: "10:00 AM",
  },
  {
    title: "Preventing Seasonal Flu",
    excerpt: "Flu season is here! Learn how to protect yourself and your loved ones naturally.",
    image: "https://d5xz95ax6mbg9.cloudfront.net/images/2025/06/Lifestyle-Modifications-for-Psychiatric-Patients--825x468.webp",
     date: "July 29, 2025",
    time: "10:00 AM",
  },
  {
    title: "Understanding Gut Health",
    excerpt: "Your gut health affects everything. Here's what foods and habits help the most.",
    image: "https://d5xz95ax6mbg9.cloudfront.net/images/2025/06/Dermatologist-Meaning-in-Urdu-825x468.webp",
     date: "July 29, 2025",
    time: "10:00 AM",
  },
];

const HealthBlogPage = () => {
  return (
     <div className="min-h-screen bg-white pt-20">
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-14 text-center px-4">
        <h1 className="text-4xl font-bold text-blue-700 mb-3">Health & Wellness Blog</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Read trusted health articles written by doctors and wellness experts.
        </p>
      </section>

      {/* Blog Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition relative"
            >
              {/* Save Icon */}
              <button className="absolute top-3 right-3 text-blue-600 bg-white p-1 rounded-full shadow hover:text-blue-800">
                <FaRegBookmark size={18} />
              </button>

              {/* Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />

              {/* Content */}
              <div className="p-4 min-h-[160px] flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-700 mb-1">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{blog.excerpt}</p>
                </div>
                <div className="text-xs text-gray-500">
                  🕓 {blog.date} • {blog.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HealthBlogPage;

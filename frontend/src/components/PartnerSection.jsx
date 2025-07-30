import React from "react";

const partners = [
  { name: "ufone", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ7pu-7XuhuQVjgjBMAnyXj_nIBhsdA3AF4A&s" },
  { name: "faysal", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEF9jfELhmPNjHh6C2SJORuzgmX7wR26W5gQ&s" },
  { name: "jubilee", img: "https://d1t78adged64l7.cloudfront.net/images/companies/1722249302_pc0FRu0CLk.webp?v=1753260883" },
  { name: "jazz", img: "https://d1t78adged64l7.cloudfront.net/images/companies/1722250852_Njn1tesThE.webp?v=1753260883" },
  { name: "easypaisa", img: "https://d1t78adged64l7.cloudfront.net/images/companies/1746265385_b268nLBy9v.webp?v=1753260883" },
  { name: "alfalah", img: "https://d1t78adged64l7.cloudfront.net/images/companies/1746265677_z8PGfZ4iAP.webp?v=1753260883" },
  { name: "faysal2", img: "https://d1t78adged64l7.cloudfront.net/images/companies/1721298500_XXw52qPcHo.webp?v=1753260883" },
  { name: "zong", img: "https://d1t78adged64l7.cloudfront.net/images/companies/1722248287_bM7yZgnLDT.webp?v=1753260883" },
];

const PartnerSection = () => {
  return (
  <section className="py-20 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
        Our Esteemed Partners
      </h2>
      <p className="text-gray-600 mb-8 text-lg">
        Avail Exclusive partnership benefits for your brand, clients and employees.
      </p>
      <button className="bg-blue-900 text-white px-8 py-3 rounded-lg mb-12 hover:bg-blue-800 transition">
        Partner with oladoc
      </button>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 h-36 border rounded-xl bg-gray-50 hover:shadow-lg transition"
            >
              <img
                src={partner.img}
                alt={partner.name}
                className="max-h-16 sm:max-h-20 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;

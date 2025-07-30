import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-50 border-t border-blue-100 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">

        {/* Company */}
        <div>
          <h3 className="text-xl font-bold text-blue-700 mb-2">MediConnect</h3>
          <p className="text-sm">
            Book appointments with trusted doctors across Pakistan. Online healthcare made easy and secure.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-md font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#" className="hover:text-blue-600">Find Doctors</a></li>
            <li><a href="#" className="hover:text-blue-600">Join as Doctor</a></li>
            <li><a href="#" className="hover:text-blue-600">Blog</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-md font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:support@mediconnect.com" className="text-blue-600">support@mediconnect.com</a></li>
            <li>Phone: +92 300 1234567</li>
            <li>Location: Lahore, Pakistan</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-md font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-blue-600">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 py-4 border-t border-blue-100">
        © {new Date().getFullYear()} MediConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

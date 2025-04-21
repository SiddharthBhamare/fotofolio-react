import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-6 text-green-900">
        Get In Touch
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Have a project or event in mind? Let’s create something amazing
        together!
      </p>

      <form className="space-y-6">
        <div>
          <label className="block mb-1 text-sm text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-700">Message</label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Tell me about your project..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-green-400 to-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;

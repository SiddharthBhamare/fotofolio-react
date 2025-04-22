import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-3xl w-full text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Get In Touch</h2>
        <p className="text-lg text-gray-600 mb-10">
          Have a project or event in mind? Let’s create something amazing
          together!
        </p>

        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-xl p-8 space-y-6">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              Phone
            </p>
            <p className="text-lg text-gray-800 font-medium">8484840617</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              Email
            </p>
            <p className="text-lg text-gray-800 font-medium">
              veerk228@gmail.com
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              Address
            </p>
            <p className="text-lg text-gray-800 font-medium">
              Pune, Maharashtra
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

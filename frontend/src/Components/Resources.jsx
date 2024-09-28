import React from "react";

function Resources() {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen w-full flex items-center justify-center px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold text-[#F4C63D] mb-6 shadow-lg shadow-[#FF6F61]/30">
          Resources Page
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Here, you can find all the resources, tutorials, and guides to help
          you make the most out of the platform. Explore the sections below to
          find what you need.
        </p>

        <div className="flex justify-center space-x-4">
          <button className="bg-[#F4C63D] text-black font-semibold py-2 px-6 rounded-lg shadow-lg transition-all hover:bg-[#FF6F61] hover:shadow-[#FF6F61]/40">
            View Tutorials
          </button>
          <button className="bg-[#F4C63D] text-black font-semibold py-2 px-6 rounded-lg shadow-lg transition-all hover:bg-[#FF6F61] hover:shadow-[#FF6F61]/40">
            Explore Documentation
          </button>
        </div>
      </div>
    </div>
  );
}

export default Resources;

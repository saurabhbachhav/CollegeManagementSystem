import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <div className="w-full max-w-7xl text-center">
        <h1 className="text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400">
          Welcome to IIIT Nagpur
        </h1>
        <p className="text-lg mb-12 text-center px-8 max-w-3xl mx-auto leading-relaxed">
          The Indian Institute of Information Technology Nagpur is a premier
          institute dedicated to fostering innovation and excellence in
          information technology education.
        </p>
        <div className="bg-gray-800 p-10 rounded-xl shadow-2xl max-w-4xl mx-auto text-center transform transition-transform hover:scale-105">
          <h2 className="text-4xl font-semibold mb-6 text-yellow-400">
            Explore Our Offerings
          </h2>
          <ul className="list-none space-y-4 mb-8">
            <li className="text-yellow-300 flex items-center justify-center text-2xl">
              🎓 <span className="ml-3">Undergraduate Programs</span>
            </li>
            <li className="text-yellow-300 flex items-center justify-center text-2xl">
              📚 <span className="ml-3">Research Opportunities</span>
            </li>
            <li className="text-yellow-300 flex items-center justify-center text-2xl">
              👩‍🏫 <span className="ml-3">Experienced Faculty</span>
            </li>
            <li className="text-yellow-300 flex items-center justify-center text-2xl">
              🌍 <span className="ml-3">Industry Collaborations</span>
            </li>
          </ul>
          <p className="text-lg text-white">
            Join us in our mission to create a brighter future through
            technology and education.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

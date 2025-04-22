import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-100 text-black">
      {/* Optional Background Image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{
          backgroundImage:
            "url('https://wallup.net/wp-content/uploads/2016/06/23/394069-photographer-photography-landscape-water-Sun-sunset-camera.jpg')",
        }}
      /> */}

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight drop-shadow-md">
          Capturing Stories Through the Lens
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Welcome to the official portfolio of{" "}
          <span className="text-gray-900 font-semibold">Karnveer Bhamare</span>—
          where every frame tells a story, and every moment is immortalized.
        </p>

        <Link
          to="/gallery"
          className="inline-block text-white bg-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition-transform duration-300 transform hover:scale-105 shadow-md"
        >
          View My Work
        </Link>
      </div>
    </section>
  );
};

export default Home;

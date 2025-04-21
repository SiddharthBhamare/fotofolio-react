import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950 to-green-800 opacity-90 z-0" />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{
          backgroundImage:
            "url('https://wallup.net/wp-content/uploads/2016/06/23/394069-photographer-photography-landscape-water-Sun-sunset-camera.jpg')",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Capturing Stories Through the Lens
        </h1>
        <p className="text-lg md:text-xl text-green-100 mb-8">
          Welcome to the official portfolio of{" "}
          <span className="text-pink-400 font-semibold">Karnveer Bhamare</span>—
          where every frame tells a story, and every moment is immortalized.
        </p>

        <Link
          to="/gallery"
          className="inline-block bg-gradient-to-r from-green-400 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:scale-105 transform transition duration-300 shadow-lg"
        >
          View My Work
        </Link>
      </div>
    </section>
  );
};

export default Home;

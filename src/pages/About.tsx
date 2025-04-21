import axios from "axios";
import { useEffect, useState } from "react";

interface ProfilePros {
  profilepicture: string; // ✅ corrected key
  bio: string;
  email: string;
  contactNo: string;
}

const About = () => {
  const [profile, setProfile] = useState<ProfilePros>();
  useEffect(() => {
    axios
      .get(
        "https://fotofolioapi-production.up.railway.app/api/Profile/getProfile",
        {
          headers: {
            "X-API-KEY": "my-super-secret-key-test",
          },
        }
      )
      .then((response) => {
        console.log("Api Response :", response.data);
        setProfile(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-gray-900 to-black text-white flex items-center justify-center px-4 py-16">
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-10 max-w-4xl w-full text-center border border-white/20">
        <h2 className="text-4xl font-bold mb-6 text-green-300">About Me</h2>
        <p className="text-lg text-gray-200 leading-relaxed">
          Hi, I’m <span className="font-semibold text-green-400">Karnveer</span>
          , a passionate professional photographer with over 8 years of
          experience capturing life’s most beautiful moments. Whether it’s a
          wedding, a corporate event, or a personal portrait session — my goal
          is to tell your story through powerful imagery.
        </p>

        {profile?.profilepicture && (
          <div className="mt-10">
            <img
              src={`data:image/jpeg;base64,${profile.profilepicture}`}
              alt="Profile"
              className="mx-auto rounded-full shadow-lg w-48 h-48 object-cover border-4 border-green-400"
              referrerPolicy="no-referrer"
            />
            <p className="mt-4 text-sm text-gray-300 italic">
              Capturing stories, not just pictures.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;

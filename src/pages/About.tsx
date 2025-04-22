import axios from "axios";
import { useEffect, useState } from "react";
import logoImage from "../assets/logo-transparent-png 2.png"; // ✅ make sure this path is correct

interface ProfilePros {
  profilepicture: string;
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
        console.log("Api Response:", response.data);
        setProfile(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const profileImageSrc = profile?.profilepicture
    ? `data:image/jpeg;base64,${profile.profilepicture}`
    : logoImage;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-b from-white to-gray-100 text-gray-800">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-10 max-w-4xl w-full text-center border border-gray-200">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">About Me</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Hi, I’m <span className="font-semibold">Karngraphy</span>. Karngraphy
          isn’t just about capturing weddings—it’s about preserving emotions,
          unscripted moments, and the quiet magic hidden between the frames.
          <br />
          <br />
          From the laughter that echoes during haldi to the stillness of a
          stolen glance, every frame tells a story that words often miss. With a
          cinematic eye and a heart tuned to details, Karngraphy blends into
          your world—observing, feeling, and gently documenting the essence of
          your celebration.
          <br />
          <br />
          From the playful curiosity of a familiar wedding cat to the chaos of
          baraat drums, nothing goes unnoticed. Every wedding is a film
          unfolding in real time, and Karngraphy is here to make sure you
          remember how it felt.
        </p>

        <div className="mt-10">
          <img
            src={profileImageSrc}
            alt="Profile"
            className="mx-auto shadow-lg h-48 w-96 object-cover border-4 border-gray-300 bg-white"
            referrerPolicy="no-referrer"
          />
          <p className="mt-4 text-sm text-gray-600 italic">
            Capturing stories, not just pictures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

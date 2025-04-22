import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import axios from "axios";

interface galleryDataProps {
  id: string;
  category: string;
  title: string;
  youtubeURL: string;
  image: string | null; // image can be null now
}

const Gallery = () => {
  const [galleryData, setGalleryData] = useState<galleryDataProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<galleryDataProps | null>(
    null
  );

  // Load data from API
  useEffect(() => {
    axios
      .get(
        "https://fotofolioapi-production.up.railway.app/api/RawData/getall",
        {
          headers: {
            "X-API-KEY": "my-super-secret-key-test",
          },
        }
      ) // Replace with your actual API
      .then((response) => {
        console.log("API response:", response.data); // Debug log
        setGalleryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching gallery data:", error);
      });
  }, []);

  const categories = [
    "All",
    ...new Set(galleryData.map((item) => item.category)),
  ];

  const filteredImages =
    selectedCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === selectedCategory);

  const fallbackImage =
    "https://via.placeholder.com/600x400?text=Image+Not+Found";

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = fallbackImage;
  };

  const handleYouTubeURL = (url: string) => {
    // Clean the YouTube URL to embed it
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/").split("&")[0];
    }
    return url;
  };

  return (
    <div className="relative min-h-screen py-16 overflow-hidden">
      {/* Background Image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${bacImage})`,
        }}
      >
        <div className="w-full h-full"></div>
      </div> */}

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Reference Work</h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full border-2 text-lg transition ${
                selectedCategory === category
                  ? "text-black border-black rounded-full text-lg font-semibold hover:scale-105 transform transition duration-300 shadow-lg border-1 border-black border-solid"
                  : "text-black rounded-full text-lg font-semibold hover:scale-105 transform transition duration-300 shadow-lg border-1 border-black border-solid"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredImages.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all bg-white"
                onClick={() => setSelectedItem(item)} // Set the selected item
              >
                {item.image ? (
                  <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt={item.title}
                    onError={handleImageError}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-all duration-300"
                  />
                ) : item.youtubeURL ? (
                  <iframe
                    width="100%"
                    height="240"
                    src={handleYouTubeURL(item.youtubeURL)} // Correct YouTube URL handling
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={item.title}
                    className="w-full h-64"
                  ></iframe>
                ) : (
                  <img
                    src={fallbackImage} // Fallback image for missing image or youtubeURL
                    alt="Fallback"
                    className="w-full h-64 object-cover"
                  />
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)} // Close the modal when clicking outside the image
          >
            {selectedItem.image ? (
              <motion.img
                src={`data:image/jpeg;base64,${selectedItem.image}`}
                alt={selectedItem.title}
                onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking the image
                className="max-w-full max-h-full rounded-lg shadow-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              />
            ) : selectedItem.youtubeURL ? (
              <iframe
                width="80%"
                height="80%"
                src={handleYouTubeURL(selectedItem.youtubeURL)} // Correct YouTube URL handling
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedItem.title}
              ></iframe>
            ) : (
              <img
                src={fallbackImage} // Fallback image for missing image or youtubeURL
                alt="Fallback"
                className="w-full h-full"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

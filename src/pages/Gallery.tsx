import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Assuming galleryData is imported from a separate file
import galleryData from "../data/galleryData";

// Helper to embed YouTube video from URL
const handleYouTubeURL = (url: string) => {
  const videoIdMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/ // Regex pattern
  );
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
};

const fallbackImage =
  "https://via.placeholder.com/600x400?text=Image+Not+Found";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<any | null>(null); // You can replace 'any' with the correct type
  const [loading, setLoading] = useState(false);

  const categories = [
    "All",
    ...new Set(galleryData.map((item) => item.category)), // Create a unique list of categories
  ];

  // Filter images based on selected category
  const filteredImages =
    selectedCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === selectedCategory);

  console.log(filteredImages); // Debugging filtered images

  return (
    <div className="relative min-h-screen py-16 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Reference Work</h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full border-2 text-lg transition ${
                selectedCategory === category
                  ? "text-black border-black font-semibold shadow-lg"
                  : "text-black font-semibold shadow-md"
              } hover:scale-105 transform duration-300`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
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
                className="group relative overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-all"
                onClick={() => {
                  setSelectedItem(item);
                  console.log(item); // Debugging selected item
                }}
              >
                <div className="relative w-full h-64 bg-gray-100">
                  {/* If the item is a YouTube URL, embed the video */}
                  {item.imageUrl.includes("youtube.com") ||
                  item.imageUrl.includes("youtu.be") ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={handleYouTubeURL(item.imageUrl)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={item.title}
                      className="w-full h-full"
                    ></iframe>
                  ) : (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal for selected item */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            {selectedItem.imageUrl.includes("youtube.com") ||
            selectedItem.imageUrl.includes("youtu.be") ? (
              <iframe
                width="80%"
                height="80%"
                src={handleYouTubeURL(selectedItem.imageUrl)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedItem.title}
              ></iframe>
            ) : (
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="max-w-full max-h-full rounded-lg shadow-lg"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

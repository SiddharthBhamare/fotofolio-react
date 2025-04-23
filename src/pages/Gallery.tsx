import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import galleryData from "../data/galleryData";
import Helper from "../Helper/HelperFunctions";

// Type for gallery item
interface GalleryItem {
  id: number;
  title?: string;
  imageUrl?: string;
  videoUrl?: string;
  category: string;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = useMemo(() => {
    return ["All", ...new Set(galleryData.map((item) => item.category))];
  }, []);

  const filteredImages = useMemo(() => {
    return selectedCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

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
            {filteredImages.map((item) => {
              const isYouTube =
                item.imageUrl?.includes("youtube.com") ||
                item.imageUrl?.includes("youtu.be");
              if (item.imageUrl || item.videoUrl) {
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-all"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative w-full h-64 bg-gray-100">
                      {isYouTube ? (
                        <iframe
                          src={Helper.handleYouTubeURL(item.imageUrl!)}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={item.title || "YouTube Video"}
                          className="w-full h-full"
                        ></iframe>
                      ) : item.imageUrl && !item.videoUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title || "Gallery Image"}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                      {item.videoUrl ? (
                        <video controls preload="metadata">
                          <source src={item.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : null}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm">{item.category}</p>
                    </div>
                  </motion.div>
                );
              }
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center bg-black rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-2 right-2 z-20 text-white text-4xl font-bold bg-black bg-opacity-60 px-3 py-1 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-80"
              >
                &times;
              </button>

              {/* Content */}
              <div className="relative w-full h-full flex items-center justify-center">
                {selectedItem.videoUrl ? (
                  <video
                    controls
                    preload="metadata"
                    className="w-full h-full object-fill rounded-lg"
                  >
                    <source src={selectedItem.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : selectedItem.imageUrl?.includes("youtube.com") ||
                  selectedItem.imageUrl?.includes("youtu.be") ? (
                  <iframe
                    src={Helper.handleYouTubeURL(selectedItem.imageUrl)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedItem.title || "YouTube Video"}
                    className="w-full h-full object-cover rounded-lg"
                    onError={() => {
                      console.warn(
                        `Invalid image path: ${selectedItem.imageUrl}`
                      );
                    }}
                  ></iframe>
                ) : selectedItem.imageUrl ? (
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title || "Gallery Image"}
                    className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
                    onError={() => {
                      console.warn(
                        `Invalid image path: ${selectedItem.imageUrl}`
                      );
                    }}
                  />
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

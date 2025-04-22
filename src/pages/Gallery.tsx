import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface galleryDataProps {
  id: string;
  category: string;
  title: string;
  youtubeURL: string;
  image: string | null;
}

const fallbackImage =
  "https://via.placeholder.com/600x400?text=Image+Not+Found";

// Helper to embed YouTube video from URL
const handleYouTubeURL = (url: string) => {
  const videoIdMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
  );
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
};

const Gallery = () => {
  const [galleryData, setGalleryData] = useState<galleryDataProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<galleryDataProps | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState<boolean[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://fotofolioapi-production.up.railway.app/api/RawData/getall",
        {
          headers: {
            "X-API-KEY": "my-super-secret-key-test",
          },
        }
      )
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data;

        if (Array.isArray(data)) {
          setGalleryData(data);
          setImageLoading(new Array(data.length).fill(true));
        } else {
          setGalleryData([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gallery data:", error);
        setLoading(false);
      });
  }, []);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    index: number
  ) => {
    event.currentTarget.src = fallbackImage;
    setImageLoading((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const handleImageLoad = (index: number) => {
    setImageLoading((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const categories = [
    "All",
    ...new Set(galleryData.map((item) => item.category)),
  ];

  const filteredImages =
    selectedCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-12 w-12 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0115.535 4.95M2 12a10 10 0 1018 5.314"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-16 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Reference Work</h2>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredImages.map((item, index) => (
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
                  {item.image ? (
                    <>
                      {imageLoading[index] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
                          <div className="animate-spin h-8 w-8 border-2 border-t-transparent border-black rounded-full"></div>
                        </div>
                      )}
                      <img
                        src={`data:image/jpeg;base64,${item.image}`}
                        alt={item.title}
                        onLoad={() => handleImageLoad(index)}
                        onError={(e) => handleImageError(e, index)}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          imageLoading[index] ? "opacity-0" : "opacity-100"
                        }`}
                      />
                    </>
                  ) : item.youtubeURL ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={handleYouTubeURL(item.youtubeURL)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={item.title}
                      className="w-full h-full"
                    ></iframe>
                  ) : (
                    <img
                      src={fallbackImage}
                      alt="Fallback"
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

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            {selectedItem.image ? (
              <motion.img
                src={`data:image/jpeg;base64,${selectedItem.image}`}
                alt={selectedItem.title}
                onClick={(e) => e.stopPropagation()}
                className="max-w-full max-h-full rounded-lg shadow-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              />
            ) : selectedItem.youtubeURL ? (
              <iframe
                width="80%"
                height="80%"
                src={handleYouTubeURL(selectedItem.youtubeURL)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedItem.title}
              ></iframe>
            ) : (
              <img
                src={fallbackImage}
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

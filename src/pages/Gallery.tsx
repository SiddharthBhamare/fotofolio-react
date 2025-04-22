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
  const [galleryData, setGalleryData] = useState<galleryDataProps[]>([]); // Default as empty array
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<galleryDataProps | null>(
    null
  );
  const [loading, setLoading] = useState(true); // Global loading state
  const [imageLoading, setImageLoading] = useState<boolean[]>([]); // Individual image loading state

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
      )
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data;

        if (Array.isArray(data)) {
          setGalleryData(data);
          setImageLoading(new Array(data.length).fill(true)); // Set loading for all images initially
        } else {
          setGalleryData([]); // In case data is not an array
        }
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching gallery data:", error);
        setLoading(false); // Ensure loading state is false in case of error
      });
  }, []);

  // Categories from the data
  const categories = [
    "All",
    ...new Set(galleryData.map((item) => item.category)),
  ];

  // Filter gallery items based on selected category
  const filteredImages =
    selectedCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === selectedCategory);

  // Fallback image for missing images or youtubeURL
  const fallbackImage =
    "https://via.placeholder.com/600x400?text=Image+Not+Found";

  // Handle image errors (in case image fails to load)
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    index: number
  ) => {
    event.currentTarget.src = fallbackImage;
    setImageLoading((prev) => {
      const updatedLoading = [...prev];
      updatedLoading[index] = false;
      return updatedLoading;
    });
  };

  // Handle image load success
  const handleImageLoad = (index: number) => {
    setImageLoading((prev) => {
      const updatedLoading = [...prev];
      updatedLoading[index] = false;
      return updatedLoading;
    });
  };

  // Function to handle YouTube URL formatting
  const handleYouTubeURL = (url: string) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Loading spinner component
  const LoadingSpinner = () => (
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative min-h-screen py-16 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Reference Work</h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full border-2 text-lg transition ${
                selectedCategory === category
                  ? "text-black border-black font-semibold hover:scale-105 transform transition duration-300 shadow-lg"
                  : "text-black font-semibold hover:scale-105 transform transition duration-300 shadow-lg"
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
            {filteredImages.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all bg-white"
                onClick={() => setSelectedItem(item)}
              >
                {/* Show loading spinner or actual content */}
                {imageLoading[index] ? (
                  <div className="w-full h-64 bg-gray-200 animate-pulse"></div> // Placeholder while loading
                ) : item.image ? (
                  <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt={item.title}
                    onError={(e) => handleImageError(e, index)}
                    onLoad={() => handleImageLoad(index)}
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
                    src={fallbackImage}
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
                src={handleYouTubeURL(selectedItem.youtubeURL)} // Correct YouTube URL handling
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

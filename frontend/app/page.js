"use client";
import { useState, useCallback, useEffect } from "react";
import { FaDownload, FaMagic } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

// 3D Spinning Wireframe Cuboid Loader
const WireframeSpinner = () => {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 border-2 border-blue-400"
          style={{ transformOrigin: "50% 50%" }}
          animate={{ rotateY: [0, 360], rotateX: [0, 360], rotateZ: [0, 360] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: i * 0.2 }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingText, setLoadingText] = useState("✨ Generating stunning visuals...");

  const loadingMessages = [
    "✨ Generating stunning visuals...",
    "🚀 Creating AI-powered magic...",
    "🎨 Bringing your imagination to life...",
    "⏳ Almost there! Refining details...",
  ];

  useEffect(() => {
    if (loading) {
      let index = 0;
      const interval = setInterval(() => {
        setLoadingText(loadingMessages[index]);
        index = (index + 1) % loadingMessages.length;
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const generateImage = useCallback(async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate image");

      const data = await response.json();
      console.log("API response:", data.image_url);

      setImageUrl(data.image_url);
    } catch (err) {
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white flex flex-col items-center px-4 md:px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300 drop-shadow-lg"
      >
        Pixelor.ai
      </motion.h1>

      <div className="flex flex-col items-center space-y-14">
        <p className="text-lg md:text-xl font-semibold text-gray-200 text-center border-b-2 border-blue-400 pb-2 max-w-2xl">
          Generate stunning AI-generated images with just a few words!
        </p>

        <Card className="w-full max-w-md bg-gray-800/60 p-6 rounded-2xl shadow-xl backdrop-blur-md text-white border border-gray-700">
          <CardContent>
            <Input
              type="text"
              className="mb-4 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 rounded-lg px-4 py-3 text-lg"
              placeholder="Describe your dream image..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white flex items-center justify-center py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-300"
              onClick={generateImage}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Image"} <FaMagic className="ml-2" />
            </motion.button>
          </CardContent>
        </Card>

        {loading && (
          <div className="flex flex-col items-center text-lg font-semibold text-blue-400 animate-pulse">
            <WireframeSpinner />
            <motion.p
              animate={{ y: [0, -5, 0], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="mt-4 text-lg font-semibold text-blue-400"
            >
              {loadingText}
            </motion.p>
          </div>
        )}

        {error && <p className="text-red-500 mt-4 text-center font-semibold">{error}</p>}


        {imageUrl && (
          <div className="mt-6 flex flex-col items-center">
            <img
              src={`${imageUrl}?t=${Date.now()}`} // Prevent caching issues
              alt="Generated AI Art"
              className="rounded-lg shadow-lg max-w-full h-auto border border-gray-700"
              onError={(e) => console.error("Image failed to load:", e)} 
            />

            {/* Download Button */}
            <a
              href={imageUrl}
              download="generated-image.webp"
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center space-x-2"
            >
              <FaDownload /> <span>Download</span>
            </a>
          </div>
        )}
        
      </div>
    </div>
  );
}

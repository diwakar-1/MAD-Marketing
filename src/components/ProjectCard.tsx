import { useState } from "react";
import type { Project } from "../types";
import { MoreVertical, Download, Share2, Trash2 } from "lucide-react";

interface ProjectCardProps {
  gen: Project;
}

const ProjectCard = ({ gen }: ProjectCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getStatus = () => {
    if (gen.isGenerating) return "Generating";
    if (gen.isPublished) return "Published";
    return "Draft";
  };

  const statusClasses = gen.isGenerating
    ? "bg-blue-500/20 text-blue-400 ring-blue-500/40"
    : gen.isPublished
    ? "bg-green-500/20 text-green-400 ring-green-500/40"
    : "bg-yellow-500/20 text-yellow-400 ring-yellow-500/40";

  const handleDownloadImage = () => {
    if (!gen.generatedImage) return;
    const link = document.createElement("a");
    link.href = gen.generatedImage;
    link.download = `${gen.productName}.png`;
    link.click();
    setMenuOpen(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: gen.productName,
        url: window.location.href,
      });
    }
    setMenuOpen(false);
  };

  const handleDelete = () => {
    // for now just UI — hook backend later
    alert("Delete clicked");
    setMenuOpen(false);
  };

  return (
    <div className="mb-4 break-inside-avoid">
      <div className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition relative">
        {/* Preview */}
        <div
          className={`${
            gen.aspectRatio === "9:16"
              ? "aspect-[9/16]"
              : gen.aspectRatio === "1:1"
              ? "aspect-square"
              : "aspect-video"
          } relative overflow-hidden`}
        >
          {/* Status Bubble */}
          <div className="absolute top-2 right-10 z-20">
            <span
              className={`px-2.5 py-1 text-xs rounded-full backdrop-blur ring-1 ${statusClasses}`}
            >
              {getStatus()}
            </span>
          </div>

          {/* 3-Dot Menu */}
          <div className="absolute top-2 right-2 z-30">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition"
            >
              <MoreVertical size={16} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={handleDownloadImage}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  <Download size={14} />
                  Download Image
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  <Share2 size={14} />
                  Share
                </button>

                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Uploaded Images Preview */}
          {gen.uploadImages?.length > 0 && (
            <div className="absolute bottom-3 left-3 flex -space-x-2 z-10">
              {gen.uploadImages.slice(0, 3).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Uploaded"
                  className="w-9 h-9 rounded-full object-cover border-2 border-black/40 bg-black"
                />
              ))}
            </div>
          )}

          {/* Generated Image */}
          {gen.generatedImage ? (
            <img
              src={gen.generatedImage}
              alt={gen.productName}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white/10">
              <span className="text-white/50 text-sm">
                No Preview Available
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-medium text-white">
            {gen.productName}
          </h3>

          {gen.userPrompt && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {gen.userPrompt}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

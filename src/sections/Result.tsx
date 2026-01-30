import { useEffect, useState } from "react";
import type { Project } from "../types";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ImageIcon,
  Loader2Icon,
  RefreshCwIcon,
  Sparkles,
  VideoIcon,
} from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../configs/axios";
import toast from "react-hot-toast";

const Result = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  /* ---------------- FETCH PROJECT ---------------- */
  const fetchProjectData = async () => {
    try {
      const token = await getToken();
      const { data } = await api.get(`/api/user/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProject(data.project);
      setIsGenerating(data.project.isGenerating);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  /* ---------------- AUTH + INITIAL LOAD ---------------- */
  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      navigate("/");
      return;
    }

    fetchProjectData();
  }, [isLoaded, user]);

  /* ---------------- POLLING WHEN GENERATING ---------------- */
  useEffect(() => {
    if (!isGenerating || !user) return;

    const interval = setInterval(fetchProjectData, 2000);
    return () => clearInterval(interval);
  }, [isGenerating, user]);

  /* ---------------- GENERATE VIDEO ---------------- */
  const handleGenerateVideo = async () => {
    if (!project) return;

    setIsGenerating(true);

    try {
      const token = await getToken();
      const { data } = await api.post(
        "/api/project/video",
        { projectId: project.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      setIsGenerating(false);
    }
  };

  /* ---------------- DOWNLOAD ---------------- */
  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  /* ---------------- LOADING ---------------- */
  if (loading || !project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2Icon className="animate-spin text-red-500 size-9" />
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen text-white px-6 md:px-10 py-10 mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-medium">
            Generated Result
          </h1>

          <Link
            to="/create-ad"
            className="btn-secondary text-sm flex items-center gap-2"
          >
            <RefreshCwIcon className="w-4 h-4" />
            New Generation
          </Link>
        </header>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Preview */}
          <div className="flex justify-center">
            <div className="glass-panel p-3 rounded-2xl w-full max-w-lg">
              <div
                className={`${
                  project.aspectRatio === "9:16"
                    ? "aspect-[9/16]"
                    : project.aspectRatio === "1:1"
                    ? "aspect-square"
                    : "aspect-video"
                } bg-black rounded-xl overflow-hidden`}
              >
                {project.generatedVideo ? (
                  <video
                    src={project.generatedVideo}
                    muted
                    autoPlay
                    loop
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={project.generatedImage}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>

              <button
                onClick={() =>
                  project.generatedImage &&
                  downloadFile(project.generatedImage, "image.png")
                }
                disabled={!project.generatedImage}
                className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 mb-3"
              >
                <ImageIcon className="inline mr-2" />
                Download Image
              </button>

              <button
                onClick={() =>
                  project.generatedVideo &&
                  downloadFile(project.generatedVideo, "video.mp4")
                }
                disabled={!project.generatedVideo}
                className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20"
              >
                <VideoIcon className="inline mr-2" />
                Download Video
              </button>
            </div>

            {!project.generatedVideo && (
              <button
                onClick={handleGenerateVideo}
                disabled={isGenerating}
                className="w-full py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30"
              >
                {isGenerating ? "Generating..." : "Generate Video"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;

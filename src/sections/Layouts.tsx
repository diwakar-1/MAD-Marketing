import { useEffect, useMemo, useState } from "react";
import type { Project } from "../types";
import { dummyGenerations } from "../assets/assets";
import ProjectCard from "../components/ProjectCard";

type StatusFilter = "all" | "published" | "draft" | "generating";

const Layouts = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(dummyGenerations);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.productName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        project.userPrompt?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "published"
          ? project.isPublished
          : filter === "generating"
          ? project.isGenerating
          : !project.isPublished && !project.isGenerating;

      return matchesSearch && matchesFilter;
    });
  }, [projects, search, filter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading Layouts...
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-6 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Community</h1>

        <input
          type="text"
          placeholder="Search layouts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 bg-white/5 border border-white/10
            rounded-lg px-4 py-2 text-sm
            focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20
            outline-none transition"
        />
      </div>

      {/* Status Bubbles */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { label: "All", value: "all" },
          { label: "Published", value: "published" },
          { label: "Drafts", value: "draft" },
          { label: "Generating", value: "generating" },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value as StatusFilter)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium
              backdrop-blur transition
              ${
                filter === item.value
                  ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/40"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Masonry Preview Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} gen={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          No layouts found.
        </div>
      )}
    </div>
  );
};

export default Layouts;

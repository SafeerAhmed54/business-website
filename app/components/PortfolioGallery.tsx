"use client";

import { useState } from "react";
import { Project, ProjectCategory } from "@/app/types";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

interface PortfolioGalleryProps {
  projects: Project[];
  categories: ProjectCategory[];
}

export default function PortfolioGallery({
  projects,
  categories,
}: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const handleCategoryFilter = (categoryId: string) => {
    setActiveCategory(categoryId);

    if (categoryId === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.category === categoryId
      );
      setFilteredProjects(filtered);
    }
  };

  const handleProjectClick = (project: Project, imageIndex: number = 0) => {
    setSelectedProject(project);
    setCurrentProjectIndex(
      filteredProjects.findIndex((p) => p.id === project.id)
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleNavigateProject = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (currentProjectIndex + 1) % filteredProjects.length
        : currentProjectIndex === 0
        ? filteredProjects.length - 1
        : currentProjectIndex - 1;

    setCurrentProjectIndex(newIndex);
    setSelectedProject(filteredProjects[newIndex]);
  };

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-4 sm:px-0">
          <button
            onClick={() => handleCategoryFilter("all")}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base min-h-[44px] touch-manipulation ${
              activeCategory === "all"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
            }`}
          >
            <span className="hidden sm:inline">All Projects ({projects.length})</span>
            <span className="sm:hidden">All ({projects.length})</span>
          </button>
          {categories.map((category) => {
            const categoryCount = projects.filter(
              (p) => p.category === category.id
            ).length;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base min-h-[44px] touch-manipulation ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
                }`}
              >
                <span className="hidden sm:inline">{category.name} ({categoryCount})</span>
                <span className="sm:hidden">{category.name.split(' ')[0]} ({categoryCount})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Count and Active Filter */}
      <div className="mb-8 text-center">
        <p className="text-gray-600">
          Showing {filteredProjects.length} project
          {filteredProjects.length !== 1 ? "s" : ""}
          {activeCategory !== "all" && (
            <span className="ml-2 text-blue-600 font-medium">
              in {categories.find((c) => c.id === activeCategory)?.name}
            </span>
          )}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onImageClick={handleProjectClick}
          />
        ))}
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
        projects={filteredProjects}
        currentProjectIndex={currentProjectIndex}
        onNavigateProject={handleNavigateProject}
      />

      {/* No Projects Message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Projects Found
          </h3>
          <p className="text-gray-500">
            No projects match the selected category. Try selecting a different
            filter.
          </p>
        </div>
      )}
    </div>
  );
}

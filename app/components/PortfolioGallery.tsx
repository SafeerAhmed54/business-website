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

  const handleProjectClick = (project: Project) => {
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
      {/* Enhanced Filter Buttons */}
      <div className="mb-12 sm:mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Explore Our Work
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Filter by project type to see our expertise across different domains
          </p>
        </div>
        
        {/* Filter container with glassmorphism */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20 max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <button
              onClick={() => handleCategoryFilter("all")}
              className={`group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-500 text-sm sm:text-base min-h-[48px] touch-manipulation overflow-hidden ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 text-white shadow-2xl shadow-indigo-500/25 scale-105"
                  : "bg-white/80 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 hover:text-indigo-700 border border-gray-200/50 hover:border-indigo-200 hover:shadow-lg hover:scale-102"
              }`}
            >
              {/* Active background animation */}
              {activeCategory === "all" && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 opacity-90"></div>
              )}
              
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="hidden sm:inline">All Projects ({projects.length})</span>
                <span className="sm:hidden">All ({projects.length})</span>
              </span>
            </button>
            
            {categories.map((category) => {
              const categoryCount = projects.filter(
                (p) => p.category === category.id
              ).length;
              
              const getCategoryIcon = (categoryId: string) => {
                switch (categoryId) {
                  case 'signboard':
                    return (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                      </svg>
                    );
                  case 'contracting':
                    return (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    );
                  case 'both':
                    return (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    );
                  default:
                    return null;
                }
              };
              
              const getCategoryGradient = (categoryId: string) => {
                switch (categoryId) {
                  case 'signboard':
                    return activeCategory === categoryId
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/25 scale-105"
                      : "hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 hover:border-indigo-200";
                  case 'contracting':
                    return activeCategory === categoryId
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-2xl shadow-orange-500/25 scale-105"
                      : "hover:from-orange-50 hover:to-red-50 hover:text-orange-700 hover:border-orange-200";
                  case 'both':
                    return activeCategory === categoryId
                      ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-2xl shadow-violet-500/25 scale-105"
                      : "hover:from-violet-50 hover:to-pink-50 hover:text-violet-700 hover:border-violet-200";
                  default:
                    return "";
                }
              };
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.id)}
                  className={`group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-500 text-sm sm:text-base min-h-[48px] touch-manipulation overflow-hidden ${
                    activeCategory === category.id
                      ? getCategoryGradient(category.id)
                      : `bg-white/80 text-gray-700 hover:bg-gradient-to-r ${getCategoryGradient(category.id)} border border-gray-200/50 hover:shadow-lg hover:scale-102`
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {getCategoryIcon(category.id)}
                    <span className="hidden sm:inline">{category.name} ({categoryCount})</span>
                    <span className="sm:hidden">{category.name.split(' ')[0]} ({categoryCount})</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Projects Count Display */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-medium">
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
            </span>
          </div>
          {activeCategory !== "all" && (
            <>
              <div className="w-px h-4 bg-gray-300"></div>
              <span className="text-indigo-600 font-semibold">
                {categories.find((c) => c.id === activeCategory)?.name}
              </span>
            </>
          )}
        </div>
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

      {/* Enhanced No Projects Message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
            <div className="text-gray-400 mb-6">
              <div className="relative">
                <svg
                  className="w-20 h-20 mx-auto opacity-60"
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
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Projects Found
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              No projects match the selected category. Try selecting a different filter to explore our work.
            </p>
            <button
              onClick={() => handleCategoryFilter("all")}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              View All Projects
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

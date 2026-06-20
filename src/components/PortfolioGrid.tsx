"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./PortfolioGrid.module.css";
import ScrollReveal from "./ScrollReveal";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  client: string;
  year: string;
}

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Vibrant Gaming Victory",
      category: "thumbnails",
      image: "/gaming_thumbnail.png",
      description: "A high-conversion, action-packed YouTube thumbnail featuring futuristic characters and glowing 3D typography to boost click-through rates.",
      client: "Gaming YouTuber",
      year: "2024",
    },
    {
      id: 2,
      title: "CHRONOS Sci-Fi Cinematic Poster",
      category: "posters",
      image: "/movie_poster.png",
      description: "Cinematic sci-fi poster using high-end photo manipulation, color grading, and custom metallic text design to capture a cosmic visual concept.",
      client: "Independent Film Maker",
      year: "2023",
    },
    {
      id: 3,
      title: "Future India Academy Brand Campaign",
      category: "branding",
      image: "/branding_material.png",
      description: "Corporate academic branding and marketing material design containing modern clean layouts, corporate vectors, and creative typography.",
      client: "Future India Academy",
      year: "2023",
    },
    {
      id: 4,
      title: "Creative Edge Influencer Kit",
      category: "branding",
      image: "/social_creative.png",
      description: "Sleek social media visual identity banner and cover layout with glowing geometric shapes, designed for high-reach social creators.",
      client: "Digital Content Influencer",
      year: "2025",
    },
  ];

  const filters = [
    { id: "all", label: "All Works" },
    { id: "thumbnails", label: "Thumbnails" },
    { id: "posters", label: "Posters" },
    { id: "branding", label: "Branding" },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <div className="container">
        <ScrollReveal direction="up">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionTag}>CREATIVE PORTFOLIO</p>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
          </div>
        </ScrollReveal>

        {/* Filter Navigation */}
        <ScrollReveal direction="up" delay={100}>
          <div className={styles.filterTabs}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`${styles.filterBtn} ${activeFilter === filter.id ? styles.activeFilter : ""}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className={styles.grid}>
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} direction="up" delay={(idx % 2) * 150}>
              <div
                className={styles.card}
                onClick={() => setSelectedProject(project)}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.projectImg}
                  />
                  <div className={styles.overlay}>
                    <div className={styles.overlayContent}>
                      <span className={styles.projectCategory}>{project.category}</span>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <div className={styles.viewBadge}>
                        <span>View Project</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div className={styles.modal} onClick={() => setSelectedProject(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedProject(null)} aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className={styles.modalBody}>
              <div className={styles.modalImageWrapper}>
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  width={800}
                  height={500}
                  className={styles.modalImg}
                />
              </div>
              <div className={styles.modalDetails}>
                <span className={styles.modalCategory}>{selectedProject.category}</span>
                <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                <p className={styles.modalDesc}>{selectedProject.description}</p>
                <div className={styles.modalMetaGrid}>
                  <div className={styles.metaBox}>
                    <span className={styles.metaLabel}>Client</span>
                    <span className={styles.metaValue}>{selectedProject.client}</span>
                  </div>
                  <div className={styles.metaBox}>
                    <span className={styles.metaLabel}>Year</span>
                    <span className={styles.metaValue}>{selectedProject.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

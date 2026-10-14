import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SELECTED_WORK } from '../../content/siteContent';

export const SelectedWorkSection: React.FC = () => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Split projects into 2 asymmetric columns
  const col1 = [SELECTED_WORK[0], SELECTED_WORK[2]];
  const col2 = [SELECTED_WORK[1], SELECTED_WORK[3]];

  return (
    <section
      id="work"
      aria-label="Selected Client Work"
      className="relative py-24 md:py-36 bg-[#0A0A0B] border-b border-white/[0.08]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F]">
              // 04 SELECTED WORK
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tighter uppercase mt-2">
              ENGINEERED CASE STUDIES.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8A8A8E] max-w-sm uppercase leading-relaxed">
            Every project engineered for measurable search reach, sub-second latency, and verified conversion pipelines.
          </p>
        </div>

        {/* Asymmetric 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">
          {/* Column 1 */}
          <div className="flex flex-col gap-12 sm:gap-16">
            {col1.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isHovered={hoveredProjectId === project.id}
                onHover={() => setHoveredProjectId(project.id)}
                onLeave={() => setHoveredProjectId(null)}
              />
            ))}
          </div>

          {/* Column 2 (Parallax Offset Downwards) */}
          <div className="flex flex-col gap-12 sm:gap-16 md:mt-24">
            {col2.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isHovered={hoveredProjectId === project.id}
                onHover={() => setHoveredProjectId(project.id)}
                onLeave={() => setHoveredProjectId(null)}
              />
            ))}
          </div>
        </div>

        {/* Bottom Explorer CTA */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="font-mono text-xs text-[#8A8A8E] uppercase tracking-wider">
            All case studies populated with client metric verification [TODO]
          </span>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white bg-[#111113] border border-white/20 hover:border-[#FF5A1F] transition-all hover:scale-105 active:scale-95"
          >
            <span>View All Archives</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: (typeof SELECTED_WORK)[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isHovered,
  onHover,
  onLeave,
}) => {
  return (
    <Link
      to={`/projects/${project.slug}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group block relative rounded-3xl overflow-hidden bg-[#111113] border border-white/10 hover:border-[#FF5A1F]/60 transition-all duration-300 shadow-2xl"
      data-cursor="VIEW"
    >
      {/* Media Tile with Image and Video Preview Replacement on Hover */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#161619]">
        {/* Placeholder Image */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 ${
            isHovered && project.previewVideoUrl ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,90,31,0.2) 0%, rgba(10,10,11,0.95) 100%), linear-gradient(to bottom, transparent, #0A0A0B)`,
          }}
        >
          {/* Subtle geometric grid texture fallback */}
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-tech-grid">
            <span className="font-mono text-xs text-[#FF5A1F] tracking-widest uppercase mb-2">
              // CASE ARCHIVE
            </span>
            <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              {project.title}
            </span>
            <span className="font-mono text-xs text-[#8A8A8E] mt-3">
              {project.client}
            </span>
          </div>
        </div>

        {/* Video preview replacement on hover */}
        {project.previewVideoUrl && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          >
            <source src={project.previewVideoUrl} type="video/mp4" />
          </video>
        )}

        {/* Top Badges */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-[#0A0A0B]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white uppercase tracking-wider">
            {project.category}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F]/40 font-mono text-[10px] text-[#FF8A3D] font-bold">
            {project.year}
          </span>
        </div>

        {/* Bottom Result Pill */}
        {project.results[0] && (
          <div className="absolute bottom-5 left-5 z-10 pointer-events-none">
            <div className="px-4 py-2 rounded-2xl bg-[#0A0A0B]/90 backdrop-blur-md border border-white/15 flex items-center gap-2">
              <span className="font-display font-black text-lg text-[#FF5A1F]">
                {project.results[0].metric}
              </span>
              <span className="font-mono text-[10px] text-[#8A8A8E] uppercase">
                {project.results[0].label}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card Metadata */}
      <div className="p-6 sm:p-8 bg-[#111113]">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono uppercase text-[#8A8A8E] bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display font-bold text-2xl text-white group-hover:text-[#FF5A1F] transition-colors flex items-center justify-between">
          <span>{project.title}</span>
          <span className="text-sm font-mono text-[#FF5A1F] group-hover:translate-x-1.5 transition-transform">
            →
          </span>
        </h3>

        <p className="text-xs sm:text-sm text-[#8A8A8E] mt-2 line-clamp-2 leading-relaxed">
          {project.summary}
        </p>
      </div>
    </Link>
  );
};

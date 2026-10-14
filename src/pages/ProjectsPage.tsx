import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../lib/api';
import { ProjectItem } from '../types';
import { ProjectModal } from '../components/common/ProjectModal';
import { ArrowUpRight, Eye } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects().then((data) => setProjects(data));
  }, []);

  const categories = ['All', 'SEO & AEO', 'Web Development', 'Google & Meta Ads', 'Social Media', 'AI & Infrastructure'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => {
          if (selectedCategory === 'SEO & AEO') return p.category.includes('Marketing') || p.category.includes('SEO');
          if (selectedCategory === 'Web Development') return p.category.includes('Web') || p.category.includes('commerce');
          if (selectedCategory === 'Google & Meta Ads') return p.category.includes('Marketing') || p.category.includes('Branding');
          if (selectedCategory === 'Social Media') return p.category.includes('Marketing') || p.category.includes('Branding');
          if (selectedCategory === 'AI & Infrastructure') return p.category.includes('AI') || p.category.includes('App');
          return p.category === selectedCategory;
        });

  return (
    <div className="pt-32 pb-24 bg-[#060709] bg-tech-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#FC6603] uppercase">
            SELECTED CLIENT COMMISSIONS
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight mt-3 leading-tight">
            ENGINEERED WITH PURPOSE.
          </h1>
          <p className="text-lg text-zinc-400 mt-5 leading-relaxed">
            Case studies of high-performance web systems, AI automations, and conversion platforms built for category-defining leaders.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus:outline-none ${
                selectedCategory === cat
                  ? 'bg-[#FC6603] text-white shadow-[0_0_15px_rgba(252,102,3,0.35)] font-semibold'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#FC6603]/40 transition-all duration-300 flex flex-col h-full bg-[#0E1017] group"
            >
              {/* Browser Header Bar */}
              <div className="px-5 py-3 border-b border-white/10 bg-black/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="px-3 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-zinc-400">
                  {project.client}
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#FC6603]/15 text-[#FC6603]">
                  {project.category}
                </span>
              </div>

              {/* Image */}
              <div
                className="relative aspect-[16/10] overflow-hidden bg-black cursor-pointer group/img"
                onClick={() => setActiveModalProject(project)}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProject(project);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#FC6603] text-white text-xs font-semibold flex items-center gap-2 shadow-xl"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Preview</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-[#FC6603] transition-colors leading-snug">
                    {project.title}
                  </h2>
                  <p className="text-sm text-zinc-400 mt-2.5 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                  >
                    Overview
                  </button>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FC6603] hover:text-[#FF8833] group/btn"
                  >
                    <span>Full Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { fetchProjects } from '../../lib/api';
import { ProjectItem } from '../../types';
import { ProjectModal } from '../common/ProjectModal';
import { ArrowUpRight, ArrowRight, Eye, Sparkles } from 'lucide-react';

export const FeaturedProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    fetchProjects().then((data) => setProjects(data));
  }, []);

  const categories = ['All', 'Websites', 'AI & Applications', 'E-commerce', 'App Development', 'Branding'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Helper to determine asymmetric column span
  const getColSpanClass = (index: number) => {
    // Row 1: 7 / 5 split
    if (index === 0) return 'lg:col-span-7';
    if (index === 1) return 'lg:col-span-5';
    // Row 2: Full width 12
    if (index === 2) return 'lg:col-span-12';
    // Row 3: 6 / 6 split
    if (index === 3) return 'lg:col-span-6';
    if (index === 4) return 'lg:col-span-6';
    // Row 4+: 6 / 6
    return 'lg:col-span-6';
  };

  const getAspectClass = (index: number) => {
    if (index === 0) return 'aspect-[16/11]';
    if (index === 1) return 'aspect-[16/11]';
    if (index === 2) return 'aspect-[21/9] sm:aspect-[2.4/1]';
    return 'aspect-[16/10]';
  };

  return (
    <section id="projects" className="relative py-28 bg-[#060709] overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-radial-glow pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Split-Header Ban compliance (single stacked header) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/10">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
              WORK THAT MOVES MARKETS.
            </h2>
            <p className="text-base text-zinc-400 mt-3 max-w-2xl leading-relaxed">
              Explore our recent enterprise applications, quantitative platforms, and interactive digital experiences.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FC6603] hover:text-[#FF8833] group pb-1 shrink-0"
            data-cursor-hover
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus:outline-none ${
                selectedCategory === cat
                  ? 'bg-[#FC6603] text-white shadow-[0_0_18px_rgba(252,102,3,0.4)] font-semibold'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
              }`}
              data-cursor-hover
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetrical Editorial Projects Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-white/10 bg-[#0E1017]">
            <p className="text-zinc-400 text-sm">
              No public case studies in this category currently. Private client briefs available upon inquiry.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`${getColSpanClass(idx)} group flex flex-col`}
                >
                <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#FC6603]/40 transition-all duration-300 flex flex-col h-full bg-[#0E1017] shadow-xl">
                  {/* Browser Mockup Top Chrome Bar */}
                  <div className="px-5 py-3 border-b border-white/10 bg-black/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="px-3 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-zinc-400 truncate max-w-[240px]">
                      {project.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded bg-[#FC6603]/15 text-[#FC6603] border border-[#FC6603]/20">
                      {project.category}
                    </span>
                  </div>

                  {/* Thumbnail Image Container with Quick View Action */}
                  <div
                    className={`relative ${getAspectClass(idx)} overflow-hidden bg-black cursor-pointer group/img`}
                    onClick={() => setActiveModalProject(project)}
                    data-cursor-hover
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                    />

                    {/* Gradient Overlay & Hover Floating Action */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalProject(project);
                        }}
                        className="px-6 py-3 rounded-full bg-[#FC6603] text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_25px_rgba(252,102,3,0.5)] transform translate-y-3 group-hover/img:translate-y-0 transition-transform duration-300"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View Case Study</span>
                      </button>
                    </div>

                    {/* Documented Outcome Highlight Badge */}
                    {project.results && project.results.length > 0 && (
                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto z-10">
                        <div className="px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 text-[11px] font-mono text-zinc-200 flex items-center gap-2 shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603]" />
                          <span className="truncate">{project.results[0]}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Editorial Content Footer */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-2.5">
                        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                          {project.client}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          {project.technologies.slice(0, 3).map((t, ti) => (
                            <span
                              key={ti}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-[#FC6603] transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-sm text-zinc-400 mt-2.5 line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                        data-cursor-hover
                      >
                        Architecture Summary
                      </button>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FC6603] hover:text-[#FF8833] group/btn"
                        data-cursor-hover
                      >
                        <span>Full Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};

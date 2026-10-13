import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { fetchProjects } from '../../lib/api';
import { ProjectItem } from '../../types';
import { ProjectModal } from '../common/ProjectModal';
import { ArrowUpRight, ArrowRight, Sparkles, Eye } from 'lucide-react';

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

  return (
    <section id="projects" className="relative py-28 bg-[#060709] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-glow pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-semibold tracking-widest text-[#FC6603] uppercase">
              FEATURED PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mt-3">
              SELECTED WORK. BUILT WITH PURPOSE.
            </h2>
            <p className="text-base text-zinc-400 mt-4 max-w-2xl leading-relaxed">
              Explore our recent enterprise applications, high-converting platforms, and interactive digital experiences.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FC6603] hover:text-[#FF8833] group pb-2 shrink-0"
          >
            <span>View all case studies</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
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

        {/* Projects Grid: 2 columns with browser mockup wrappers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative"
              >
                <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#FC6603]/40 transition-all duration-300 flex flex-col h-full bg-[#0E1017]">
                  {/* Browser Mockup Top Chrome Bar */}
                  <div className="px-5 py-3 border-b border-white/10 bg-black/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="px-3 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-zinc-400 truncate max-w-[200px]">
                      {project.client.toLowerCase().replace(/\s+/g, '')}.com
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#FC6603]/15 text-[#FC6603]">
                      {project.category}
                    </span>
                  </div>

                  {/* Thumbnail Image with Hover Quick View Action */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black cursor-pointer group/img"
                       onClick={() => setActiveModalProject(project)}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalProject(project);
                        }}
                        className="px-5 py-2.5 rounded-full bg-[#FC6603] text-white text-xs font-semibold flex items-center gap-2 shadow-xl transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View Case Study</span>
                      </button>
                    </div>
                  </div>

                  {/* Content Footer */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="text-xs font-mono text-zinc-400 uppercase">
                          {project.client}
                        </span>
                        <div className="flex items-center gap-1.5">
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
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                      >
                        Read Architecture Summary
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../types';
import { X, ExternalLink, CheckCircle2, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden border border-white/15 bg-[#0B0D13] shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar / Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold text-[#FC6603] bg-[#FC6603]/10 uppercase">
                {project.category}
              </span>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                Client: {project.client}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Project Image Preview */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 relative group">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto max-h-[420px] object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-zinc-300 text-base leading-relaxed mt-3">
                {project.summary}
              </p>
            </div>

            {/* Challenge & Solution Grid */}
            {(project.challenge || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                {project.challenge && (
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <h4 className="text-xs font-mono font-semibold uppercase text-zinc-400 tracking-wider mb-2">
                      The Challenge
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div className="p-5 rounded-2xl bg-[#FC6603]/[0.04] border border-[#FC6603]/20">
                    <h4 className="text-xs font-mono font-semibold uppercase text-[#FC6603] tracking-wider mb-2">
                      Our Architectural Solution
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Measurable Results */}
            {project.results && project.results.length > 0 && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#10131C] to-[#151926] border border-white/10">
                <h4 className="text-xs font-mono font-semibold uppercase text-[#FC6603] tracking-wider mb-4">
                  Measurable Impact & Results
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.results.map((res, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FC6603] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-white">{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="pt-2">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                Core Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="px-6 py-4 border-t border-white/10 bg-black/60 flex items-center justify-between">
            <Link
              to={`/projects/${project.slug}`}
              onClick={onClose}
              className="text-xs font-medium text-[#FC6603] hover:underline"
            >
              Open Dedicated Case Study Page →
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#FC6603] hover:bg-[#FF771E] transition-colors"
            >
              Start Similar Project
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

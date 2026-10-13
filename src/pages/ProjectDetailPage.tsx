import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProjectBySlug } from '../lib/api';
import { ProjectItem } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      setLoading(true);
      fetchProjectBySlug(slug).then((data) => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[#060709] flex items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-400 font-mono text-sm">
          <div className="w-3 h-3 rounded-full bg-[#FC6603] animate-ping" />
          <span>Loading Case Study...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[#060709] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-display font-bold text-white">Project Not Found</h2>
        <p className="text-zinc-400 mt-2 mb-6 text-sm">The case study you requested could not be located.</p>
        <Link
          to="/projects"
          className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FC6603]"
        >
          View All Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-[#060709] bg-tech-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Hero Meta Header */}
        <div className="max-w-4xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold text-[#FC6603] bg-[#FC6603]/10 uppercase">
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-400">
              Client: {project.client}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 mt-4 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Large Main Showcase Image */}
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl mb-16">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-auto max-h-[640px] object-cover"
          />
        </div>

        {/* Challenge, Solution & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Main Case Narrative (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {project.challenge && (
              <div className="glass-panel rounded-3xl p-8 border border-white/10 bg-[#0E1017]">
                <h2 className="text-xl font-display font-bold text-white mb-4">
                  The Problem & Technical Challenge
                </h2>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="glass-panel rounded-3xl p-8 border border-[#FC6603]/20 bg-[#0E1017]">
                <h2 className="text-xl font-display font-bold text-[#FC6603] mb-4">
                  The Alphalinkx Architectural Solution
                </h2>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}

            {/* Measurable Results */}
            {project.results && project.results.length > 0 && (
              <div className="glass-panel rounded-3xl p-8 border border-white/10 bg-gradient-to-br from-[#121626] to-[#0A0C14]">
                <h3 className="text-xl font-display font-bold text-white mb-6">
                  Measurable Business & Engineering Outcomes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {project.results.map((res, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-black/40 border border-white/5">
                      <CheckCircle2 className="w-5 h-5 text-[#FC6603] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-white leading-snug">{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Project Meta (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#0E1017]">
              <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                Services Delivered
              </h3>
              <div className="space-y-2">
                {project.services.map((srv, i) => (
                  <div key={i} className="text-xs font-mono text-zinc-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603]" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mt-8 mb-4 pb-2 border-b border-white/10">
                Technologies Utilized
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-gradient-to-b from-[#141826] to-[#0D101A] text-center">
              <h4 className="text-lg font-display font-bold text-white mb-2">
                Need a similar system?
              </h4>
              <p className="text-xs text-zinc-400 mb-6">
                Our architects can evaluate your scope and build a production roadmap.
              </p>
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold text-white bg-[#FC6603] hover:bg-[#FF771E] shadow-lg shadow-[#FC6603]/30 transition-all"
              >
                <span>Initiate Your Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

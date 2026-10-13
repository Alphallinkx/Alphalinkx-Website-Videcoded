import React, { useState, useEffect } from 'react';
import {
  adminLogin,
  fetchAdminStats,
  fetchAdminInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../lib/api';
import { AdminStats, InquiryRecord } from '../types';
import {
  Lock,
  Mail,
  User,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  LogOut,
  RefreshCw,
  FolderKanban,
  Users,
  Send,
  MessageSquare,
  AlertCircle,
  FileText,
  X,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('alphalinkx_admin_token'));
  const [email, setEmail] = useState('admin@alphalinkx.com');
  const [password, setPassword] = useState('Alphalinkx2026!');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Data
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Detail Modal
  const [activeInquiry, setActiveInquiry] = useState<InquiryRecord | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [updatingNotes, setUpdatingNotes] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      loadDashboardData(token);
    }
  }, [token]);

  const loadDashboardData = async (activeToken: string) => {
    setDataLoading(true);
    try {
      const [statsData, inqData] = await Promise.all([
        fetchAdminStats(activeToken),
        fetchAdminInquiries(activeToken, statusFilter, searchQuery),
      ]);
      setStats(statsData);
      setInquiries(inqData);
    } catch (err: any) {
      console.error('Error loading dashboard:', err);
      if (err.message?.includes('session') || err.message?.includes('token')) {
        handleLogout();
      }
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await adminLogin(email, password);
      localStorage.setItem('alphalinkx_admin_token', res.token);
      setToken(res.token);
    } catch (err: any) {
      setLoginError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('alphalinkx_admin_token');
    setToken(null);
    setStats(null);
    setInquiries([]);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!token) return;
    try {
      await updateInquiryStatus(token, id, newStatus);
      // Update local state
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus as any } : inq))
      );
      if (activeInquiry && activeInquiry.id === id) {
        setActiveInquiry({ ...activeInquiry, status: newStatus as any });
      }
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleSaveNotes = async () => {
    if (!token || !activeInquiry) return;
    setUpdatingNotes(true);
    try {
      await updateInquiryStatus(token, activeInquiry.id, activeInquiry.status, internalNotes);
      setInquiries((prev) =>
        prev.map((inq) =>
          inq.id === activeInquiry.id ? { ...inq, notes: internalNotes } : inq
        )
      );
      setActiveInquiry({ ...activeInquiry, notes: internalNotes });
      alert('Notes saved successfully.');
    } catch (err) {
      alert('Failed to save notes.');
    } finally {
      setUpdatingNotes(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to permanently delete this lead?')) return;
    try {
      await deleteInquiry(token, id);
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      if (activeInquiry && activeInquiry.id === id) {
        setActiveInquiry(null);
      }
    } catch (err) {
      alert('Failed to delete inquiry.');
    }
  };

  // 1. If not logged in, show secure login form
  if (!token) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[#060709] bg-tech-grid flex items-center justify-center px-4">
        <div className="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 bg-[#0E1017]">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FC6603] mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-[#FC6603] tracking-widest uppercase font-semibold">
              RESTRICTED ACCESS
            </span>
            <h1 className="text-2xl font-display font-bold text-white mt-1">
              Alphalinkx Admin Portal
            </h1>
            <p className="text-xs text-zinc-400 mt-2">
              Default credentials: <code className="text-[#FC6603]">admin@alphalinkx.com</code> / <code className="text-[#FC6603]">Alphalinkx2026!</code>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FC6603] focus:ring-1 focus:ring-[#FC6603] transition-all"
                />
                <Mail className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FC6603] focus:ring-1 focus:ring-[#FC6603] transition-all"
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-[#FC6603] hover:bg-[#FF771E] active:scale-[0.98] text-white font-semibold text-sm transition-all disabled:opacity-60 shadow-[0_0_20px_rgba(252,102,3,0.35)] mt-2"
            >
              {loginLoading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Logged in Admin Dashboard
  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#060709] bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                ADMINISTRATION CONSOLE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
              Lead & Agency Intelligence Hub
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => token && loadDashboardData(token)}
              disabled={dataLoading}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-2 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${dataLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-mono text-rose-400 flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Real Metrics Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#0E1017]">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs font-mono uppercase">New Inquiries</span>
                <Clock className="w-4 h-4 text-[#FC6603]" />
              </div>
              <div className="text-3xl font-display font-bold text-white">
                {stats.newInquiries}
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">Awaiting review</p>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#0E1017]">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs font-mono uppercase">Total Leads</span>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-display font-bold text-white">
                {stats.totalInquiries}
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">All time received</p>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#0E1017]">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs font-mono uppercase">Active Projects</span>
                <FolderKanban className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-3xl font-display font-bold text-white">
                {stats.totalProjects}
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">Live portfolio case studies</p>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#0E1017]">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs font-mono uppercase">Subscribers</span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-display font-bold text-white">
                {stats.totalSubscribers}
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">Intel newsletter subscribers</p>
            </div>
          </div>
        )}

        {/* Inquiries Management Section */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#0E1017]">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <span>Project Inquiries</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                {inquiries.length}
              </span>
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && token && loadDashboardData(token)}
                  className="px-3.5 py-1.5 pl-8 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#FC6603]"
                />
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  if (token) {
                    setDataLoading(true);
                    fetchAdminInquiries(token, e.target.value, searchQuery).then((data) => {
                      setInquiries(data);
                      setDataLoading(false);
                    });
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-zinc-300 text-xs focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">NEW</option>
                <option value="IN_REVIEW">IN_REVIEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-zinc-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="pb-3 pl-2">Prospect</th>
                  <th className="pb-3">Service</th>
                  <th className="pb-3">Budget</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                    onClick={() => {
                      setActiveInquiry(inq);
                      setInternalNotes(inq.notes || '');
                    }}
                  >
                    <td className="py-3.5 pl-2">
                      <div className="font-semibold text-white group-hover:text-[#FC6603] transition-colors">
                        {inq.name}
                      </div>
                      <div className="text-zinc-400 text-[11px]">
                        {inq.email} {inq.company && `· ${inq.company}`}
                      </div>
                    </td>

                    <td className="py-3.5 text-zinc-300">
                      {inq.service}
                    </td>

                    <td className="py-3.5 font-mono text-zinc-300">
                      {inq.budget || '—'}
                    </td>

                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          inq.status === 'NEW'
                            ? 'bg-[#FC6603]/15 text-[#FC6603] border border-[#FC6603]/30'
                            : inq.status === 'IN_REVIEW'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : inq.status === 'CONTACTED'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>

                    <td className="py-3.5 font-mono text-zinc-500 text-[11px]">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 pr-2 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                          className="bg-black/60 border border-white/15 text-zinc-300 text-[11px] rounded px-2 py-1"
                        >
                          <option value="NEW">NEW</option>
                          <option value="IN_REVIEW">IN_REVIEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>

                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-1 rounded text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {inquiries.length === 0 && (
              <div className="py-12 text-center text-zinc-500 text-xs">
                No inquiries match your current search and filter criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inquiry Detail & Internal Notes Drawer / Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-[#0E1017] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-mono text-[#FC6603] font-semibold uppercase">
                  Lead Details
                </span>
                <h3 className="text-xl font-display font-bold text-white mt-1">
                  {activeInquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveInquiry(null)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-white/5">
                <div>
                  <span className="text-zinc-500 font-mono">Email:</span>
                  <p className="text-white font-medium mt-0.5">{activeInquiry.email}</p>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Company:</span>
                  <p className="text-white font-medium mt-0.5">{activeInquiry.company || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Service:</span>
                  <p className="text-[#FC6603] font-medium mt-0.5">{activeInquiry.service}</p>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Budget:</span>
                  <p className="text-white font-medium mt-0.5">{activeInquiry.budget || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Timeline:</span>
                  <p className="text-white font-medium mt-0.5">{activeInquiry.timeline || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Submitted:</span>
                  <p className="text-white font-medium mt-0.5">{new Date(activeInquiry.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <span className="text-zinc-400 font-mono uppercase block mb-1">
                  Project Description:
                </span>
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-zinc-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {activeInquiry.description}
                </div>
              </div>

              {/* Internal Notes Editor */}
              <div className="pt-2">
                <span className="text-zinc-400 font-mono uppercase block mb-1">
                  Agency Internal Notes:
                </span>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Record internal call notes, assigned architect, deal status..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#FC6603]"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={updatingNotes}
                  className="mt-2 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#FC6603] hover:bg-[#FF771E] disabled:opacity-60 transition-colors"
                >
                  {updatingNotes ? 'Saving...' : 'Save Internal Notes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

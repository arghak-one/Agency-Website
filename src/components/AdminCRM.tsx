import { useState, useEffect, FormEvent } from 'react';
import {
  Users,
  Lock,
  LogOut,
  Globe,
  Search,
  Filter,
  Calendar,
  Check,
  CheckCircle,
  Phone,
  Mail,
  ArrowLeft,
  Briefcase,
  Clock,
  AlertCircle,
  X,
  FileText,
  User,
  Building,
  Trash2,
  Download,
  CheckSquare,
  Database,
  Copy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Lead {
  id: string | number;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  service_required: string;
  project_budget: string;
  project_requirements: string;
  status: string;
  created_at: string;
}

export default function AdminCRM() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [budgetFilter, setBudgetFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  
  // Detail Modal state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | number | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | number | null>(null);
  const [dbStatus, setDbStatus] = useState({
    configured: false,
    supabase: false,
    tableMissing: false
  });

  // Load session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('nexora_admin_token');
    if (token) {
      setIsLoggedIn(true);
      fetchLeads(token);
    }
  }, []);

  // Fetch leads from server
  const fetchLeads = async (token: string) => {
    setIsLoadingLeads(true);
    try {
      const response = await fetch('/api/admin/leads', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setLeads(data.leads);
        setDbStatus({
          configured: data.supabase !== undefined,
          supabase: data.supabase || false,
          tableMissing: data.tableMissing || false
        });
      } else {
        // Stale or invalid token
        handleLogout();
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const [showSql, setShowSql] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const sqlCode = `-- NEXORA LEADS SCHEMA BOOTSTRAP SCRIPT
CREATE TABLE IF NOT EXISTS public.leads (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_required TEXT NOT NULL,
  project_budget TEXT NOT NULL,
  project_requirements TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New Lead',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Restrict public select" ON public.leads FOR SELECT USING (false);
CREATE POLICY "Restrict public update" ON public.leads FOR UPDATE USING (false);
CREATE POLICY "Restrict public delete" ON public.leads FOR DELETE USING (false);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  // Handle Login submission
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) {
      setLoginError('Password is required');
      return;
    }

    setLoginError('');
    setIsLoggingIn(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('nexora_admin_token', data.token);
        setIsLoggedIn(true);
        fetchLeads(data.token);
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('Connection failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('nexora_admin_token');
    setIsLoggedIn(false);
    setLeads([]);
  };

  // Update Status
  const handleStatusChange = async (leadId: string | number, newStatus: string) => {
    const token = localStorage.getItem('nexora_admin_token');
    if (!token) return;

    setStatusUpdatingId(leadId);
    try {
      const response = await fetch(`/api/admin/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        // Update local state
        setLeads(prevLeads =>
          prevLeads.map(l => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Delete Lead
  const handleDeleteLead = async (leadId: string | number) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead? This action cannot be undone.')) {
      return;
    }

    const token = localStorage.getItem('nexora_admin_token');
    if (!token) return;

    setIsDeletingId(leadId);
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setLeads(prevLeads => prevLeads.filter(l => l.id !== leadId));
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(null);
        }
      } else {
        alert(data.error || 'Failed to delete lead');
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
      alert('Failed to delete lead. Please try again.');
    } finally {
      setIsDeletingId(null);
    }
  };

  // Export Leads to CSV
  const exportToCSV = () => {
    if (filteredLeads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    // Define CSV headers
    const headers = [
      'ID',
      'Full Name',
      'Business Name',
      'Email',
      'Phone',
      'Service Required',
      'Project Budget',
      'Project Requirements',
      'Status',
      'Date Submitted'
    ];

    // Helper to escape CSV fields
    const escapeCSV = (val: any) => {
      if (val === null || val === undefined) return '';
      const stringified = String(val);
      if (stringified.includes('"') || stringified.includes(',') || stringified.includes('\n') || stringified.includes('\r')) {
        return `"${stringified.replace(/"/g, '""')}"`;
      }
      return stringified;
    };

    // Construct CSV rows
    const csvRows = [
      headers.join(','), // Header row
      ...filteredLeads.map(lead => [
        escapeCSV(lead.id),
        escapeCSV(lead.full_name),
        escapeCSV(lead.business_name),
        escapeCSV(lead.email),
        escapeCSV(lead.phone),
        escapeCSV(lead.service_required),
        escapeCSV(lead.project_budget),
        escapeCSV(lead.project_requirements),
        escapeCSV(lead.status),
        escapeCSV(new Date(lead.created_at).toLocaleString())
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Trigger download
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `nexora_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate stats counters
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New Lead').length;
  const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
  const closedDeals = leads.filter(l => l.status === 'Closed Deal').length;

  // Filter and Search Leads
  const filteredLeads = leads
    .filter(lead => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        lead.full_name?.toLowerCase().includes(query) ||
        lead.business_name?.toLowerCase().includes(query) ||
        lead.email?.toLowerCase().includes(query) ||
        lead.phone?.toLowerCase().includes(query);

      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchesService = serviceFilter === 'All' || lead.service_required === serviceFilter;
      const matchesBudget = budgetFilter === 'All' || lead.project_budget === budgetFilter;

      // Date filtering
      let matchesDate = true;
      if (dateFilter !== 'All') {
        const leadDate = new Date(lead.created_at);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        if (dateFilter === 'Today') {
          matchesDate = leadDate >= today;
        } else if (dateFilter === 'Yesterday') {
          const endOfYesterday = new Date(yesterday);
          endOfYesterday.setHours(23, 59, 59, 999);
          matchesDate = leadDate >= yesterday && leadDate <= endOfYesterday;
        } else if (dateFilter === 'Week') {
          matchesDate = leadDate >= sevenDaysAgo;
        } else if (dateFilter === 'Month') {
          matchesDate = leadDate >= thirtyDaysAgo;
        }
      }

      return matchesSearch && matchesStatus && matchesService && matchesBudget && matchesDate;
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Extract unique options for filter lists dynamically
  const uniqueServices = Array.from(new Set(leads.map(l => l.service_required))).filter(Boolean);
  const uniqueBudgets = Array.from(new Set(leads.map(l => l.project_budget))).filter(Boolean);

  // Status color helpers
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'New Lead':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'Contacted':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'Proposal Sent':
        return 'bg-purple-50 text-purple-700 border-purple-200/60';
      case 'Closed Deal':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/60';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#0F172A] font-sans">
      {!isLoggedIn ? (
        // Beautiful Centered Login Screen
        <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden bg-[#0F172A]">
          {/* Decorative gradients */}
          <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative"
          >
            {/* Branding header */}
            <div className="text-center mb-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 mb-4 text-white shadow-lg shadow-blue-500/20">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Nexora CRM portal
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your administrative credentials to manage enterprise client leads.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                  Admin Security Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-4 pr-10 py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 transition-all"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
                {loginError && (
                  <p className="text-[11px] text-red-500 mt-2 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {loginError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-xs uppercase tracking-wider text-white hover:brightness-110 active:scale-99 transition-all cursor-pointer shadow-lg shadow-blue-500/15 flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Authorize Access'
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Public Website
              </a>
            </div>
          </motion.div>
        </div>
      ) : (
        // CRM Dashboard
        <div className="min-h-screen flex flex-col bg-slate-50">
          
          {/* Dashboard Header */}
          <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm px-4 sm:px-6 lg:px-8 py-4">
            <div className="mx-auto max-w-7xl flex items-center justify-between">
              
              {/* Branding */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  N
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
                    NEXORA CRM
                  </h1>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
                    Lead Management System
                  </p>
                </div>
              </div>

              {/* Utility nodes */}
              <div className="flex items-center gap-4">
                <a
                  href="/"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors bg-slate-100 px-3.5 py-2 rounded-xl"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Live Website
                </a>
                
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-white transition-all bg-rose-50 hover:bg-rose-600 px-3.5 py-2 rounded-xl border border-rose-100 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            </div>
          </header>

          {/* CRM Dashboard Body */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            
            {/* Header Title section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                  CRM Overview
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Analyze real-time inquiries, track project scope values, and process incoming leads instantly.
                </p>
              </div>
              
              <div className="sm:hidden">
                <a
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors bg-slate-100 px-3.5 py-2.5 rounded-xl w-full justify-center border border-slate-200/50"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Live Website
                </a>
              </div>
            </div>

            {/* Database Status Alert Panel */}
            {dbStatus.configured ? (
              dbStatus.tableMissing ? (
                <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 shadow-xs text-amber-900">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs mt-0.5">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm tracking-tight">Supabase Leads Table Missing</h4>
                        <p className="text-xs text-amber-800 mt-1 leading-relaxed max-w-2xl">
                          Your application is successfully connected to Supabase, but the <code className="px-1.5 py-0.5 bg-amber-100 rounded text-amber-900 font-mono text-[10px]">leads</code> table does not exist yet. Leads will temporarily save to <code className="px-1.5 py-0.5 bg-amber-100 rounded text-amber-900 font-mono text-[10px]">leads_backup.json</code> automatically so no data is lost. Please run the SQL bootstrap script below in your Supabase SQL Editor.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSql(!showSql)}
                      className="shrink-0 text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-100/50 hover:bg-amber-150 px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {showSql ? 'Hide SQL Script' : 'View SQL Setup'}
                      {showSql ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showSql && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-4"
                      >
                        <div className="bg-slate-900 text-slate-100 rounded-xl p-4 relative font-mono text-[11px] leading-relaxed border border-slate-800">
                          <button
                            type="button"
                            onClick={copySqlToClipboard}
                            className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-md flex items-center gap-1 cursor-pointer transition-all border border-slate-700"
                          >
                            <Copy className="w-3 h-3" />
                            {copiedSql ? 'Copied!' : 'Copy SQL'}
                          </button>
                          <pre className="overflow-x-auto max-h-60 pt-6 pr-2">
                            {sqlCode}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="bg-emerald-50/60 border border-emerald-150/70 rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-800">
                        Supabase Database Status
                      </span>
                      <p className="text-[10px] text-emerald-600/90 font-medium">
                        Synced and connected successfully. Form entries are persisted directly to Supabase cloud.
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 uppercase bg-emerald-100/50 px-2 py-1 rounded-md tracking-wider">
                    <Database className="w-3 h-3" />
                    SUPABASE ACTIVE
                  </span>
                </div>
              )
            ) : (
              <div className="bg-blue-50/70 border border-blue-150/80 rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-800">
                      Standard Local JSON Database Active
                    </span>
                    <p className="text-[10px] text-blue-600/90 font-medium">
                      Saving all leads locally to <code className="px-1 py-0.5 bg-blue-100/60 rounded font-mono text-[9px]">leads_backup.json</code> file. To connect to Supabase production cloud database, add environment variables.
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-bold text-blue-700 uppercase bg-blue-100/50 px-2 py-1 rounded-md tracking-wider">
                  LOCAL BACKUP ACTIVE
                </span>
              </div>
            )}

            {/* Stats Dashboard Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              {/* Total Leads */}
              <div className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[110px]">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    TOTAL LEADS
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-800 block mt-1.5">
                    {totalLeads}
                  </span>
                </div>
                <div className="absolute right-4 bottom-4 p-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-400">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              {/* New Leads */}
              <div className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[110px]">
                <div>
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block">
                    NEW LEADS
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-blue-600 block mt-1.5">
                    {newLeads}
                  </span>
                </div>
                <div className="absolute right-4 bottom-4 p-2 bg-blue-50 rounded-xl border border-blue-100 text-blue-500">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              {/* Contacted Leads */}
              <div className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[110px]">
                <div>
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block">
                    CONTACTED
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-600 block mt-1.5">
                    {contactedLeads}
                  </span>
                </div>
                <div className="absolute right-4 bottom-4 p-2 bg-amber-50 rounded-xl border border-amber-100 text-amber-500">
                  <Phone className="w-5 h-5" />
                </div>
              </div>

              {/* Closed Deals */}
              <div className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[110px]">
                <div>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">
                    CLOSED DEALS
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600 block mt-1.5">
                    {closedDeals}
                  </span>
                </div>
                <div className="absolute right-4 bottom-4 p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-500">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Filters & Control Hub */}
            <div className="bg-white border border-slate-200/70 p-4 sm:p-5 rounded-2xl shadow-xs space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Search Bar */}
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search leads by name, email, phone number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-250 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Export Button */}
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-500/10 shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Export to CSV ({filteredLeads.length})
                </button>
              </div>

              {/* Filter Dropdowns Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                
                {/* Status Filter */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold cursor-pointer focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New Lead">New Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed Deal">Closed Deal</option>
                  </select>
                </div>

                {/* Capability Filter */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
                    Service Required
                  </label>
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold cursor-pointer focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  >
                    <option value="All">All Services</option>
                    {uniqueServices.map(svc => (
                      <option key={svc} value={svc}>{svc}</option>
                    ))}
                  </select>
                </div>

                {/* Budget Filter */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
                    Budget
                  </label>
                  <select
                    value={budgetFilter}
                    onChange={(e) => setBudgetFilter(e.target.value)}
                    className="px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold cursor-pointer focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  >
                    <option value="All">All Budgets</option>
                    {uniqueBudgets.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Date Filter */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
                    Date Submitted
                  </label>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold cursor-pointer focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  >
                    <option value="All">All Dates</option>
                    <option value="Today">Today</option>
                    <option value="Yesterday">Yesterday</option>
                    <option value="Week">Last 7 Days</option>
                    <option value="Month">Last 30 Days</option>
                  </select>
                </div>

              </div>

              {/* Filter tags panel */}
              {(statusFilter !== 'All' || serviceFilter !== 'All' || budgetFilter !== 'All' || dateFilter !== 'All' || searchQuery !== '') && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2">
                      Active Filters:
                    </span>
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                        Search: "{searchQuery}"
                        <X className="w-3 h-3 cursor-pointer hover:scale-110" onClick={() => setSearchQuery('')} />
                      </span>
                    )}
                    {statusFilter !== 'All' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                        Status: {statusFilter}
                        <X className="w-3 h-3 cursor-pointer hover:scale-110" onClick={() => setStatusFilter('All')} />
                      </span>
                    )}
                    {serviceFilter !== 'All' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                        Service: {serviceFilter}
                        <X className="w-3 h-3 cursor-pointer hover:scale-110" onClick={() => setServiceFilter('All')} />
                      </span>
                    )}
                    {budgetFilter !== 'All' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                        Budget: {budgetFilter}
                        <X className="w-3 h-3 cursor-pointer hover:scale-110" onClick={() => setBudgetFilter('All')} />
                      </span>
                    )}
                    {dateFilter !== 'All' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                        Date: {dateFilter === 'Week' ? 'Last 7 Days' : dateFilter === 'Month' ? 'Last 30 Days' : dateFilter}
                        <X className="w-3 h-3 cursor-pointer hover:scale-110" onClick={() => setDateFilter('All')} />
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('All');
                      setServiceFilter('All');
                      setBudgetFilter('All');
                      setDateFilter('All');
                    }}
                    className="text-xs text-blue-600 hover:underline font-bold"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>

            {/* Dynamic Leads List */}
            <div className="bg-white border border-slate-200/70 rounded-2xl shadow-xs overflow-hidden">
              
              {isLoadingLeads ? (
                // Loading State
                <div className="p-16 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                  <p className="text-sm text-slate-500 font-semibold">
                    Fetching Nexora leads history...
                  </p>
                </div>
              ) : filteredLeads.length === 0 ? (
                // Empty State
                <div className="p-16 text-center max-w-sm mx-auto flex flex-col items-center justify-center">
                  <div className="h-12 w-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">No Leads Found</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    We couldn't find any leads matching the current search parameters or filters.
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="px-6 py-4.5">Client & Business</th>
                          <th className="px-6 py-4.5">Contact Details</th>
                          <th className="px-6 py-4.5">Service Requested</th>
                          <th className="px-6 py-4.5">Budget Size</th>
                          <th className="px-6 py-4.5">Date Submitted</th>
                          <th className="px-6 py-4.5">Status</th>
                          <th className="px-6 py-4.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                            
                            {/* Client & Business */}
                            <td className="px-6 py-4">
                              <div className="font-bold text-slate-800 text-sm">
                                {lead.full_name}
                              </div>
                              <div className="text-xs text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                                <Building className="w-3.5 h-3.5 text-slate-300" />
                                {lead.business_name}
                              </div>
                            </td>

                            {/* Contact Details */}
                            <td className="px-6 py-4 space-y-1">
                              <a
                                href={`mailto:${lead.email}`}
                                className="flex items-center gap-1.5 hover:text-blue-600 font-semibold transition-colors w-fit"
                              >
                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                {lead.email}
                              </a>
                              <a
                                href={`tel:${lead.phone}`}
                                className="flex items-center gap-1.5 hover:text-blue-600 font-semibold transition-colors w-fit"
                              >
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                {lead.phone}
                              </a>
                            </td>

                            {/* Service */}
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold border border-slate-200/50">
                                <Briefcase className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
                                {lead.service_required}
                              </span>
                            </td>

                            {/* Budget */}
                            <td className="px-6 py-4 font-bold text-emerald-600 text-sm">
                              {lead.project_budget}
                            </td>

                            {/* Date */}
                            <td className="px-6 py-4 text-slate-500">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                {new Date(lead.created_at).toLocaleDateString(undefined, {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </div>
                              <div className="text-[10px] text-slate-400 font-semibold mt-0.5 ml-5">
                                {new Date(lead.created_at).toLocaleTimeString(undefined, {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </td>

                            {/* Status */}
                            <td className="px-6 py-4">
                              {statusUpdatingId === lead.id ? (
                                <div className="h-4 w-4 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                              ) : (
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                  className={`px-2.5 py-1.5 text-xs font-extrabold rounded-lg border cursor-pointer focus:outline-none ${getStatusBadgeClass(lead.status)}`}
                                >
                                  <option value="New Lead">New Lead</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Proposal Sent">Proposal Sent</option>
                                  <option value="Closed Deal">Closed Deal</option>
                                </select>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {lead.status === 'New Lead' && (
                                  <button
                                    onClick={() => handleStatusChange(lead.id, 'Contacted')}
                                    title="Mark as Contacted"
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-700 font-bold rounded-lg transition-all border border-amber-100 cursor-pointer text-xs"
                                  >
                                    <CheckSquare className="w-3.5 h-3.5" />
                                    Mark Contacted
                                  </button>
                                )}
                                <button
                                  onClick={() => setSelectedLead(lead)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 font-bold rounded-lg transition-all border border-blue-100 cursor-pointer text-xs"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  View
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  disabled={isDeletingId === lead.id}
                                  title="Delete Lead"
                                  className="p-1.5 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 rounded-lg transition-all border border-rose-100 cursor-pointer disabled:opacity-50"
                                >
                                  {isDeletingId === lead.id ? (
                                    <div className="h-3.5 w-3.5 border-2 border-rose-350 border-t-rose-600 rounded-full animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile responsive Cards list view */}
                  <div className="block md:hidden divide-y divide-slate-150">
                    {filteredLeads.map((lead) => (
                      <div key={lead.id} className="p-4 space-y-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">
                              {lead.full_name}
                            </h4>
                            <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                              <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              {lead.business_name}
                            </p>
                          </div>
                          <span className={`inline-flex px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded-md border shrink-0 ${getStatusBadgeClass(lead.status)}`}>
                            {lead.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 block uppercase">SERVICE</span>
                            <span className="font-bold text-slate-700 block mt-0.5 truncate">{lead.service_required}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 block uppercase">BUDGET</span>
                            <span className="font-bold text-emerald-600 block mt-0.5">{lead.project_budget}</span>
                          </div>
                          <div className="col-span-2 pt-2 border-t border-slate-200/50">
                            <span className="text-[10px] font-bold text-slate-400 block uppercase">SUBMITTED DATE</span>
                            <span className="font-semibold text-slate-600 block mt-0.5">
                              {new Date(lead.created_at).toLocaleDateString()} at {new Date(lead.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex-1 flex h-10 items-center justify-center gap-1.5 bg-slate-100 text-slate-700 rounded-xl font-bold border border-slate-200/50 text-xs"
                          >
                            <Mail className="w-4 h-4" />
                            Email
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex-1 flex h-10 items-center justify-center gap-1.5 bg-slate-100 text-slate-700 rounded-xl font-bold border border-slate-200/50 text-xs"
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </a>
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="flex-1 flex h-10 items-center justify-center gap-1.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 text-xs"
                          >
                            <FileText className="w-4 h-4" />
                            View
                          </button>
                        </div>

                        {/* Status Quick Action dropdown & Actions for mobile */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100/55 gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            {lead.status === 'New Lead' && (
                              <button
                                onClick={() => handleStatusChange(lead.id, 'Contacted')}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-700 font-extrabold rounded-lg border border-amber-100 cursor-pointer text-[10px] uppercase tracking-wider"
                              >
                                <CheckSquare className="w-3.5 h-3.5" />
                                Contacted
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              disabled={isDeletingId === lead.id}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 font-extrabold rounded-lg border border-rose-100 cursor-pointer text-[10px] uppercase tracking-wider disabled:opacity-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>

                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`px-2 py-1 text-xs font-bold rounded-md border cursor-pointer ${getStatusBadgeClass(lead.status)}`}
                          >
                            <option value="New Lead">New Lead</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Closed Deal">Closed Deal</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </main>

          {/* Lead Detail Modal Overlay */}
          <AnimatePresence>
            {selectedLead && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedLead(null)}
                  className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  className="bg-white border border-slate-200 max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
                >
                  {/* Modal Header */}
                  <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-lg">
                        <User className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-850 text-base">
                          Lead Specifications
                        </h3>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          LEAD ID: #{selectedLead.id}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedLead(null)}
                      className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-xl transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Scrollable Content */}
                  <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
                    
                    {/* Basic Grid info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Name */}
                      <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          Full Name
                        </span>
                        <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedLead.full_name}</span>
                      </div>

                      {/* Business */}
                      <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          Business Name
                        </span>
                        <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedLead.business_name}</span>
                      </div>

                      {/* Email */}
                      <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          Corporate Email
                        </span>
                        <a
                          href={`mailto:${selectedLead.email}`}
                          className="font-bold text-blue-600 hover:underline text-sm mt-0.5 block flex items-center gap-1.5"
                        >
                          <Mail className="w-4 h-4 text-blue-500" />
                          {selectedLead.email}
                        </a>
                      </div>

                      {/* Phone */}
                      <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          Phone Number
                        </span>
                        <a
                          href={`tel:${selectedLead.phone}`}
                          className="font-bold text-blue-600 hover:underline text-sm mt-0.5 block flex items-center gap-1.5"
                        >
                          <Phone className="w-4 h-4 text-blue-500" />
                          {selectedLead.phone}
                        </a>
                      </div>

                      {/* Service */}
                      <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          Service Required
                        </span>
                        <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedLead.service_required}</span>
                      </div>

                      {/* Budget */}
                      <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          Project Budget Size
                        </span>
                        <span className="font-black text-emerald-600 text-sm mt-0.5 block">{selectedLead.project_budget}</span>
                      </div>
                    </div>

                    {/* Project Requirements (Textarea Message) */}
                    <div className="p-4 bg-blue-50/30 border border-blue-100/50 rounded-2xl">
                      <span className="text-[10px] font-bold text-[#2563EB] block uppercase tracking-wider mb-2">
                        Venture Scope & Requirements
                      </span>
                      <p className="text-slate-700 leading-relaxed text-xs sm:text-sm whitespace-pre-line font-medium">
                        {selectedLead.project_requirements}
                      </p>
                    </div>

                    {/* Submission metadata info */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold pl-1">
                      <Calendar className="w-4 h-4" />
                      <span>Submitted on {new Date(selectedLead.created_at).toLocaleString()}</span>
                    </div>

                  </div>

                  {/* Modal Footer Controls */}
                  <div className="px-6 py-4.5 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    
                    {/* Inline Status Changer */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        STATUS:
                      </span>
                      <select
                        value={selectedLead.status}
                        onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                        className={`px-3 py-1.5 text-xs font-black rounded-lg border cursor-pointer focus:outline-none ${getStatusBadgeClass(selectedLead.status)}`}
                      >
                        <option value="New Lead">New Lead</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed Deal">Closed Deal</option>
                      </select>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleDeleteLead(selectedLead.id)}
                        disabled={isDeletingId === selectedLead.id}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 border border-rose-100 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Lead
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedLead(null)}
                        className="flex-1 sm:flex-initial px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                      >
                        Close View
                      </button>
                    </div>
                  </div>

                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Footer copyright */}
          <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-400 font-medium">
            &copy; 2026 Nexora. All rights reserved. Secure Administrative CRM Dashboard.
          </footer>

        </div>
      )}
    </div>
  );
}

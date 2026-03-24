import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  ChevronRight, 
  Plus,
  RefreshCcw,
  Sparkles,
  Zap,
  ArrowUpRight,
  TrendingUp,
  Target,
  Users,
  Building2,
  Calendar,
  Settings,
  MoreVertical,
  ExternalLink,
  Loader2,
  Download
} from 'lucide-react';
import { leadService } from '@/services/leadService';
import { Lead } from '@/data/mockData';
import EmailModal from '@/components/EmailModal';
import { emailService } from '@/services/emailService';

const Outreach: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await leadService.getLeads();
        setLeads(data.filter(l => l.status === 'In Progress' || l.status === 'New'));
      } catch (err) {
        console.error('Failed to fetch leads:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const handleGenerateEmail = async (lead: Lead) => {
    setSelectedLead(lead);
    setIsEmailModalOpen(true);
    setIsGeneratingEmail(true);
    setGeneratedEmail('');
    try {
      const email = await emailService.generateEmail(lead);
      setGeneratedEmail(email);
    } catch (err) {
      console.error('Failed to generate email:', err);
      setGeneratedEmail('Error generating email draft. Please try again.');
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  const stats = [
    { label: 'Emails Sent', value: '145', icon: Send, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%' },
    { label: 'Open Rate', value: '24.5%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+5.4%' },
    { label: 'Reply Rate', value: '8.2%', icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+2.1%' },
    { label: 'Pending Followups', value: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', trend: '-2' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Outreach Operations</h1>
          <p className="text-slate-500 font-medium mt-1">Manage active sequences and personalized engagement.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 h-11 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            Sequence Planner
          </button>
          <button className="flex items-center gap-2 px-8 h-11 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 group">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            New Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Pending Outreach</h3>
            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">{leads.length} Leads</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search sequence..."
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all w-64"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-all">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Queueing Signals...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-6 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center">
              <Zap className="w-10 h-10 text-slate-200" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">No Pending Outreach</h3>
              <p className="text-sm text-slate-400 font-medium">Add some high-potential leads to start your outreach engine.</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {leads.map((lead) => (
              <div key={lead.id} className="p-8 group hover:bg-slate-50/50 transition-all">
                <div className="flex items-start justify-between gap-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-white rounded-[24px] border border-slate-100 flex items-center justify-center text-xl font-black text-blue-600 shadow-sm group-hover:scale-105 transition-transform">
                      {lead.name[0]}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{lead.name}</h4>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">{lead.role}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-white border border-slate-100 px-3 py-1 rounded-lg">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {lead.company}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {lead.score}% Score
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-white border border-slate-100 px-3 py-1 rounded-lg">
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          {lead.industry}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleGenerateEmail(lead)}
                        className="flex items-center gap-2 px-6 h-11 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 group/btn"
                      >
                        <Sparkles className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />
                        Generate AI Draft
                      </button>
                      <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <Clock className="w-3 h-3" />
                      Next Step: Day 1 Outreach
                    </div>
                  </div>
                </div>
                
                {lead.companyDescription && (
                  <div className="mt-6 p-5 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                    <p className="text-xs text-slate-500 font-medium leading-relaxed italic line-clamp-2">
                      "{lead.companyDescription}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <EmailModal 
        lead={selectedLead}
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        generatedEmail={generatedEmail}
        isGenerating={isGeneratingEmail}
        onRegenerate={() => selectedLead && handleGenerateEmail(selectedLead)}
      />
    </div>
  );
};

export default Outreach;
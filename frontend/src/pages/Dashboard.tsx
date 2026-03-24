import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Target, 
  Mail, 
  TrendingUp, 
  Zap, 
  ArrowUpRight, 
  Plus,
  RefreshCcw,
  AlertCircle,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import LeadTable from '@/components/LeadTable';
import EmailModal from '@/components/EmailModal';
import { leadService } from '@/services/leadService';
import { emailService } from '@/services/emailService';
import { Lead } from '@/data/mockData';

const Dashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [growthView, setGrowthView] = useState<'weekly' | 'monthly'>('weekly');

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [leadsData, analyticsData] = await Promise.all([
        leadService.getLeads(),
        leadService.getAnalytics()
      ]);
      setLeads(leadsData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const handleDeleteLead = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadService.deleteLead(id);
        setLeads(prev => prev.filter(l => l.id !== id));
        fetchData(); // Refresh analytics
      } catch (err) {
        console.error('Failed to delete lead:', err);
        alert('Failed to delete lead. Please try again.');
      }
    }
  };

  const handleExport = async () => {
    try {
      await leadService.exportLeads();
    } catch (err) {
      console.error('Failed to export leads:', err);
      alert('Failed to export leads.');
    }
  };

  const handleAddLead = async () => {
    const company = prompt('Enter company name:');
    if (!company) return;
    
    const name = prompt('Enter contact name:');
    if (!name) return;

    try {
      await leadService.addLead({
        name,
        company,
        role: 'Prospect',
        industry: 'Software',
        email: `${name.toLowerCase().replace(' ', '.')}@${company.toLowerCase().replace(' ', '')}.com`,
        status: 'New',
        website: `https://www.${company.toLowerCase().replace(' ', '')}.com`,
        linkedIn: 'https://linkedin.com',
        companySize: '11-50',
      } as Partial<Lead>);
      
      fetchData();
    } catch (err) {
      console.error('Failed to add lead:', err);
      alert('Failed to add lead.');
    }
  };

  const stats = [
    { label: 'Total Leads', value: analytics?.total_leads || '0', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12.5%' },
    { label: 'High Potential', value: analytics?.high_potential || '0', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+8.2%' },
    { label: 'Outreach Sent', value: analytics?.emails_sent || '0', icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+15.1%' },
    { label: 'Avg Lead Score', value: analytics?.avg_score || '0', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50', trend: '+3.4%' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Sales Operations</h1>
          <p className="text-slate-500 font-medium mt-1">Intelligent lead generation and automated outreach.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchData}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 h-11 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm group disabled:opacity-50"
          >
            <RefreshCcw className={`w-4 h-4 text-slate-500 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            Sync
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-5 h-11 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm group"
          >
            <Download className="w-4 h-4 text-slate-500 group-hover:translate-y-0.5 transition-transform" />
            Export CSV
          </button>
          <button 
            onClick={handleAddLead}
            className="flex items-center gap-2 px-6 h-11 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            New Lead
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Lead Acquisition Growth</h3>
              <p className="text-sm text-slate-400 font-medium">Daily performance tracking</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
              <button 
                onClick={() => setGrowthView('weekly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${growthView === 'weekly' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Weekly
              </button>
              <button 
                onClick={() => setGrowthView('monthly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${growthView === 'monthly' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Monthly
              </button>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthView === 'weekly' ? (analytics?.growth_data || []) : (analytics?.growth_data || []).map((d: any) => ({ ...d, leads: d.leads * 4, emails: d.emails * 3.5 }))}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEmails" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}}
                  itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="emails" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorEmails)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-6">Recent Activity</h3>
          <div className="space-y-6 flex-1">
            {leads.slice(0, 5).map((lead, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-lg font-bold text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                    {lead.name[0]}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${lead.score >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{lead.name}</p>
                  <p className="text-xs font-medium text-slate-400 truncate">{lead.company} • {lead.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900">{lead.score}%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Score</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
            View All Activity
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 text-amber-800">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Prospects</h2>
            <div className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">Live</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
              View All
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <LeadTable 
            leads={leads} 
            isLoading={isLoading} 
            onGenerateEmail={handleGenerateEmail}
            onDeleteLead={handleDeleteLead}
            onAddLead={handleAddLead}
          />
        </div>
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

export default Dashboard;
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Target, 
  Users, 
  Building2, 
  Globe, 
  Linkedin, 
  Mail, 
  Sparkles,
  RefreshCcw,
  PlusCircle,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { leadService } from '@/services/leadService';
import { Lead } from '@/data/mockData';

const LeadFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addedLeads, setAddedLeads] = useState<Set<string>>(new Set());

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);
    try {
      const results = await leadService.searchLeads(query);
      setLeads(results);
      if (results.length === 0) {
        setError('No prospects found matching your criteria. Try broadening your search.');
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to search for leads. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddLead = async (lead: Lead) => {
    try {
      await leadService.addLead(lead);
      setAddedLeads(prev => new Set(prev).add(lead.id));
    } catch (err) {
      console.error('Failed to add lead:', err);
      alert('Failed to add lead to your dashboard.');
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100 mb-2">
          <Zap className="w-3 h-3 fill-blue-600" />
          AI Engine Ready
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Find Your Next <span className="text-blue-600">Enterprise</span> Partner
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
          Our AI analyzes millions of data points to find the highest-potential prospects for your business.
        </p>

        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="w-6 h-6 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by industry, role, or company (e.g. 'SaaS CTO in London')"
            className="w-full pl-16 pr-40 py-6 bg-white border-2 border-slate-100 rounded-[32px] text-lg font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-xl shadow-slate-200/50"
          />
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-3 top-3 bottom-3 px-8 bg-blue-600 text-white rounded-[24px] text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 group/btn"
          >
            {isSearching ? (
              <RefreshCcw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
            )}
            {isSearching ? 'Searching...' : 'Scan Market'}
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-400">
          <span className="uppercase tracking-widest">Trending:</span>
          {['FinTech Founders', 'Product Managers', 'AI Startups', 'Cybersecurity VP'].map(tag => (
            <button 
              key={tag}
              onClick={() => {
                setQuery(tag);
                // Trigger search directly after state update using handleSearch with simulated event or separate function
                const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                setTimeout(() => {
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (input) {
                    input.value = tag;
                    const event = new Event('submit', { cancelable: true, bubbles: true });
                    input.form?.dispatchEvent(event);
                  }
                }, 10);
              }}
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-6 bg-amber-50 border border-amber-200 rounded-[32px] flex items-center gap-4 text-amber-800 animate-in shake duration-500 shadow-sm">
          <div className="p-3 bg-white rounded-2xl shadow-sm">
            <AlertCircle className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      {leads.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {leads.map((lead, i) => (
            <div 
              key={lead.id} 
              className="bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-0 right-0 p-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black ${
                  lead.score >= 90 ? 'bg-emerald-50 text-emerald-600' : 
                  lead.score >= 70 ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {lead.score}%
                </div>
              </div>

              <div className="space-y-6">
                <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-2xl font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  {lead.name[0]}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{lead.name}</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{lead.role}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <Building2 className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{lead.company}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{lead.industry} • {lead.companySize} employees</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <Globe className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 truncate">{lead.website.replace('https://www.', '')}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <a href={lead.linkedIn} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={lead.website} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  
                  <button
                    onClick={() => handleAddLead(lead)}
                    disabled={addedLeads.has(lead.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-sm ${
                      addedLeads.has(lead.id)
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100 hover:shadow-lg active:scale-95'
                    }`}
                  >
                    {addedLeads.has(lead.id) ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Added
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-3.5 h-3.5" />
                        Add Lead
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {leads.length === 0 && !isSearching && !error && (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          {[
            { icon: ShieldCheck, title: 'Verified Data', desc: 'All emails and profiles are validated in real-time.' },
            { icon: Zap, title: 'AI Scoring', desc: 'ML models prioritize leads most likely to convert.' },
            { icon: Users, title: 'Global Reach', desc: 'Access over 250M B2B profiles across all industries.' }
          ].map((feature, i) => (
            <div key={i} className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100 space-y-4 hover:bg-white hover:shadow-xl transition-all duration-500">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900">{feature.title}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadFinder;
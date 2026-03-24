import React from 'react';
import { 
  Mail, 
  Trash2, 
  ExternalLink, 
  Linkedin, 
  Globe,
  MoreVertical,
  ChevronRight,
  Info,
  Building2,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  Target
} from 'lucide-react';
import { Lead } from '@/data/mockData';

interface LeadTableProps {
  leads: Lead[];
  isLoading: boolean;
  onGenerateEmail: (lead: Lead) => void;
  onDeleteLead: (id: string) => void;
  onAddLead: () => void;
}

const LeadTable: React.FC<LeadTableProps> = ({ 
  leads, 
  isLoading, 
  onGenerateEmail, 
  onDeleteLead,
  onAddLead 
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Scanning Ecosystem...</p>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center">
          <Building2 className="w-10 h-10 text-slate-300" />
        </div>
        <div className="space-y-2 max-w-xs">
          <h3 className="text-lg font-bold text-slate-900">No Prospects Found</h3>
          <p className="text-sm text-slate-400 font-medium">Start by adding your first lead manually or use the AI Lead Finder.</p>
        </div>
        <button 
          onClick={onAddLead}
          className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
        >
          Add First Lead
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Prospect</th>
            <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Company</th>
            <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Lead Score</th>
            <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Industry & Size</th>
            <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {leads.map((lead) => (
            <tr key={lead.id} className="group hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-lg font-bold text-blue-600 shadow-sm group-hover:scale-105 transition-transform">
                    {lead.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{lead.name}</p>
                    <p className="text-xs font-medium text-slate-400 truncate">{lead.role}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{lead.company}</p>
                  <div className="flex items-center gap-3">
                    <a href={lead.website} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                    <a href={lead.linkedIn} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    {lead.location && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                        <MapPin className="w-3 h-3" />
                        {lead.location}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden min-w-[100px]">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          lead.score >= 90 ? 'bg-emerald-50 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 
                          lead.score >= 70 ? 'bg-blue-500' : 'bg-amber-500'
                        }`} 
                        style={{ width: `${lead.score}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-bold ${
                      lead.score >= 90 ? 'text-emerald-600' : 
                      lead.score >= 70 ? 'text-blue-600' : 'text-amber-600'
                    }`}>
                      {lead.score}
                    </span>
                  </div>
                  {lead.scoreExplanation && (
                    <div className="flex items-center gap-1 group/tooltip relative">
                      <Info className="w-3 h-3 text-slate-300 group-hover/tooltip:text-blue-500 transition-colors" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate max-w-[150px]">
                        {lead.scoreExplanation.split('|')[0]}
                      </span>
                      <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-900 text-white text-[10px] font-medium rounded-xl opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity z-10 shadow-xl">
                        {lead.scoreExplanation}
                      </div>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
                      {lead.industry}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {lead.companySize} employees
                  </p>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  lead.status === 'Converted' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                  lead.status === 'Rejected' ? 'bg-rose-50 border-rose-100 text-rose-600' :
                  lead.status === 'In Progress' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                  'bg-slate-50 border-slate-100 text-slate-500'
                }`}>
                  {lead.status === 'Converted' && <CheckCircle2 className="w-3 h-3" />}
                  {lead.status === 'In Progress' && <Clock className="w-3 h-3" />}
                  {lead.status === 'Rejected' && <AlertCircle className="w-3 h-3" />}
                  {lead.status}
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button 
                    onClick={() => onGenerateEmail(lead)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-all group/btn"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-blue-500 group-hover/btn:scale-110 transition-all" />
                    Draft
                  </button>
                  <div className="relative group/more">
                    <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 group-hover/more:opacity-100 pointer-events-none group-hover/more:pointer-events-auto transition-all z-20 overflow-hidden">
                      <button 
                        onClick={() => window.open(lead.linkedIn, '_blank')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-slate-400" />
                        View Profile
                      </button>
                      <button 
                        onClick={() => alert(`Editing lead: ${lead.name}`)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        <Target className="w-4 h-4 text-slate-400" />
                        Edit Lead
                      </button>
                      <button 
                        onClick={() => onDeleteLead(lead.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Lead
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
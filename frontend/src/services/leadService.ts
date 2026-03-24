import { emitter } from '@/agentSdk';
import { MOCK_LEADS, Lead } from '@/data/mockData';
import api from '@/lib/api';
import { saveAs } from 'file-saver';

const SDR_AGENT_ID = "ca817a50-7f80-4daf-befc-5765b05e1e3b";

// Helper for local storage mock data
const getMockLeads = (): Lead[] => {
  const stored = localStorage.getItem('mock_leads');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('mock_leads', JSON.stringify(MOCK_LEADS));
  return MOCK_LEADS;
};

const setMockLeads = (leads: Lead[]) => {
  localStorage.setItem('mock_leads', JSON.stringify(leads));
};

export const leadService = {
  async searchLeads(query: string): Promise<Lead[]> {
    console.log(`Searching leads with query: ${query}`);
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      console.log('Using mock data for search');
      await new Promise(resolve => setTimeout(resolve, 1500));
      const allLeads = getMockLeads();
      const results = allLeads.filter(lead => 
        lead.company.toLowerCase().includes(query.toLowerCase()) || 
        lead.industry.toLowerCase().includes(query.toLowerCase()) ||
        lead.role.toLowerCase().includes(query.toLowerCase())
      );
      
      console.log(`Mock search found ${results.length} leads`);
      // Emit search completed event
      await emitter.emit({
        agentId: SDR_AGENT_ID,
        event: "lead_search_completed",
        payload: {
          query,
          resultCount: results.length,
          results: results.slice(0, 3)
        },
        uid: crypto.randomUUID()
      });
      
      return results;
    }

    try {
      const response = await api.post('/search-leads', { query });
      console.log('Search API response:', response.data);
      const results = response.data;

      await emitter.emit({
        agentId: SDR_AGENT_ID,
        event: "lead_search_completed",
        payload: {
          query,
          resultCount: results.length,
          results: results.slice(0, 3)
        },
        uid: crypto.randomUUID()
      });

      return results;
    } catch (error) {
      console.error('Search API error:', error);
      throw error;
    }
  },

  async getLeads(): Promise<Lead[]> {
    console.log('Fetching all leads...');
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      console.log('Using mock data for getLeads');
      await new Promise(resolve => setTimeout(resolve, 800));
      return getMockLeads();
    }
    try {
      const response = await api.get('/leads');
      console.log('getLeads API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('getLeads API error:', error);
      throw error;
    }
  },

  async addLead(lead: Partial<Lead>): Promise<Lead> {
    console.log('Adding new lead:', lead);
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      console.log('Using mock mode to add lead');
      const allLeads = getMockLeads();
      const newLead = {
        ...lead,
        id: crypto.randomUUID(),
        score: Math.floor(Math.random() * 50) + 50,
        addedAt: new Date().toISOString().split('T')[0],
        status: lead.status || 'New',
        industry: lead.industry || 'Technology',
        scoreExplanation: 'Manually added lead'
      } as Lead;
      setMockLeads([newLead, ...allLeads]);
      return newLead;
    }
    try {
      const response = await api.post('/add-lead', lead);
      console.log('addLead API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('addLead API error:', error);
      throw error;
    }
  },

  async deleteLead(id: string): Promise<void> {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const allLeads = getMockLeads();
      const filtered = allLeads.filter(l => l.id !== id);
      setMockLeads(filtered);
      return;
    }
    await api.delete(`/lead/${id}`);
  },

  async scoreLead(leadId: string): Promise<number> {
    let score: number;

    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const allLeads = getMockLeads();
      const lead = allLeads.find(l => l.id === leadId);
      if (!lead) throw new Error('Lead not found');
      score = lead.score;
    } else {
      const response = await api.get(`/lead-score/${leadId}`);
      score = response.data.score;
    }

    if (score > 85) {
      await emitter.emit({
        agentId: SDR_AGENT_ID,
        event: "lead_score_threshold_met",
        payload: { leadId, score },
        uid: crypto.randomUUID()
      });
    }

    return score;
  },

  async getAnalytics(): Promise<any> {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const leads = getMockLeads();
      const highPotential = leads.filter(l => l.score >= 80).length;
      
      // Calculate industry distribution
      const industries = leads.reduce((acc: any, l) => {
        acc[l.industry] = (acc[l.industry] || 0) + 1;
        return acc;
      }, {});
      
      const industryData = Object.entries(industries).map(([name, count]) => ({
        name,
        value: Math.round((Number(count) / leads.length) * 100)
      })).sort((a, b) => b.value - a.value);

      return {
        total_leads: leads.length,
        avg_score: leads.length ? Math.round(leads.reduce((acc, l) => acc + l.score, 0) / leads.length) : 0,
        high_potential: highPotential,
        emails_sent: 145,
        industry_distribution: industryData,
        conversion_funnel: [
          { name: 'Prospecting', leads: leads.length * 2, conv: leads.length },
          { name: 'Contacted', leads: Math.round(leads.length * 0.8), conv: Math.round(leads.length * 0.4) },
          { name: 'Replied', leads: Math.round(leads.length * 0.3), conv: Math.round(leads.length * 0.15) },
          { name: 'Booked', leads: Math.round(leads.length * 0.1), conv: Math.round(leads.length * 0.08) },
          { name: 'Closed', leads: Math.round(leads.length * 0.05), conv: Math.round(leads.length * 0.04) },
        ],
        growth_data: [
          { name: 'Mon', leads: 12, emails: 25 },
          { name: 'Tue', leads: 15, emails: 32 },
          { name: 'Wed', leads: 8, emails: 20 },
          { name: 'Thu', leads: 22, emails: 45 },
          { name: 'Fri', leads: 18, emails: 38 },
          { name: 'Sat', leads: 5, emails: 12 },
          { name: 'Sun', leads: 3, emails: 8 }
        ]
      };
    }
    const response = await api.get('/analytics');
    return response.data;
  },

  async exportLeads(): Promise<void> {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const leads = getMockLeads();
      const header = Object.keys(leads[0]).join(',');
      const rows = leads.map(l => Object.values(l).join(','));
      const csv = [header, ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'leads_export.csv');
      return;
    }
    const response = await api.get('/export-leads', { responseType: 'blob' });
    saveAs(response.data, 'leads_export.csv');
  }
};

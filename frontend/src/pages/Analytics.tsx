import React, { useState, useEffect } from 'react';
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
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Mail, 
  Target, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Calendar,
  Zap,
  ShieldCheck,
  ZapOff
} from 'lucide-react';
import { leadService } from '@/services/leadService';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const Analytics: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analytics = await leadService.getAnalytics();
        setData(analytics);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Processing Big Data...</p>
      </div>
    );
  }

  const industryData = data?.industry_distribution || [
    { name: 'SaaS', value: 35 },
    { name: 'FinTech', value: 25 },
    { name: 'HealthTech', value: 20 },
    { name: 'E-commerce', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const conversionData = data?.conversion_funnel || [
    { name: 'Prospecting', leads: 400, conv: 240 },
    { name: 'Contacted', leads: 300, conv: 139 },
    { name: 'Replied', leads: 200, conv: 98 },
    { name: 'Booked', leads: 278, conv: 390 },
    { name: 'Closed', leads: 189, conv: 480 },
  ];

  const stats = [
    { label: 'Total Leads', value: data?.total_leads || '0', trend: '+12.5%', isUp: true },
    { label: 'Avg Lead Score', value: `${data?.avg_score || '0'}%`, trend: '+3.4%', isUp: true },
    { label: 'Reply Rate', value: '18.5%', trend: '-2.1%', isUp: false },
    { label: 'Emails Sent', value: data?.emails_sent || '0', trend: '+15.1%', isUp: true },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Performance Intelligence</h1>
          <p className="text-slate-500 font-medium mt-1">Real-time insights and growth metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 h-11 shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-700">Last 30 Days</span>
          </div>
          <button className="flex items-center gap-2 px-6 h-11 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 group">
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Revenue Opportunity</h3>
              <p className="text-sm text-slate-400 font-medium">Growth vs Outreach Velocity</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.growth_data || []}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
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
                <Area type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="emails" stroke="#a855f7" strokeWidth={4} fillOpacity={0.1} fill="#a855f7" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-8">Industry Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {industryData.map((_entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}}
                   itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {industryData.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                  <span className="text-xs font-bold text-slate-600">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-8">Outreach Efficiency</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}}
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}}
                  itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                />
                <Bar dataKey="leads" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="conv" fill="#10b981" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-8">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">AI Sales Insights</h3>
          <div className="space-y-6">
            <div className="flex gap-5 group cursor-pointer">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl h-fit group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 fill-blue-600" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Optimization Opportunity</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Leads in the <span className="text-blue-600 font-bold">FinTech</span> sector show 25% higher reply rates when contacted between 9-11 AM on Tuesdays.</p>
              </div>
            </div>
            <div className="flex gap-5 group cursor-pointer">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl h-fit group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Lead Health Score</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Your average lead score has increased by <span className="text-emerald-600 font-bold">12%</span> this week due to improved targeting in enterprise segments.</p>
              </div>
            </div>
            <div className="flex gap-5 group cursor-pointer">
              <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl h-fit group-hover:scale-110 transition-transform">
                <ZapOff className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Automation Warning</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">3 outreach sequences were paused due to <span className="text-rose-600 font-bold">outdated data</span>. AI is currently re-enriching 45 prospect profiles.</p>
              </div>
            </div>
          </div>
          <button className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-2xl transition-all uppercase tracking-widest">
            Explore All Insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
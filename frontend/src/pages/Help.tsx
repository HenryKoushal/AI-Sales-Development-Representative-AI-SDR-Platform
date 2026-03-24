import React from 'react';
import { 
  Mail, 
  Linkedin, 
  MessageSquare, 
  LifeBuoy, 
  BookOpen, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink,
  Zap,
  Users
} from 'lucide-react';

const Help: React.FC = () => {
  const supportCategories = [
    {
      title: 'Documentation',
      description: 'Learn how to integrate our API and automate your sales workflow.',
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'API Status',
      description: 'Check real-time performance of our lead enrichment engines.',
      icon: Zap,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      title: 'Security & Compliance',
      description: 'Details on our SOC2 Type II and GDPR data handling practices.',
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ];

  const faqs = [
    { q: 'How does the AI lead scoring work?', a: 'Our ML models analyze 25+ data points including job role, company growth, and recent funding to assign a score from 0-100.' },
    { q: 'Can I export my leads to Salesforce?', a: 'Yes, you can export leads as CSV or use our direct integrations in the Settings > API tab.' },
    { q: 'Is there a limit on daily outreach?', a: 'To ensure high deliverability, we recommend staying within 50-100 personalized emails per day per seat.' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Help & Support Center</h1>
          <p className="text-slate-500 font-medium mt-2 text-lg">Need assistance? Our team is here to help you scale your outbound engine.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 overflow-hidden`}>
                <img src={`https://i.pravatar.cc/100?u=sdr${i}`} alt="Team" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">SDR Support Team Online</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {supportCategories.map((category) => (
          <div key={category.title} className="bg-white border border-slate-200 rounded-[32px] p-8 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group cursor-pointer border-b-4 border-b-transparent hover:border-b-blue-500">
            <div className={`w-14 h-14 ${category.bg} ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
              <category.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{category.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-6">{category.description}</p>
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-4 transition-all">
              Learn More
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-[24px] bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <LifeBuoy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-white">Contact Team</h3>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mt-0.5">Direct Support</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-5 p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group/item">
                  <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Founder & CEO</p>
                    <p className="text-base font-bold text-white truncate">Henry Koushal</p>
                  </div>
                </div>

                <a 
                  href="mailto:henrykoushal@gmail.com"
                  className="flex items-center justify-between p-5 bg-blue-600 rounded-3xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/40 group/btn"
                >
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm font-bold">henrykoushal@gmail.com</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                </a>

                <a 
                  href="https://www.linkedin.com/in/henry-koushal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 bg-[#0077B5] rounded-3xl hover:opacity-90 transition-all shadow-lg shadow-blue-900/20 group/btn"
                >
                  <div className="flex items-center gap-4">
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm font-bold">LinkedIn Profile</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  We typically respond within 2-4 hours during business days.
                </p>
              </div>
            </div>
            
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]" />
          </div>

          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-[40px] p-8 text-white shadow-xl shadow-orange-500/20 group cursor-pointer">
            <div className="flex items-center justify-between mb-8">
              <Zap className="w-10 h-10 fill-white" />
              <div className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest">Priority</div>
            </div>
            <h3 className="text-2xl font-black mb-2">Enterprise Plan</h3>
            <p className="text-white/80 font-medium mb-6">Unlock dedicated success manager and custom AI model training.</p>
            <button className="w-full py-4 bg-white text-orange-600 rounded-2xl text-sm font-black hover:scale-105 transition-all shadow-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
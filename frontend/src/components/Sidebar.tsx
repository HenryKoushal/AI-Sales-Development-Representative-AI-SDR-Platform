import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Mail, 
  BarChart2, 
  Settings, 
  LogOut,
  Target,
  Zap,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  HelpCircle,
  Building2,
  Users
} from 'lucide-react';
import { authService } from '@/services/authService';

const Sidebar: React.FC = () => {
  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Search, label: 'Lead Finder', path: '/lead-finder' },
    { icon: Mail, label: 'Outreach', path: '/outreach' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
  ];

  return (
    <div className="w-80 h-screen bg-slate-900 flex flex-col border-r border-slate-800/50 sticky top-0 overflow-y-auto scrollbar-hide">
      <div className="p-8">
        <NavLink to="/" className="flex items-center gap-4 group cursor-pointer">
          <img 
            src="/logos/full-AI_SDR.png" 
            alt="AI SDR Logo" 
            className="h-10 w-auto group-hover:scale-105 transition-transform duration-500"
          />
        </NavLink>
      </div>

      <div className="flex-1 px-4 py-4 space-y-10">
        <nav className="space-y-2">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Core Platform</p>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all group
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-4">
                    <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    {item.label}
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <nav className="space-y-2">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Account & Config</p>
          {bottomItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all group
                ${isActive 
                  ? 'bg-slate-800 text-white shadow-lg shadow-black/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-4">
                    <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-12' : 'group-hover:rotate-12'}`} />
                    {item.label}
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-4">
          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-6 space-y-4">
            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-white">Free Trial Active</p>
              <p className="text-[10px] text-slate-400 font-medium">12 days remaining on your current subscription plan.</p>
            </div>
            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-xl transition-colors uppercase tracking-widest shadow-lg shadow-blue-900/20">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-800/50">
        <div className="flex items-center gap-4 px-4 py-4 rounded-3xl bg-slate-800/30 border border-slate-800/50 mb-6">
          <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center text-sm font-bold text-slate-300">
            HK
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">Henry Koushal</p>
            <p className="text-[10px] text-slate-500 font-medium truncate">Founder @ AI SDR</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
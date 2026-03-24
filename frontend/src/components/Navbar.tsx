import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, HelpCircle, ChevronDown, User as UserIcon, Settings, Zap } from 'lucide-react';
import { authService } from '@/services/authService';

const Navbar: React.FC = () => {
  const user = authService.getStoredUser();
  const userName = user?.name || user?.email?.split('@')[0] || 'User';
  const initial = userName.charAt(0).toUpperCase();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-10 flex items-center justify-between sticky top-0 z-30 transition-all">
      <div className="flex-1 max-w-2xl group">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-300 group-focus-within:text-blue-500 transition-all" />
          </div>
          <input
            type="text"
            placeholder="Search leads, companies, or industries across the global market..."
            className="w-full h-12 pl-12 pr-6 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all text-sm font-medium placeholder:text-slate-300"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded-lg shadow-sm">
            <span className="text-[10px] font-bold text-slate-400">⌘</span>
            <span className="text-[10px] font-bold text-slate-400">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 ml-10">
        <Link 
          to="/settings"
          className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors group"
        >
          <Zap className="w-4 h-4 fill-blue-600 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider">Upgrade Pro</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link 
            to="/"
            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative group"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white shadow-sm animate-pulse" />
          </Link>
          <Link 
            to="/settings"
            className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>

        <div className="h-10 w-[1px] bg-slate-100" />

        <div className="flex items-center gap-4 pl-2 cursor-pointer group">
          <div className="relative">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform duration-300">
              {initial}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
          </div>
          <div className="hidden xl:flex flex-col">
            <span className="text-sm font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{userName}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-[0.1em] font-black">Account Owner</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-all duration-300" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
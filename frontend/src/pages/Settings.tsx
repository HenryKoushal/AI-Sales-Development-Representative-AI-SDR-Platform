import React, { useState, useEffect } from 'react';
import { 
  User, 
  Key, 
  Bell, 
  Shield, 
  Globe, 
  Zap, 
  Save, 
  ChevronRight,
  LogOut,
  Mail,
  Smartphone,
  CreditCard,
  Cloud,
  Plus,
  Target,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { authService } from '@/services/authService';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    jobRole: 'Sales Development Rep',
    timezone: 'UTC-5 (New York)'
  });

  // Load from auth service and localStorage on mount
  useEffect(() => {
    const user = authService.getStoredUser();
    const savedProfile = localStorage.getItem('user_profile');
    
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Failed to parse saved profile', e);
      }
    } else if (user) {
      setProfile(prev => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email
      }));
    }
  }, []);

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'api-keys', label: 'API & Integrations', icon: Key },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell },
    { id: 'billing', label: 'Billing & Plan', icon: CreditCard },
  ];

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call to save settings
    setTimeout(() => {
      localStorage.setItem('user_profile', JSON.stringify(profile));
      
      // Update global user object to reflect changes in Navbar/Sidebar
      const user = authService.getStoredUser();
      if (user) {
        authService.saveAuthData({
          accessToken: localStorage.getItem('accessToken') || '',
          refreshToken: localStorage.getItem('refreshToken') || '',
          user: {
            ...user,
            name: profile.fullName,
            email: profile.email
          }
        });
      }
      
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Force a slight re-render of components using the user object
        window.location.reload(); 
      }, 1000);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your account, API integrations, and preferences.</p>
        </div>
        <div className="flex items-center gap-3">
          {showSuccess && (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-bold animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="w-4 h-4" />
              Changes saved!
            </div>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-8 h-12 bg-blue-600 rounded-2xl text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 group disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[32px] p-4 shadow-sm space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20'
                  : 'hover:bg-slate-50 text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-4">
                <tab.icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="text-sm font-bold">{tab.label}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activeTab === tab.id ? 'opacity-100' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
            </button>
          ))}
          
          <div className="pt-4 mt-4 border-t border-slate-100">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all group"
            >
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold">Sign Out</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm min-h-[500px]">
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex items-center gap-8 pb-8 border-b border-slate-50">
                  <div className="relative group">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[32px] flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-100 group-hover:scale-105 transition-transform duration-500">
                      {profile.fullName?.trim() ? profile.fullName.trim().split(/\s+/).map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'JD'}
                    </div>
                    <button className="absolute -bottom-2 -right-2 bg-white border border-slate-200 p-2.5 rounded-xl shadow-xl hover:bg-slate-50 hover:scale-110 transition-all text-slate-400 hover:text-blue-600">
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{profile.fullName}</h3>
                    <p className="text-sm text-slate-500 font-medium">{profile.jobRole} • Enterprise Admin</p>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                        <Shield className="w-3 h-3" />
                        Verified
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                        <Zap className="w-3 h-3 fill-blue-600" />
                        Pro Member
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={profile.fullName} 
                      onChange={handleInputChange}
                      className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={profile.email} 
                      onChange={handleInputChange}
                      className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Job Role</label>
                    <input 
                      type="text" 
                      name="jobRole"
                      value={profile.jobRole} 
                      onChange={handleInputChange}
                      className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Timezone</label>
                    <div className="relative">
                      <select 
                        name="timezone"
                        value={profile.timezone}
                        onChange={handleInputChange}
                        className="w-full h-14 pl-5 pr-12 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all appearance-none"
                      >
                        <option>UTC-5 (New York)</option>
                        <option>UTC+0 (London)</option>
                        <option>UTC+1 (Paris)</option>
                        <option>UTC+5:30 (Mumbai)</option>
                        <option>UTC+8 (Singapore)</option>
                      </select>
                      <Globe className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api-keys' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">API Integrations</h3>
                    <p className="text-sm font-medium text-slate-500">Securely connect your sales stack tools.</p>
                  </div>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all border border-blue-100">
                    <Plus className="w-4 h-4" />
                    New API Key
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'OpenAI Intelligence', status: 'connected', icon: Zap, key: 'sk-••••••••••••••••4j9x', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { name: 'Apollo.io B2B Data', status: 'connected', icon: Target, key: 'ap-••••••••••••••••2n5s', color: 'text-amber-600', bg: 'bg-amber-50' },
                    { name: 'Google Workspace', status: 'connected', icon: Mail, key: 'gm-••••••••••••••••7v2w', color: 'text-rose-600', bg: 'bg-rose-50' },
                    { name: 'LinkedIn Sales Navigator', status: 'pending', icon: Shield, key: 'No Secure Connection', color: 'text-slate-400', bg: 'bg-slate-50' },
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[24px] hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all group">
                      <div className="flex items-center gap-5">
                        <div className={`p-3 rounded-xl ${integration.bg} ${integration.color} group-hover:scale-110 transition-transform`}>
                          <integration.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{integration.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{integration.key}</p>
                        </div>
                      </div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border ${
                        integration.status === 'connected' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-slate-400 bg-slate-50 border-slate-100'
                      }`}>
                        {integration.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="pb-6 border-b border-slate-50">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">Notification Systems</h3>
                  <p className="text-sm font-medium text-slate-500">Stay updated on lead activity and campaign performance.</p>
                </div>

                <div className="space-y-6">
                  {[
                    { title: 'Intelligent Lead Alerts', desc: 'Real-time notifications when leads reach target scores.', icon: Target },
                    { title: 'Outreach Summaries', desc: 'Daily digest of email performance and reply tracking.', icon: Mail },
                    { title: 'Security & Access', desc: 'Alerts for account logins and API key usage.', icon: Shield },
                    { title: 'Performance Reports', desc: 'Weekly deep-dive analytics into your sales pipeline.', icon: Cloud },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 rounded-[32px] group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                      <div className="flex items-center gap-5">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 group-hover:scale-110 transition-transform">
                          <item.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-900">{item.title}</p>
                          <p className="text-xs font-medium text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group">
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Current Ecosystem</span>
                      </div>
                      <Zap className="w-8 h-8 text-amber-400 fill-amber-400 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-4xl font-black tracking-tighter">Enterprise Pro</h3>
                      <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-md">Unleash the full power of AI-driven lead generation and automated outreach.</p>
                    </div>
                    <div className="flex items-center gap-6 pt-6">
                      <button className="px-8 py-3.5 bg-white text-slate-900 rounded-2xl text-sm font-black hover:bg-blue-50 hover:scale-105 transition-all shadow-xl shadow-blue-500/10">
                        Upgrade Intelligence
                      </button>
                      <button className="px-8 py-3.5 bg-white/10 text-white rounded-2xl text-sm font-bold hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10">
                        Manage Plan
                      </button>
                    </div>
                  </div>
                  <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/30 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
                  <div className="absolute top-10 right-10 opacity-10">
                    <Zap className="w-40 h-40 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Next Invoice</p>
                      <CreditCard className="w-4 h-4 text-slate-400" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900">$299.00</h4>
                    <p className="text-xs text-slate-400 font-medium">Billed on April 12, 2026</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Usage Limit</p>
                      <Zap className="w-4 h-4 text-slate-400" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900">4,250 / 10,000</h4>
                    <p className="text-xs text-slate-400 font-medium">Leads scanned this month</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
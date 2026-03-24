import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@/services/authService';
import { Mail, Lock, User, Loader2, UserPlus, Zap, ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Correcting the order and number of arguments
      const registerData = await authService.register(email, password, fullName);
      authService.saveAuthData(registerData);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row overflow-hidden font-sans">
      <div className="hidden lg:flex lg:w-1/2 relative p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-800 opacity-90 z-0"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-400/20 rounded-full blur-[120px] z-0"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] z-0"></div>
        
        <div className="relative z-10 flex items-center gap-4">
          <img 
            src="/logos/full-AI_SDR.png" 
            alt="AI SDR Logo" 
            className="h-12 w-auto"
          />
        </div>

        <div className="relative z-10 space-y-8 max-w-xl">
          <h1 className="text-6xl font-black text-white leading-tight tracking-tight">
            The Future of <span className="text-purple-300">Sales</span> is AI.
          </h1>
          <p className="text-xl text-purple-100/80 font-medium leading-relaxed">
            Join thousands of revenue teams using AI SDR to automate their entire outbound process and triple their pipeline.
          </p>
          <div className="space-y-4 pt-6">
            {[
              { icon: ShieldCheck, text: 'Enterprise-grade data security' },
              { icon: Sparkles, text: '99.9% email deliverability rate' },
              { icon: Zap, text: 'Real-time prospect enrichment' }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white/90 font-bold text-sm">
                <feature.icon className="w-5 h-5 text-purple-300" />
                {feature.text}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-purple-100/50 text-sm font-medium">
          © 2026 AI SDR Project. All rights reserved.
        </div>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-8 sm:p-12 lg:p-20 relative overflow-y-auto">
        <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-right-8 duration-700 py-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Create Account</h2>
            <p className="text-slate-500 font-medium">Start your 14-day free trial. No credit card required.</p>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-in shake duration-300">
              <ShieldCheck className="w-5 h-5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-300 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-8 focus:ring-purple-500/5 focus:border-purple-500 focus:bg-white transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-300 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-8 focus:ring-purple-500/5 focus:border-purple-500 focus:bg-white transition-all"
                  placeholder="john@acme.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-slate-300 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="block w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-8 focus:ring-purple-500/5 focus:border-purple-500 focus:bg-white transition-all"
                  placeholder="Acme Inc"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-300 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-8 focus:ring-purple-500/5 focus:border-purple-500 focus:bg-white transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-5 px-8 bg-purple-600 hover:bg-purple-700 text-white rounded-[24px] text-sm font-bold shadow-xl shadow-purple-100 hover:shadow-2xl hover:shadow-purple-200 transition-all active:scale-95 disabled:opacity-50 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <>
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-slate-500 font-medium text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-bold ml-1">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
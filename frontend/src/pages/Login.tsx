import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@/services/authService';
import { Mail, Lock, Loader2, LogIn, Zap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await authService.login(email, password);
      authService.saveAuthData(data);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row overflow-hidden font-sans">
      <div className="hidden lg:flex lg:w-1/2 relative p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-800 opacity-90 z-0"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] z-0"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-400/20 rounded-full blur-[120px] z-0"></div>
        
        <div className="relative z-10 flex items-center gap-4">
          <img 
            src="/logos/full-AI_SDR.png" 
            alt="AI SDR Logo" 
            className="h-12 w-auto"
          />
        </div>

        <div className="relative z-10 space-y-8 max-w-xl">
          <h1 className="text-6xl font-black text-white leading-tight tracking-tight">
            Scale Your <span className="text-blue-300">Outreach</span> with Precision.
          </h1>
          <p className="text-xl text-blue-100/80 font-medium leading-relaxed">
            The world's most advanced AI SDR platform for enterprise lead generation, automated scoring, and personalized engagement.
          </p>
          <div className="flex items-center gap-8 pt-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white/10 bg-slate-800 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Sparkles key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-widest">Trusted by 2,000+ teams</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-blue-100/50 text-sm font-medium">
          © 2026 AI SDR Project. All rights reserved.
        </div>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-8 sm:p-12 lg:p-20 relative">
        <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 font-medium">Please enter your details to access your dashboard.</p>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-in shake duration-300">
              <ShieldCheck className="w-5 h-5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-[24px] text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot Password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-[24px] text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-5 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] text-sm font-bold shadow-xl shadow-blue-100 hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
                <span className="bg-white px-4 text-slate-300">Or skip for demo</span>
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                setEmail('demo@sdr.ai');
                setPassword('password');
                setIsLoading(true);
                try {
                  const data = await authService.login('demo@sdr.ai', 'password');
                  authService.saveAuthData(data);
                  navigate('/');
                } catch (err: any) {
                  setError('Demo login failed. Please try again.');
                } finally {
                  setIsLoading(false);
                }
              }}
              className="w-full py-5 px-8 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-100 rounded-[24px] text-sm font-bold transition-all active:scale-95"
            >
              Sign In with Demo Account
            </button>
          </form>

          <div className="text-center">
            <p className="text-slate-500 font-medium">
              New to AI SDR?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-bold ml-1">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
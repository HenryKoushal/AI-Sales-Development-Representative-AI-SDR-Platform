import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Copy,
  Check,
  RefreshCcw,
  Sparkles,
  Mail,
  User,
  Building2,
  Calendar,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Lead } from '@/data/mockData';
import { emailService } from '@/services/emailService';

interface EmailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  generatedEmail: string;
  isGenerating: boolean;
  onRegenerate: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({
  lead,
  isOpen,
  onClose,
  generatedEmail,
  isGenerating,
  onRegenerate,
}) => {
  const [emailBody, setEmailBody] = useState('');
  const [subject, setSubject] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  useEffect(() => {
    if (generatedEmail) {
      const lines = generatedEmail.split('\n');
      const subjectLine = lines.find(l => l.startsWith('Subject:'));
      if (subjectLine) {
        setSubject(subjectLine.replace('Subject:', '').trim());
        setEmailBody(lines.filter(l => !l.startsWith('Subject:')).join('\n').trim());
      } else {
        setSubject(`Outreach to ${lead?.company || 'Team'}`);
        setEmailBody(generatedEmail);
      }
    }
  }, [generatedEmail, lead]);

  if (!isOpen || !lead) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${emailBody}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSend = async () => {
    if (!lead.email) {
      setSendError('Lead email address is missing');
      return;
    }
    
    setIsSending(true);
    setSendError(null);
    try {
      const success = await emailService.sendEmail(lead.email, subject, emailBody);
      if (success) {
        setSendSuccess(true);
        setTimeout(() => {
          setSendSuccess(false);
          onClose();
        }, 2000);
      } else {
        setSendError('Failed to send email. Please try again.');
      }
    } catch (err) {
      console.error('Failed to send email:', err);
      setSendError('An error occurred while sending the email.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100 group">
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">AI Outreach Generation</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <User className="w-3 h-3" />
                  {lead.name}
                </span>
                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <Building2 className="w-3 h-3" />
                  {lead.company}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-full transition-all border border-transparent hover:border-slate-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Crafting Your Strategy...</h3>
                <p className="text-sm text-slate-400 font-medium">Analyzing company profile and optimizing for conversion.</p>
              </div>
            </div>
          ) : sendSuccess ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Outreach Sent!</h3>
                <p className="text-sm text-slate-500 font-medium font-medium">Your personalized email has been delivered successfully.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Subject Line</label>
                  <input 
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Enter subject..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Email Content</label>
                  <textarea 
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full h-80 px-5 py-5 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-medium text-slate-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    placeholder="Email content will appear here..."
                  />
                </div>
              </div>

              {sendError && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-in shake duration-300">
                  <AlertCircle className="w-5 h-5" />
                  {sendError}
                </div>
              )}

              <div className="bg-blue-50/50 p-6 rounded-[32px] border border-blue-100 flex items-start gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900">AI Optimization Active</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">This draft has been personalized based on {lead.name}'s role and {lead.company}'s industry trends.</p>
                </div>
              </div>
            </>
          )}
        </div>

        {!isGenerating && !sendSuccess && (
          <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={onRegenerate}
                className="flex items-center gap-2 px-5 py-3 h-12 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm group"
              >
                <RefreshCcw className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
                Regenerate
              </button>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-3 h-12 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm group"
              >
                {isCopied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:scale-110 transition-transform" />
                )}
                {isCopied ? 'Copied!' : 'Copy Draft'}
              </button>
            </div>
            <button 
              onClick={handleSend}
              disabled={isSending || !emailBody}
              className="flex items-center gap-2 px-8 h-12 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 group disabled:opacity-50"
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              )}
              {isSending ? 'Sending...' : 'Send Outreach'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailModal;
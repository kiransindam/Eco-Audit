import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import GlassCard from './components/GlassCard';
import ReportView from './components/ReportView';
import { FileWithPreview, AuditReport } from './types';
import { generateEcoAudit } from './services/geminiService';
import { Mic, ArrowRight, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async () => {
    if (files.length === 0 || !description.trim()) {
      setError("Please upload at least one image and provide a business description.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const result = await generateEcoAudit(files, description);
      setReport(result);
    } catch (err: any) {
        console.error(err);
      setError("Failed to generate report. Please try again or check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] pb-20 selection:bg-[#00F5A8] selection:text-black">
      {/* Background gradients for atmosphere */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#00F5A8] rounded-full mix-blend-screen filter blur-[128px] opacity-[0.03] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
        <Header />

        {!report && !loading && (
          <div className="grid md:grid-cols-2 gap-6 items-stretch animate-[fadeIn_0.6s_ease-out]">
            {/* Left Col: Upload */}
            <div className="h-full min-h-[400px]">
              <FileUpload files={files} setFiles={setFiles} />
            </div>

            {/* Right Col: Context & Action */}
            <div className="flex flex-col gap-6">
              <GlassCard className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Business Context</h3>
                  <button className="p-2 rounded-full hover:bg-white/5 text-[#00F5A8] transition-colors" title="Voice Input (Simulated)">
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
                <textarea
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00F5A8]/50 focus:ring-1 focus:ring-[#00F5A8]/50 resize-none flex-grow text-sm leading-relaxed transition-all"
                  placeholder="Tell us about your operations. E.g., 'We are a small coffee roastery. This photo shows our bagging station where we package beans manually...'"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                />
              </GlassCard>

              {/* Action Area */}
              <div className="relative">
                 {error && (
                    <div className="absolute -top-12 left-0 w-full text-center text-red-400 text-sm bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                        {error}
                    </div>
                 )}
                <button
                    onClick={handleAudit}
                    disabled={files.length === 0 || !description}
                    className={`
                    w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl
                    ${files.length > 0 && description 
                        ? 'bg-[#00F5A8] text-black hover:bg-[#33ffbe] hover:shadow-[#00F5A8]/25 hover:scale-[1.02]' 
                        : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'}
                    `}
                >
                    Run EcoAudit Analysis
                    <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center animate-[fadeIn_0.5s_ease-in]">
             <div className="relative mb-8">
                 <div className="absolute inset-0 bg-[#00F5A8] blur-xl opacity-20 animate-pulse"></div>
                 <Loader2 className="w-16 h-16 text-[#00F5A8] animate-spin relative z-10" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Workspace</h2>
             <p className="text-gray-400 text-center max-w-md">
                 Gemini is identifying materials, estimating waste impact, and generating your personalized roadmap...
             </p>
          </div>
        )}

        {report && (
            <div>
                 <button 
                    onClick={() => setReport(null)}
                    className="mb-6 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                 >
                    ← Start New Audit
                 </button>
                <ReportView report={report} />
            </div>
        )}

      </div>
    </div>
  );
};

export default App;
import React from 'react';
import { AuditReport } from '../types';
import GlassCard from './GlassCard';
import { ArrowRight, Download, AlertTriangle, Zap, CheckCircle2, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';

interface ReportViewProps {
  report: AuditReport;
}

const ReportView: React.FC<ReportViewProps> = ({ report }) => {
  const scoreData = [
    { name: 'Score', value: report.ecoScore },
    { name: 'Remaining', value: 100 - report.ecoScore },
  ];

  const COLORS = ['#00F5A8', 'rgba(255,255,255,0.1)'];

  return (
    <div className="space-y-6 animate-[fadeIn_0.8s_ease-out]">
      {/* Header Summary */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Score Card */}
        <GlassCard className="flex-shrink-0 md:w-1/3 flex flex-col items-center justify-center text-center">
            <h3 className="text-gray-400 uppercase tracking-widest text-xs font-semibold mb-4">EcoScore</h3>
            <div className="relative h-40 w-40 flex items-center justify-center">
                <PieChart width={160} height={160}>
                    <Pie
                    data={scoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={75}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={10}
                    >
                    {scoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-4xl font-bold text-white">{report.ecoScore}</span>
                    <span className="text-[10px] text-gray-400 uppercase mt-1">out of 100</span>
                </div>
            </div>
            <div className="mt-2 text-[#00F5A8] font-medium border border-[#00F5A8]/20 bg-[#00F5A8]/10 px-3 py-1 rounded-full text-sm">
                {report.scoreLabel}
            </div>
        </GlassCard>

        {/* Executive Summary */}
        <GlassCard className="flex-grow flex flex-col justify-center">
             <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-[#00F5A8]" />
                <h3 className="text-lg font-semibold text-white">Executive Summary</h3>
             </div>
             <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                 {report.summary}
             </p>
             <div className="mt-6 pt-6 border-t border-white/10">
                 <h4 className="text-xs text-gray-500 uppercase font-semibold mb-2">Environmental Context</h4>
                 <p className="text-[#E6E6FF] text-sm italic border-l-2 border-[#00F5A8] pl-3 py-1 bg-gradient-to-r from-[#00F5A8]/5 to-transparent">
                     "{report.impactContext}"
                 </p>
             </div>
        </GlassCard>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
          {/* Key Observations */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-semibold text-white">Key Observations</h3>
            </div>
            <div className="space-y-4">
                {report.keyObservations.map((obs, idx) => (
                    <div key={idx} className="flex gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                        <div className="mt-1 w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                        <div>
                            <h4 className="text-white font-medium text-sm">{obs.issue}</h4>
                            <p className="text-gray-400 text-xs mt-1">{obs.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
          </GlassCard>

          {/* Actionable Steps */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-[#00F5A8]" />
                <h3 className="text-lg font-semibold text-white">Recommended Actions</h3>
            </div>
            <div className="space-y-4">
                {report.actionableSteps.map((step, idx) => (
                    <div key={idx} className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/5 p-4 hover:border-[#00F5A8]/50 transition-all">
                        <div className="flex justify-between items-start mb-2">
                             <h4 className="text-white font-medium pr-8">{step.title}</h4>
                             <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wide
                                ${step.impactLevel === 'High' ? 'bg-[#00F5A8]/20 text-[#00F5A8]' : 
                                  step.impactLevel === 'Medium' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}
                             `}>
                                 {step.impactLevel} Impact
                             </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{step.description}</p>
                        <div className="flex items-center text-[#00F5A8] text-xs font-semibold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                            View Resource <ArrowRight className="w-3 h-3 ml-1" />
                        </div>
                    </div>
                ))}
            </div>
          </GlassCard>
      </div>

      <div className="flex justify-center pt-8">
            <button className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-[#00F5A8] transition-colors shadow-lg hover:shadow-[#00F5A8]/20">
                <Download className="w-4 h-4" />
                Download PDF Report
            </button>
      </div>
    </div>
  );
};

export default ReportView;
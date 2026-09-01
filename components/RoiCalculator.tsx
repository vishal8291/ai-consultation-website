"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Clock, DollarSign, ArrowRight, ShieldCheck } from "lucide-react";

export default function RoiCalculator() {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hourlyRate, setHourlyRate] = useState<number>(35);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(12);

  // Calculations
  const weeklyHours = teamSize * manualHoursPerWeek;
  const monthlyCost = Math.round(weeklyHours * 4.33 * hourlyRate);
  const annualCost = monthlyCost * 12;

  // Assuming AI automation eliminates 75% of manual labor
  const monthlySavings = Math.round(monthlyCost * 0.75);
  const annualSavings = Math.round(annualCost * 0.75);

  const estimatedBuildCost = 30000; // ₹30,000 Business Tier
  const paybackMonths = (estimatedBuildCost / Math.max(1, monthlySavings * 83)).toFixed(1);

  return (
    <section id="calculator" className="py-28 bg-black text-white relative overflow-hidden bg-grid-pattern border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Calculate Your AI Automation ROI
          </h2>

          <p className="text-lg text-slate-400 leading-relaxed">
            See how much time and money your business can save by automating manual work with AI.
          </p>
        </div>

        {/* Calculator Widget Box */}
        <div className="max-w-5xl mx-auto dark-card-pro rounded-3xl p-8 md:p-12 grid md:grid-cols-12 gap-12 items-center border border-slate-800 shadow-xl">
          {/* Controls Side */}
          <div className="md:col-span-7 space-y-8">
            {/* Slider 1: Team Size */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                  Team Members Doing Manual Tasks
                </label>
                <span className="text-base font-extrabold text-black bg-white px-3.5 py-1 rounded-lg border border-white">
                  {teamSize} People
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1 font-mono">
                <span>1 person</span>
                <span>50 people</span>
              </div>
            </div>

            {/* Slider 2: Manual Hours per Week per Person */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                  Manual Hours Spent / Person / Week
                </label>
                <span className="text-base font-extrabold text-black bg-white px-3.5 py-1 rounded-lg border border-white">
                  {manualHoursPerWeek} hrs/wk
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={manualHoursPerWeek}
                onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1 font-mono">
                <span>2 hrs/wk</span>
                <span>30 hrs/wk</span>
              </div>
            </div>

            {/* Slider 3: Average Hourly Labor Cost */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                  Average Hourly Labor Rate ($/hr)
                </label>
                <span className="text-base font-extrabold text-black bg-white px-3.5 py-1 rounded-lg border border-white">
                  ${hourlyRate}/hr
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="150"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1 font-mono">
                <span>$15/hr</span>
                <span>$150/hr</span>
              </div>
            </div>
          </div>

          {/* Results Side */}
          <div className="md:col-span-5 bg-black text-white p-8 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6 shadow-2xl relative">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1">Projected Monthly Savings</p>
                <motion.p
                  key={monthlySavings}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl md:text-5xl font-black text-white"
                >
                  ${monthlySavings.toLocaleString()}
                  <span className="text-xs text-slate-400 font-bold ml-1">/ mo</span>
                </motion.p>
                <p className="text-xs text-slate-400 mt-1">estimated savings</p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Annual Projected ROI Savings:</span>
                  <span className="font-mono text-white font-bold">${annualSavings.toLocaleString()}/yr</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Hours Saved / Month:</span>
                  <span className="font-mono text-white font-bold">{Math.round(weeklyHours * 4.33 * 0.75)} hours</span>
                </div>
                <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800 font-bold">
                  <span>Investment Payback:</span>
                  <span className="text-white font-bold">Less than 1 Month</span>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="w-full py-4 px-6 rounded-xl btn-white-solid text-black font-extrabold text-center text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

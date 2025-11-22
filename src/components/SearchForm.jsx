import React from 'react';
import { ArrowRight } from './Icons';

const SearchForm = ({ selectedMonth, setSelectedMonth, selectedDay, setSelectedDay, handleSearch, loading, result }) => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div className={`bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-2 mb-8 transition-all duration-500 ${result ? 'opacity-90 scale-95' : 'p-4'}`}>
            <div className="flex items-center gap-3">
                <div className="pl-3 text-gray-400 hidden sm:block">
                    <span className="text-xs uppercase tracking-widest font-bold">Birthday</span>
                </div>

                {/* Month Select */}
                <div className="flex-1 relative">
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full bg-transparent border-none text-white text-lg p-3 pr-8 cursor-pointer font-mono appearance-none focus:bg-white/10 rounded-lg transition-colors"
                    >
                        <option value="" disabled>Month</option>
                        {months.map(m => (
                            <option key={m} value={m}>{m} 月</option>
                        ))}
                    </select>
                </div>

                <span className="text-gray-500">/</span>

                {/* Day Select */}
                <div className="flex-1 relative">
                    <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="w-full bg-transparent border-none text-white text-lg p-3 pr-8 cursor-pointer font-mono appearance-none focus:bg-white/10 rounded-lg transition-colors"
                    >
                        <option value="" disabled>Day</option>
                        {days.map(d => (
                            <option key={d} value={d}>{d} 日</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleSearch}
                    disabled={loading || !selectedMonth || !selectedDay}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-6 py-3 flex items-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/50"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <ArrowRight className="w-5 h-5" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default SearchForm;

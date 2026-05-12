import React from 'react';
import { ArrowRight } from './Icons';
import { getDaysInMonth } from '../utils/date.js';

const SearchForm = ({ selectedMonth, setSelectedMonth, selectedDay, setSelectedDay, handleSearch, loading, result }) => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: getDaysInMonth(selectedMonth) }, (_, i) => i + 1);

    const handleMonthChange = (event) => {
        const month = event.target.value;
        const maxDay = getDaysInMonth(month);

        setSelectedMonth(month);

        if (Number(selectedDay) > maxDay) {
            setSelectedDay("");
        }
    };

    return (
        <div className={`search-card ${result ? 'is-condensed' : ''}`}>
            <div className="search-row">
                <div className="search-label">
                    <span>Birthday</span>
                </div>

                <div className="select-field">
                    <select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    >
                        <option value="" disabled>Month</option>
                        {months.map(m => (
                            <option key={m} value={m}>{m} 月</option>
                        ))}
                    </select>
                </div>

                <span className="date-separator">/</span>

                <div className="select-field">
                    <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
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
                    className="search-button"
                    aria-label="搜尋同生日歌手"
                >
                    {loading ? (
                        <div className="spinner"></div>
                    ) : (
                        <ArrowRight className="button-icon" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default SearchForm;

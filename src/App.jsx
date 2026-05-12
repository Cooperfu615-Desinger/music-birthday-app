import React, { useState, useEffect } from 'react';
import { MusicNote } from './components/Icons';
import Background from './components/Background';
import SearchForm from './components/SearchForm';
import ResultCard from './components/ResultCard';
import { fetchSheetData } from './utils/api';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cachedData, setCachedData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSheetData();
        setCachedData(data);
      } catch (err) {
        console.error("預載失敗:", err);
      }
    };
    loadData();
  }, []);

  const handleSearch = async () => {
    if (!selectedMonth || !selectedDay) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let sourceData = cachedData;

      if (!sourceData || sourceData.length === 0) {
        sourceData = await fetchSheetData();
        setCachedData(sourceData);
      }

      if (!sourceData || sourceData.length === 0) {
        throw new Error("無法連接至資料庫，請稍後再試。");
      }

      // 直接使用選擇的月日進行比對
      const searchMonth = parseInt(selectedMonth);
      const searchDay = parseInt(selectedDay);

      const matches = sourceData.filter(singer => {
        const [, m, d] = singer.birthDate.split('-').map(Number);
        return m === searchMonth && d === searchDay;
      });

      setTimeout(() => {
        if (matches.length > 0) {
          const selectedSinger = matches[Math.floor(Math.random() * matches.length)];
          setResult(selectedSinger);
        } else {
          const randomSinger = sourceData[Math.floor(Math.random() * sourceData.length)];
          setResult({
            ...randomSinger,
            isRecommendation: true,
            recommendationReason: "這一天尚未收錄完全吻合的歌手，先為你推薦另一位靈魂聲音。"
          });
        }
        setLoading(false);
      }, 600);

    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSelectedMonth("");
    setSelectedDay("");
  };

  return (
    <div className="app-shell">
      <Background />

      <div className="app-container">
        {!result && (
          <div className="hero animate-slide-up">
            <div className="hero-icon-shell">
              <MusicNote className="hero-icon" />
            </div>
            <h1 className="hero-title">
              Melodic <span>Soulmate</span>
            </h1>
            <p className="hero-subtitle">
              尋找與你同天誕生的靈魂聲音
            </p>
          </div>
        )}

        {!result && (
          <SearchForm
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            handleSearch={handleSearch}
            loading={loading}
            result={result}
          />
        )}

        {error && (
          <div className="error-message animate-slide-up">
            {error}
          </div>
        )}

        <ResultCard result={result} onBack={handleReset} />

        <div className="footer-credit">
          <p>CREATED BY VIBE QUIRK LABS</p>
        </div>
      </div>
    </div>
  );
};

export default App;

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
        console.log("資料庫預載完成", data.length, "筆");
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
        const [y, m, d] = singer.birthDate.split('-').map(Number);
        return m === searchMonth && d === searchDay;
      });

      setTimeout(() => {
        if (matches.length > 0) {
          // 隨機選一個
          const selectedSinger = matches[Math.floor(Math.random() * matches.length)];
          setResult(selectedSinger);
        } else {
          setError("這一天似乎還沒有收錄到知名歌手的資料。");
          // 隨機推薦
          const randomSinger = sourceData[Math.floor(Math.random() * sourceData.length)];
          setResult({
            ...randomSinger,
            isRecommendation: true
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <Background />

      <div className="w-full max-w-xl relative z-10">
        {!result && (
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <MusicNote className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif tracking-tight text-white">
              Melodic <span className="text-indigo-400">Soulmate</span>
            </h1>
            <p className="text-gray-400 text-lg tracking-wide font-light">
              尋找與你同天誕生的靈魂聲音
            </p>
          </div>
        )}

        <SearchForm
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          handleSearch={handleSearch}
          loading={loading}
          result={result}
        />

        {error && (
          <div className="animate-slide-up bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl mb-6 text-center backdrop-blur-sm">
            {error}
          </div>
        )}

        <ResultCard result={result} />

        <div className="mt-12 text-center">
          <p className="text-white/20 text-xs tracking-widest">DESIGNED FOR MUSIC LOVERS</p>
        </div>
      </div>
    </div>
  );
};

export default App;

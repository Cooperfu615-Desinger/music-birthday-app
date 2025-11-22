import React from 'react';
import { Sparkles, ArrowRight, Search } from './Icons';

const ResultCard = ({ result }) => {
    if (!result) return null;

    const getSpotifyLink = (singer) => singer.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent(singer.name)}`;
    const getAppleLink = (singer) => singer.appleUrl || `https://music.apple.com/tw/search?term=${encodeURIComponent(singer.name)}`;

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 md:p-12 text-center relative overflow-hidden animate-slide-up">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-50px] left-[-50px] text-[200px] font-bold opacity-[0.03] font-serif select-none text-white rotate-[-10deg]">
                    MUSIC
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6">
                    {result.isExactYear ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 text-xs font-bold tracking-wider border border-yellow-400/30">
                            <Sparkles className="w-3 h-3 mr-1" /> PERFECT MATCH
                        </span>
                    ) : result.isRecommendation ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-400/20 text-blue-300 text-xs font-bold tracking-wider border border-blue-400/30">
                            RECOMMENDATION
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-400/20 text-indigo-300 text-xs font-bold tracking-wider border border-indigo-400/30">
                            YOUR ARTIST
                        </span>
                    )}
                </div>

                <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight leading-tight font-serif text-gradient drop-shadow-lg">
                    {result.name}
                </h2>

                <div className="text-xl md:text-2xl text-gray-300 font-light tracking-[0.2em] mb-8 font-mono opacity-80">
                    {result.displayDate}
                </div>

                <div className="w-12 h-1 bg-indigo-500 rounded-full mb-8 opacity-50"></div>

                <p className="text-gray-300 leading-relaxed max-w-md mx-auto mb-10 text-sm md:text-base font-light">
                    {result.bio}
                </p>

                <div className="w-full grid grid-cols-1 gap-3 max-w-xs mx-auto">
                    <a
                        href={getSpotifyLink(result)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between w-full bg-[#1DB954]/90 hover:bg-[#1DB954] text-white p-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-green-900/20"
                    >
                        <span className="font-bold tracking-wide">Spotify</span>
                        <ArrowRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                        href={getAppleLink(result)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between w-full bg-[#FA243C]/90 hover:bg-[#FA243C] text-white p-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-red-900/20"
                    >
                        <span className="font-bold tracking-wide">Apple Music</span>
                        <ArrowRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(result.name + " 歌手")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center w-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white py-3 rounded-xl transition-all border border-white/10 text-sm mt-2"
                    >
                        <Search className="w-4 h-4 mr-2" />
                        Google 搜尋
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;

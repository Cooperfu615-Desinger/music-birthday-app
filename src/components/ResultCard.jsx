import React from 'react';
import { Sparkles, ArrowRight, Search, ArrowLeft } from './Icons';

const ResultCard = ({ result, onBack }) => {
    if (!result) return null;

    const getSpotifyLink = (singer) => singer.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent(singer.name)}`;
    const getAppleLink = (singer) => singer.appleUrl || `https://music.apple.com/tw/search?term=${encodeURIComponent(singer.name)}`;

    return (
        <div className="result-card animate-slide-up">
            <button
                onClick={onBack}
                className="back-button"
                aria-label="Go back"
            >
                <ArrowLeft className="icon-lg" />
            </button>

            <div className="result-watermark-wrap" aria-hidden="true">
                <div className="result-watermark">
                    MUSIC
                </div>
            </div>

            <div className="result-content">
                <div className="result-badge-wrap">
                    {result.isExactYear ? (
                        <span className="result-badge badge-perfect">
                            <Sparkles className="icon-xs" /> PERFECT MATCH
                        </span>
                    ) : result.isRecommendation ? (
                        <span className="result-badge badge-recommendation">
                            推薦歌手
                        </span>
                    ) : (
                        <span className="result-badge badge-artist">
                            YOUR ARTIST
                        </span>
                    )}
                </div>

                <h2 className="result-name text-gradient">
                    {result.name}
                </h2>

                <div className="result-date">
                    {result.displayDate}
                </div>

                <div className="result-divider"></div>

                {result.recommendationReason && (
                    <p className="recommendation-note">
                        {result.recommendationReason}
                    </p>
                )}

                <p className="result-bio">
                    {result.bio}
                </p>

                <div className="result-actions">
                    <a
                        href={getSpotifyLink(result)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="music-link spotify-link"
                    >
                        <span>Spotify</span>
                        <ArrowRight className="link-icon" />
                    </a>

                    <a
                        href={getAppleLink(result)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="music-link apple-link"
                    >
                        <span>Apple Music</span>
                        <ArrowRight className="link-icon" />
                    </a>

                    <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(result.name + " 歌手")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="google-link"
                    >
                        <Search className="icon-sm" />
                        Google 搜尋
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;

import React from 'react';

const Background = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen -z-10 bg-[radial-gradient(circle_at_50%_50%,#1e1b4b_0%,#000000_100%)] overflow-hidden">
            <div className="absolute rounded-full blur-[80px] opacity-40 animate-[float_20s_infinite_ease-in-out] w-[400px] h-[400px] bg-[#4f46e5] -top-[10%] -left-[10%] delay-0"></div>
            <div className="absolute rounded-full blur-[80px] opacity-40 animate-[float_20s_infinite_ease-in-out] w-[500px] h-[500px] bg-[#db2777] -bottom-[10%] -right-[10%] delay-[-5s]"></div>
            <div className="absolute rounded-full blur-[80px] opacity-40 animate-[float_20s_infinite_ease-in-out] w-[300px] h-[300px] bg-[#0891b2] top-[40%] left-[60%] delay-[-10s]"></div>
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(30px, 50px); }
                }
            `}</style>
        </div>
    );
};

export default Background;

// score.js
'use client';

import { useSearchParams } from 'next/navigation';

export default function ScorePage() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');

  const handlePlayAgain = () => {
    window.location.href = '/?startGame=true';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-yellow-500">
      <h1 className="text-4xl font-bold mb-8 text-white">Game Over!</h1>
      <p className="text-2xl mb-8 text-white">Your Score: {score}</p>
      <button
        className="bg-white text-orange-500 px-4 py-2 rounded-md text-xl hover:bg-orange-100 transition duration-200"
        onClick={handlePlayAgain}
      >
        Play Again
      </button>
    </div>
  );
}
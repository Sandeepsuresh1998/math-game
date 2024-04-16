// score.js
'use client';

import { useSearchParams } from 'next/navigation';

export default function ScorePage() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');

   // Placeholder for the leaderboard data
   const leaderboardData = [
    { name: 'Player 1', score: 100 },
    { name: 'Player 2', score: 90 },
    { name: 'Player 3', score: 80 },
    { name: 'Player 4', score: 70 },
    { name: 'Player 5', score: 60 },
  ];

  // Placeholder for the API call to fetch leaderboard data
  const fetchLeaderboardData = async () => {
    try {
      // Make an API call to fetch the leaderboard data
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      // Update the leaderboardData state with the fetched data
      // setLeaderboardData(data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  const handlePlayAgain = () => {
    window.location.href = '/?startGame=true';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-yellow-500">
      <h1 className="text-4xl font-bold mb-8 text-white">Game Over!</h1>
      <p className="text-2xl mb-8 text-white">Your Score: {score}</p>
      <div className="bg-white bg-opacity-75 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-orange-500 text-white">Name</th>
              <th className="py-2 px-4 bg-orange-500 text-white">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-orange-100' : ''}>
                <td className="py-2 px-4">{entry.name}</td>
                <td className="py-2 px-4">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="bg-white text-orange-500 px-4 py-2 rounded-md text-xl hover:bg-orange-100 transition duration-200"
        onClick={() => window.location.href = '/'}
      >
        Play Again
      </button>
    </div>
  );
}
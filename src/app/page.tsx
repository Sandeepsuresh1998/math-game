// MultiplicationGame.js
"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MultiplicationGame() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [answerClass, setAnswerClass] = useState('');
  const [score, setScore] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const startGameParam = searchParams.get('startGame');

  useEffect(() => {
    if (startGameParam === 'true') {
      startGame();
    }
  }, [startGameParam]);

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      router.push(`/score?score=${score}`);
    }
  }, [gameStarted, timeLeft, score, router]);


  const generateQuestion = () => {
    const newNum1 = Math.floor(Math.random() * 12) + 1;
    const newNum2 = Math.floor(Math.random() * 12) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setAnswer('');
    setFeedback('');
    setAnswerClass('');
  };

  const handleAnswerChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAnswer(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(answer) === num1 * num2) {
      setAnswerClass('animate-pulse border-green-500');
      setScore(score + 1);
      setTimeout(() => {
        generateQuestion();
      }, 200);
    } else {
      setAnswerClass('animate-shake border-red-500');
      setTimeout(() => {
        setAnswer('');
        setAnswerClass('');
      }, 200);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(30);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-yellow-500">
      <h1 className="text-4xl font-bold mb-8 text-white">Multiplication Game</h1>
      {!gameStarted ? (
        <button
          className="bg-white text-orange-500 px-4 py-2 rounded-md text-xl hover:bg-orange-100 transition duration-200"
          onClick={startGame}
        >
          Start Game
        </button>
      ) : (
        <>
          <div className="text-2xl mb-4 text-white">
            {num1} × {num2} = ?
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              value={answer}
              onChange={handleAnswerChange}
              className={`bg-white bg-opacity-25 text-white px-4 py-2 rounded-md text-xl text-center focus:outline-none focus:ring-2 focus:ring-white border-2 ${answerClass}`}
            />
            <button
              type="submit"
              className="bg-white text-orange-500 px-4 py-2 mt-4 rounded-md text-xl hover:bg-orange-100 transition duration-200"
            >
              Submit
            </button>
          </form>
          <div className="mt-8 text-xl text-white">Time Left: {timeLeft} seconds</div>
        </>
      )}
    </div>
  );
}
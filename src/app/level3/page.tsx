'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const objects = ['❤️', '😊', '🌟', '🎁', '🍰']

export default function Level3() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [currentObject, setCurrentObject] = useState(objects[0])

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameOver(true)
    }
  }, [timeLeft, gameOver])

  useEffect(() => {
    moveObject()
  }, [score])

  const moveObject = () => {
    setPosition({
      x: Math.random() * (window.innerWidth - 50),
      y: Math.random() * (window.innerHeight - 50),
    })
    setCurrentObject(objects[Math.floor(Math.random() * objects.length)])
  }

  const handleClick = () => {
    if (!gameOver) {
      setScore(score + 1)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 overflow-hidden">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Level 3: Click the Object</h1>
        {!gameOver ? (
          <>
            <div className="text-center mb-4">
              <p className="text-2xl text-white">Score: {score}</p>
              <p className="text-2xl text-white">Time Left: {timeLeft}s</p>
            </div>
            <div
              className="text-6xl cursor-pointer absolute transition-all duration-300"
              style={{ left: position.x, top: position.y }}
              onClick={handleClick}
            >
              {currentObject}
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-2xl text-white mb-4">Game Over!</p>
            <p className="text-xl text-white mb-8">Your final score: {score}</p>
            <p className="text-lg text-white italic mb-8">Here's your reward: A virtual coupon for an offline date (joh aapko acchi lage) !</p>
            <Link href="/final" className="bg-white text-orange-600 font-bold py-2 px-4 rounded-full hover:bg-orange-100 transition duration-300">
              Claim Your Reward
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
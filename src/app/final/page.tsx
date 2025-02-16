'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Final() {
  const [claimed, setClaimed] = useState(false)

  const handleClaim = () => {
    setClaimed(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Congratulations!</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-purple-600 mb-4">You&#39;ve unlocked a special gift:</h2>
          <p className="text-2xl text-purple-500 mb-4">A real-life hangout! 🎉</p>
          <p className="text-xl text-purple-400 mb-8">Valid for: One unforgettable day with me 😉</p>
          {!claimed ? (
            <button
              onClick={handleClaim}
              className="bg-purple-500 text-white font-bold py-2 px-4 rounded-full hover:bg-purple-600 transition duration-300"
            >
              Click to claim your date!
            </button>
          ) : (
            <div>
              <p className="text-2xl text-green-500 mb-4">Date Claimed!</p>
              <p className="text-lg text-purple-400">
                Get ready for an amazing time together. I can&#39;t wait to see you!
              </p>
            </div>
          )}
        </div>
        <div className="mt-8 text-center">
          <Link href="/" className="text-white hover:underline">
            Start Over
          </Link>
        </div>
      </div>
    </main>
  )
}
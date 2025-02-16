'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Card = {
  id: number
  content: string
  isFlipped: boolean
}

const memoryCards: Card[] = [
  { id: 1, content: '🎭', isFlipped: false }, { id: 2, content: '🎭', isFlipped: false },
  { id: 3, content: '🍕', isFlipped: false }, { id: 4, content: '🍕', isFlipped: false },
  { id: 5, content: '🎉', isFlipped: false }, { id: 6, content: '🎉', isFlipped: false },
  { id: 7, content: '🎸', isFlipped: false }, { id: 8, content: '🎸', isFlipped: false },
  { id: 9, content: '🎁', isFlipped: false }, { id: 10, content: '🎁', isFlipped: false },
  { id: 11, content: '🎈', isFlipped: false }, { id: 12, content: '🎈', isFlipped: false }
]

export default function Level2() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [attempts, setAttempts] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [artStyle, setArtStyle] = useState<'caricature' | 'avatar' | 'vector' | null>(null)

  useEffect(() => {
    resetGame()
  }, [])

  const resetGame = () => {
    const shuffledCards = [...memoryCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index, isFlipped: false }))
    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedCards([])
    setAttempts(0)
    setCompleted(false)
    setArtStyle(null)
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      setAttempts((prev) => prev + 1)
      const [first, second] = flippedCards

      if (cards[first].content === cards[second].content) {
        setMatchedCards((prev) => [...prev, first, second])
      }

      setTimeout(() => {
        setCards((prev) => prev.map((card, index) =>
          flippedCards.includes(index) && !matchedCards.includes(index)
            ? { ...card, isFlipped: false }
            : card
        ))
        setFlippedCards([])
      }, 1000)
    }
  }, [flippedCards, cards])

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setCompleted(true)
    }
  }, [matchedCards, cards])

  const handleCardClick = (index: number) => {
    if (
      !flippedCards.includes(index) &&
      flippedCards.length < 2 &&
      !matchedCards.includes(index)
    ) {
      setFlippedCards((prev) => [...prev, index])
      setCards((prev) => prev.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      ))
    }
  }

  const renderArtImage = () => {
    switch (artStyle) {
      case 'caricature':
        return <img src="/images/cartoonphoto.webp" alt="Caricature Art" className="w-64 h-64 rounded-xl mx-auto" />
      case 'avatar':
        return <img src="/images/cutephoto.webp" alt="Avatar Art" className="w-64 h-64 rounded-xl mx-auto" />
      case 'vector':
        return <img src="/images/vectorphoto.webp" alt="Vector Art" className="w-64 h-64 rounded-xl mx-auto" />
      default:
        return null
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500">
      <div className="z-10 w-full max-w-3xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg">
          🧠 Level 2: Memory Match 🧠
        </h1>

        {showInstructions && (
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-8 border-2 border-white/30">
            <h2 className="text-2xl text-white font-bold mb-4">How to Play</h2>
            <ul className="text-white space-y-2 list-disc pl-6">
              <li>Find all matching pairs of emojis</li>
              <li>Click on two cards to reveal them</li>
              <li>Matching pair stays flipped</li>
              <li>Complete all pairs in fewest attempts</li>
              <li>Total Attempts so far: {attempts}</li>
            </ul>
            <button
              onClick={() => setShowInstructions(false)}
              className="mt-4 bg-white text-teal-600 px-6 py-2 rounded-full hover:bg-teal-50 transition-colors"
            >
              Start Game 🎮
            </button>
          </div>
        )}

        {!showInstructions && !completed && (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-white mb-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                Attempts: <span className="font-bold">{attempts}</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                Matches: <span className="font-bold">{matchedCards.length / 2}</span> / {cards.length / 2}
              </div>
              <button
                onClick={resetGame}
                className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                Restart Game 🔄
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {cards.map((card, index) => {
                const isFlipped = card.isFlipped || matchedCards.includes(index)

                return (
                  <div
                    key={card.id}
                    className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-3xl
                      cursor-pointer transition-transform duration-500 transform
                      ${isFlipped ? 'rotate-y-180' : ''}`}
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="absolute w-full h-full flex items-center justify-center bg-white rounded-lg shadow-lg">
                      {isFlipped ? card.content : '?'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {completed && (
          <div className="text-center animate-fade-in">
            <div className="bg-gradient-to-br from-purple-400 to-blue-600 p-8 rounded-3xl shadow-2xl border-4 border-white/30 mb-4">
              <h2 className="text-3xl text-white font-bold mb-6 drop-shadow-md">
                🎉 Congratulations! 🎉
              </h2>
              <p className="text-xl text-white mb-4">"Mujhe drawing toh nahi aati teri tarah, isliye AI ki sahi yelo apke 3 alag alag ruup!" 🎨🤖</p>
              <div className="flex justify-center space-x-4 mb-6">
                <button onClick={() => setArtStyle('caricature')} className="bg-white/90 text-purple-600 px-4 py-2 rounded-full hover:bg-white">Caricature</button>
                <button onClick={() => setArtStyle('avatar')} className="bg-white/90 text-purple-600 px-4 py-2 rounded-full hover:bg-white">Avatar</button>
                <button onClick={() => setArtStyle('vector')} className="bg-white/90 text-purple-600 px-4 py-2 rounded-full hover:bg-white">Vector</button>
              </div>
              {renderArtImage()}

              <div className="mt-6 bg-white/30 p-6 rounded-xl text-white text-left border-2 border-white/40">
                <h3 className="text-2xl font-bold mb-4">✨ 5 Reasons Why You're Awesome ✨</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Tera hasi aur positive vibe mujhe khush kar deti hai 😄</li>
                  <li>sense of humour naam ki chiz pata hai tujhe ummm hmmm 😏😏</li>
                  <li>khudko kitna bhi pathaar dil boldo par ekdam nazuk ka dil hai ❤️</li>
                  <li>bohot jaldi independent se dependent ban jati hai hehe 😂😂</li>
                  <li>Tu ek perfect dost hai insaan ke liye 👑</li>
                </ol>
              </div>

              <div className="mt-6">
                <button
                  onClick={resetGame}
                  className="bg-white/90 text-purple-600 px-6 py-2 rounded-full hover:bg-white mr-4"
                >
                  Play Again 🔄
                </button>
                <Link
                  href="/level3"
                  className="bg-white/90 text-purple-600 px-6 py-2 rounded-full hover:bg-white"
                >
                  Next Level ➡️
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </main>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'

type Question = {
  question: string
  answer: string
  options: string[]
}

const questions: Question[] = [
  { 
    question: "maine tujhe pehela message kab kiya tha aur kaha?", 
    answer: "28th Dec snapchat",
    options: ["29th Dec snapchat", "29th Dec whatsapp", "28th Dec snapchat", "28th Dec whataspp"]
  },
  { 
    question: "What's the name that suits you the best?", 
    answer: "sheeenu",
    options: ["kaleshi aurat", "sheeenu", "Chirkut", "Apuuuuuuuu"]
  },
  { 
    question: "Hamne konsi movie sath mai dekhi thi ?", 
    answer: "The Conjuring 2013",
    options: ["The Conjuring 2014", "Conjuring 2013", "Conguring The Evil Returns 2013", "The Conjuring 2013"]
  },
]

export default function Level1() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [completed, setCompleted] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleAnswer = (option: string) => {
    setSelectedOption(option)
    const correct = option === questions[currentQuestion].answer
    setIsCorrect(correct)

    if (correct) {
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1)
        } else {
          setCompleted(true)
        }
        setIsCorrect(null)
        setSelectedOption(null)
      }, 1500)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg">
          🌟 Level 1: Friendship Quiz 🌟
        </h1>
        
        {!completed ? (
          <div className="space-y-8">
            <p className="text-2xl text-center text-white mb-8 font-semibold bg-white/20 p-4 rounded-xl border-2 border-dashed border-white/40">
              {questions[currentQuestion].question}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedOption !== null}
                  className={`p-4 rounded-xl text-lg font-semibold transition-all
                    ${selectedOption === option ?
                      (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') :
                      'bg-white/90 hover:bg-white hover:scale-105 text-purple-600'}
                    ${!selectedOption ? 'cursor-pointer' : 'cursor-default'}
                    shadow-lg hover:shadow-xl`}
                >
                  <span className="mr-2">{
                    !selectedOption ? '🔘' : 
                    (isCorrect && selectedOption === option) ? '✅' :
                    (!isCorrect && selectedOption === option) ? '❌' : '🔘'
                  }</span>
                  {option}
                </button>
              ))}
            </div>

            {selectedOption && (
              <p className={`text-center text-2xl font-bold animate-pulse 
                ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                {isCorrect ? '🎉 Correct! 🎉' : '😅 Try Again!'}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <div className="bg-gradient-to-br from-pink-400 to-purple-600 p-8 rounded-3xl shadow-2xl border-4 border-white/30 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <p className="text-3xl text-white mb-4 font-bold drop-shadow-md">
                🎊 Congratulations! 🎊
              </p>
              <p className="text-xl text-white mb-8 font-semibold">
                Aapke liye ek khubsurat sa message bilkul aap ki tarah: 😏✨
              </p>
              <div className="bg-white/20 p-8 rounded-xl backdrop-blur-sm border-2 border-white/30">
                <p className="text-lg text-white mb-4">
                &#34;You&#39;re an amazing friend, and I&#39;m so glad maine tujhe uss din message kiya. 
                </p>
                <div className="space-y-4">
                  <p className="text-yellow-200 italic">
                    Shayri:<br />
                    <span className="text-xl">✨</span>
                    <span className="block mt-2">
                      Jab aap haste ho, toh lagta hai duniya mein sukoon hai...<br />
                      Aur jab aap chup ho jaate ho, lagta hai kisi ne Wi-Fi disconnect kar diya hai! 🤣😂
                    </span>
                  </p>
                  <div className="animate-bounce">📱💬</div>
                  <p className="text-white">
                    Waah waah waah waah...<br />
                    Kabhi kuch khane ke liye nahi mila toh bata dena<br />
                    Mai order kar duga: 🍿🍕<br />
                    <span className="text-purple-200">Bas mera dimag maat khana 😒😏</span>
                  </p>
                </div>
              </div>
              <div className="mt-8 animate-pulse">
                ❤️🧡💛💚💙💜
              </div>
            </div>
            <Link 
              href="/level2"
              className="mt-8 bg-white text-purple-600 font-bold py-3 px-8 rounded-full 
                hover:bg-purple-100 transition duration-300 inline-block
                shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🎮 Next Level ➡️
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
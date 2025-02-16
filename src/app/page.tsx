
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Welcome to Our Chutiya Game!</h1>
        <h4 className="text-2xl font-bold text-center text-white mb-8">Gift paane ke liye thodi mehenat toh karni padegi beta</h4>
        <div className="flex justify-center mb-8">
          <Image src="/images/cat_maari_jayengi.png" alt="Fun photo" width={300} height={200} className="rounded-lg shadow-lg" />
        </div>
        <p className="text-xl text-center text-white mb-8">
          {/* Get ready for a journey through our memories and inside jokes! */}
          toh chaliye shuru karte hai 
        </p>
        <div className="flex justify-center">
          <Link href="/level1" className="bg-white text-purple-600 font-bold py-2 px-4 rounded-full hover:bg-purple-100 transition duration-300">
            Start the Chutiyapa
          </Link>
        </div>
      </div>
    </main>
  )
}
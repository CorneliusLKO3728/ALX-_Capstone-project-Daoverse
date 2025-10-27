
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Library() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 bg-white/90 hover:bg-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-bold text-white mb-8 text-center">
           Scripture Repository
        </h1>

        <div className="bg-white/10 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">📖</div>
          <p className="text-xl text-white mb-4">Your library is empty</p>
          <p className="text-gray-400 mb-6">Start adding novels to your collection</p>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Browse Novels
          </button>
        </div>
      </div>
    </div>
  )
}

export default Library
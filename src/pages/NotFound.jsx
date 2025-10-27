
import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl mb-4">⚔️</div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-3xl font-bold text-purple-400 mb-6">
          Path Not Found
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          This cultivation path does not exist
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg"
        >
          Return to Mortal Realm
        </button>
      </div>
    </div>
  )
}

export default NotFound
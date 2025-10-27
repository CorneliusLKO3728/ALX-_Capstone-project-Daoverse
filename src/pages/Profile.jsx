
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('Cultivator')

  useEffect(() => {
    const savedUsername = localStorage.getItem('daoverse_username') || 'Cultivator'
    setUsername(savedUsername)
  }, [])

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('daoverse_user_session')
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/Home')}
          className="mb-6 bg-white/90 hover:bg-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
        >
          ← Back to Home
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-8">
            Hello, {username}!
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="md:col-start-3 md:row-span-2 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden shadow-xl">
                <span className="text-gray-600 text-sm">Profile picture</span>
              </div>
            </div>

            <button
              onClick={() => alert('Profile editing coming soon!')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-lg text-xl transition-all shadow-lg"
            >
              Profile
            </button>

            <button
              onClick={() => navigate('/library')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-lg text-xl transition-all shadow-lg"
            >
              Bookmarks
            </button>

            <button
              onClick={() => alert('Karma system coming soon!')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-lg text-xl transition-all shadow-lg"
            >
              Karma level
            </button>

            <button
              onClick={() => navigate('/library')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-lg text-xl transition-all shadow-lg whitespace-nowrap"
            >
              Scripture Repository
            </button>

            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-lg text-xl transition-all shadow-lg"
            >
              Logout
            </button>

            <button
              onClick={() => alert('Settings coming soon!')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-lg text-xl transition-all shadow-lg"
            >
              Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-900/30 rounded-lg p-6 border-r border-blue-700/50">
            <h2 className="text-2xl font-bold text-white mb-4">Recently Read</h2>
            <div className="text-gray-400 text-center py-8">
              No recently read novels
            </div>
          </div>

          <div className="bg-blue-900/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Percentage Done</h2>
            <div className="text-gray-400 text-center py-8">
              No reading progress to show
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
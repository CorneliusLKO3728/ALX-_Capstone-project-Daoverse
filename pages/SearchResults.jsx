import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { novelService } from '../services/novelService'
import { getGenreBadgeColor, formatNumber } from '../utils/helpers'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'

function Home() {
  const [novels, setNovels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const popularTags = [
    'Special abilities',
    'Reincarnation',
    'Male MC',
    'Weak-to-strong',
    'Family strife',
    'Familial love',
    'Transmigration',
    'System'
  ]

  useEffect(() => {
    fetchNovels()
  }, [])

  const fetchNovels = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await novelService.getLatest(1, 6)
      if (result.success) {
        setNovels(result.data)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-12 tracking-wide">
            <span className="bg-gradient-to-r from-orange-400 via-blue-400 via-teal-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
              DAOVERSE
            </span>
          </h1>

          {loading ? (
            <div className="mb-12">
              <LoadingSkeleton count={6} />
            </div>
          ) : error ? (
            <ErrorMessage error={error} onRetry={fetchNovels} />
          ) : (
            <div className="mb-12 overflow-x-auto pb-4">
              <div className="flex gap-6 px-4" style={{ minWidth: 'max-content' }}>
                {novels.map((novel) => (
                  <Link
                    key={novel.id}
                    to={`/novel/${novel.id}`}
                    className="flex-shrink-0 w-64 bg-slate-800/50 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="relative h-80">
                      <img
                        src={novel.cover}
                        alt={novel.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x400?text=No+Cover'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-bold text-white line-clamp-2">{novel.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-2xl">
                🔍
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for your scriptures here"
                className="w-full bg-white text-gray-800 placeholder-gray-500 rounded-full pl-16 pr-6 py-6 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-2xl"
              />
            </div>
          </form>

             <div className="max-w-4xl mx-auto text-left">
            <p className="text-white text-lg mb-3">
              <span className="font-bold">Tags : </span>
              <span className="text-gray-300">
                {popularTags.join(', ')}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { novelService } from '../services/novelService';
import { POPULAR_TAGS } from '../utils/constants';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import NovelCard from '../components/NovelCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const [featuredNovels, setFeaturedNovels] = useState([]);
  const [topNovels, setTopNovels] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [featured, top, rated] = await Promise.all([
        novelService.getLatest(1, 6),
        novelService.getPopular(1, 10),
        novelService.getMostRated(1, 10)
      ]);

      if (featured.success) setFeaturedNovels(featured.data);
      if (top.success) setTopNovels(top.data);
      if (rated.success) setRankings(rated.data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} onRetry={fetchAllData} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <header className="flex items-center justify-between p-4 md:p-6">
        <button 
          onClick={() => navigate('/')}
          className="bg-white/90 hover:bg-white p-3 md:p-4 rounded-lg transition shadow-lg"
          aria-label="Home"
        >
          <span className="text-2xl md:text-3xl">🏠</span>
        </button>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide">
          <span style={{
            background: 'linear-gradient(90deg, #ff6b35, #ff8c42, #4ecdc4, #44a08d, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            DAOVERSE
          </span>
        </h1>

        <button 
          onClick={() => navigate('/profile')}
          className="bg-white/90 hover:bg-white p-3 md:p-4 rounded-lg transition shadow-lg"
          aria-label="Profile"
        >
          <span className="text-2xl md:text-3xl">👤</span>
        </button>
      </header>

      <section className="px-4 md:px-6 mb-8">
        <div className="overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-4 md:gap-6" style={{ minWidth: 'max-content' }}>
            {featuredNovels.map((novel) => (
              <div key={novel.id} className="flex-shrink-0">
                <NovelCard novel={novel} size="large" />
              </div>
            ))}
          </div>
        </div>
      </section>

     <section className="px-4 md:px-6 mb-8">
        <div className="max-w-4xl mx-auto">
       <SearchBar />
        <div className="mt-4">
          <p className="text-white text-sm md:text-lg">
           <span className="font-bold"> Search for Cultivation Techniques : </span>
            <span className="text-gray-300">{POPULAR_TAGS.join(', ')}</span>
          </p>
         </div>
       </div>
      </section>

      <section className="px-4 md:px-6 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Recent top novels</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {topNovels.map((novel) => (
            <NovelCard key={novel.id} novel={novel} size="medium" />
          ))}
        </div>
      </section>

      <section className="px-4 md:px-6 pb-12">
        <div className="bg-gray-100 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Novel rankings</h2>
          <div className="border-t-4 border-cyan-500 bg-white rounded-lg p-4 md:p-6 space-y-3">
            {rankings.map((novel, index) => (
              <Link
                key={novel.id}
                to={`/novel/${novel.id}`}
                className="flex items-center gap-3 md:gap-4 p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer"
              >
                <span className="text-xl md:text-2xl font-bold text-gray-400 w-8">#{index + 1}</span>
                <img
                  src={novel.cover}
                  alt={novel.title}
                  className="w-10 h-14 md:w-12 md:h-16 object-cover rounded shadow-md"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50x70?text=No';
                  }}
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{novel.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600">Rating: {novel.rating} ⭐</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Home;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { novelService } from '../services/novelService';
import { getDownloadUrl, getGenreBadgeColor } from '../utils/helpers';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

function NovelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [novel, setNovel] = useState(null);
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVolumes, setShowVolumes] = useState(false);

  useEffect(() => {
    if (id) {
      fetchNovelDetails();
    }
  }, [id]);

  const fetchNovelDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const [novelResult, volumesResult] = await Promise.all([
        novelService.getNovelById(id),
        novelService.getVolumes(id, 1, 50)
      ]);

      if (novelResult.success) {
        setNovel(novelResult.data);
      } else {
        setError('Novel not found');
      }

      if (volumesResult.success) {
        setVolumes(volumesResult.data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Loading novel details..." />;
  if (error) return <ErrorMessage error={error} onRetry={fetchNovelDetails} />;
  if (!novel) return <ErrorMessage error="Novel not found" />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Header Navigation */}
      <header className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
        {/* Up/Down Navigation */}
        <div className="bg-white/90 rounded-lg p-2 flex flex-col gap-1 shadow-lg">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 hover:bg-gray-200 rounded transition"
            aria-label="Scroll to top"
          >
            <span className="text-xl">▲</span>
          </button>
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="p-2 hover:bg-gray-200 rounded transition"
            aria-label="Scroll to bottom"
          >
            <span className="text-xl">▼</span>
          </button>
        </div>

        {/* Home Icon */}
        <button 
          onClick={() => navigate('/')}
          className="bg-white/90 hover:bg-white p-3 md:p-4 rounded-lg transition shadow-lg"
          aria-label="Home"
        >
          <span className="text-2xl md:text-3xl">🏠</span>
        </button>

        {/* DAOVERSE Title */}
        <h1 className="text-3xl md:text-5xl font-bold">
          <span style={{
            background: 'linear-gradient(90deg, #ff6b35, #4ecdc4, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            DAOVERSE
          </span>
        </h1>

        {/* Profile Icon */}
        <button 
          onClick={() => navigate('/profile')}
          className="bg-white/90 hover:bg-white p-3 md:p-4 rounded-lg transition shadow-lg"
          aria-label="Profile"
        >
          <span className="text-2xl md:text-3xl">👤</span>
        </button>

        {/* Search Icon */}
        <button 
          onClick={() => navigate('/search')}
          className="bg-white/90 hover:bg-white p-3 md:p-4 rounded-lg transition shadow-lg"
          aria-label="Search"
        >
          <span className="text-2xl md:text-3xl">🔍</span>
        </button>
      </header>

      {/* Novel Info Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
          {novel.title}
        </h2>

        <div className="bg-gray-100 rounded-xl p-4 md:p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Novel Cover */}
            <div className="flex items-start justify-center">
              <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-sm">
                <div className="text-center mb-4 text-gray-600 font-semibold">
                  Novel cover picture
                </div>
                <img
                  src={novel.cover}
                  alt={novel.title}
                  className="w-full h-auto max-h-96 object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400?text=No+Cover';
                  }}
                />
              </div>
            </div>

            {/* Novel Details */}
            <div className="bg-white rounded-lg p-4 md:p-6 space-y-4">
              <div>
                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2">Novel Author</h3>
                <p className="text-gray-700">{novel.author || 'Unknown Author'}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2">Novel Rating</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-xl font-bold text-gray-700">
                    {novel.anilist?.rating || novel.rating || 'N/A'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2">Novel Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {novel.genres && novel.genres.length > 0 ? (
                    novel.genres.map((genre, index) => (
                      <span
                        key={index}
                        className={`${getGenreBadgeColor(genre)} text-white px-3 py-1 rounded-full text-sm font-medium`}
                      >
                        {genre}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No tags available</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2">Status</h3>
                <span className={`inline-block px-4 py-2 rounded-lg font-semibold ${
                  novel.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {novel.status || 'Unknown'}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2">Type</h3>
                <p className="text-gray-700">{novel.type || 'Light Novel'}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2">Translation</h3>
                <p className="text-gray-700">{novel.translation || 'Unknown'}</p>
              </div>

              {/* View Volumes Button */}
              <button
                onClick={() => setShowVolumes(!showVolumes)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-lg mt-4"
              >
                {showVolumes ? '📚 Hide Volumes' : '📚 View Volumes'}
              </button>
            </div>
          </div>

          {/* Synopsis */}
          {novel.synopsis && (
            <div className="mt-6 bg-white rounded-lg p-4 md:p-6">
              <h3 className="font-bold text-xl md:text-2xl text-gray-900 mb-3">Synopsis</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {novel.synopsis}
              </p>
            </div>
          )}

          {/* Volumes List */}
          {showVolumes && (
            <div className="mt-6 bg-white rounded-lg p-4 md:p-6">
              <h3 className="font-bold text-xl md:text-2xl text-gray-900 mb-4">
                Available Volumes ({volumes.length})
              </h3>
              
              {volumes.length > 0 ? (
                <div className="space-y-3">
                  {volumes.map((volume, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition border border-gray-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="font-semibold text-gray-900 text-lg">
                          📖 Volume {volume.number || index + 1}
                        </span>
                        <div className="flex flex-col sm:flex-row gap-2">
                          {volume.epub && (
                            
                              href={getDownloadUrl(volume.epub)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-lg font-semibold transition shadow-md"
                            >
                              📕 EPUB
                            </a>
                          )}
                          {volume.pdf && (
                            
                              href={getDownloadUrl(volume.pdf)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-red-600 hover:bg-red-700 text-white text-center px-4 py-2 rounded-lg font-semibold transition shadow-md"
                            >
                              📄 PDF
                            </a>
                          )}
                          <button
                            onClick={() => navigate(`/novel/${id}/read/${volume.number || index + 1}`)}
                            className="bg-green-600 hover:bg-green-700 text-white text-center px-4 py-2 rounded-lg font-semibold transition shadow-md"
                          >
                            📖 Read
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-xl mb-2">📚</p>
                  <p>No volumes available yet</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Comment Section */}
        <div className="bg-gray-100 rounded-xl p-4 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Comment section</h3>
          <div className="bg-white rounded-lg p-4 md:p-6">
            <textarea
              placeholder="Share your thoughts about this novel... (Coming Soon)"
              className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 transition"
              disabled
            ></textarea>
            <button 
              className="mt-3 bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold cursor-not-allowed"
              disabled
            >
              Post Comment (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovelDetail;
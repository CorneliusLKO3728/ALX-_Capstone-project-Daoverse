
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { novelService } from '../services/novelService';
import NovelCard from '../components/NovelCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setLoading(false);
      setBooks([]);
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const result = await novelService.search(searchQuery, 1, 20);
      
      if (result.success) {
        setBooks(result.data);
        setTotal(result.total);
      } else {
        setError('Search cultivation path failed');
        setBooks([]);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while seeking scriptures');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 bg-white/90 hover:bg-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
        >
          ← Return to DaoVerse
        </button>

        <div className="mb-8">
          <SearchBar />
        </div>

        {loading && <Loading message="Seeking cultivation scriptures..." />}
        
        {error && (
          <ErrorMessage 
            error={error} 
            onRetry={() => query && performSearch(query)} 
          />
        )}

        {!loading && !error && (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                {query ? `Cultivation Path: "${query}"` : 'Seek Scriptures'}
              </h1>
              <p className="text-gray-300">
                {books.length > 0 
                  ? `Found ${total} cultivation scriptures` 
                  : query 
                    ? 'No scriptures found matching your cultivation path' 
                    : 'Enter your cultivation path to discover scriptures'
                }
              </p>
            </div>

            {books.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {books.map((book) => (
                  <NovelCard key={book.id} novel={book} size="medium" />
                ))}
              </div>
            )}

            {!query && !loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-white mb-4">Discover Cultivation Scriptures</h2>
                <p className="text-gray-300 text-lg">
                  Seek by title, master, or cultivation techniques to unlock profound mysteries
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchResults;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/helpers';

function BookDetails({ book }) {
  const navigate = useNavigate();

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Cultivation scripture not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-white/90 hover:bg-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
        >
          ← Back to Scriptures
        </button>

        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <img
                src={book.cover}
                alt={book.title}
                className="w-64 h-96 object-cover rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=No+Cover';
                }}
              />
            </div>

            <div className="flex-1 text-white">
              <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                {book.title}
              </h1>
              
              <div className="mb-6 space-y-3">
                <h2 className="text-xl text-gray-300">
                  by <span className="font-semibold text-white">{Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}</span>
                </h2>
                
                {book.publisher && book.publisher !== 'Unknown Publisher' && (
                  <p className="text-gray-300">
                    <span className="font-semibold">Publisher:</span> {book.publisher}
                  </p>
                )}
                
                {book.publishedDate && book.publishedDate !== 'Unknown' && (
                  <p className="text-gray-300">
                    <span className="font-semibold">Publication Date:</span> {formatDate(book.publishedDate)}
                  </p>
                )}
                
                {book.isbn && book.isbn !== 'N/A' && (
                  <p className="text-gray-300">
                    <span className="font-semibold">ISBN:</span> {book.isbn}
                  </p>
                )}
                
                {book.pageCount && (
                  <p className="text-gray-300">
                    <span className="font-semibold">Pages:</span> {book.pageCount}
                  </p>
                )}
                
                {book.rating && book.rating !== 'N/A' && (
                  <p className="text-gray-300">
                    <span className="font-semibold">Cultivation Rating:</span> {book.rating} ⭐
                  </p>
                )}
              </div>

              {book.categories && book.categories.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-3">Cultivation Techniques</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.categories.map((category, index) => (
                      <span
                        key={index}
                        className="bg-purple-600/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

                    {book.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-3">Scripture Description</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-300 leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                </div>
              )}

                 <div className="flex flex-wrap gap-4 mt-8">
                {book.previewLink && (
                  <a
                    href={book.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
                  >
                    📖 Preview Scripture
                  </a>
                )}
                
                {book.infoLink && (
                  <a
                    href={book.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
                  >
                    ℹ️ More Insights
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;

import { Link } from 'react-router-dom';
import { formatNumber, getGenreBadgeColor } from '../utils/helpers';

function NovelCard({ novel, size = 'medium' }) {
  const sizeClasses = {
    small: 'w-40 h-56',
    medium: 'w-48 h-72',
    large: 'w-64 h-80'
  };

  return (
    <Link
      to={`/novel/${novel.id}`}
      className="block transform hover:scale-105 transition-transform duration-300 cursor-pointer group"
    >
      <div className="bg-slate-800/50 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all">

        <div className={`relative ${sizeClasses[size]} overflow-hidden`}>
          <img
            src={novel.cover}
            alt={novel.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x400?text=No+Cover';
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
             {novel.rating || 'N/A'}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="font-bold text-white text-sm line-clamp-2 group-hover:text-purple-300 transition">
              {novel.title}
            </h3>
          </div>
        </div>

        
        <div className="p-3 bg-slate-900/50">
          <div className="flex flex-wrap gap-1 mb-2">
            {novel.genres?.slice(0, 2).map((genre, index) => (
              <span
                key={index}
                className={`${getGenreBadgeColor(genre)} text-white px-2 py-0.5 rounded text-xs font-medium`}
              >
                {genre}
              </span>
            ))}
            {novel.genres?.length > 2 && (
              <span className="bg-gray-600 text-white px-2 py-0.5 rounded text-xs">
                +{novel.genres.length - 2}
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="flex items-center gap-1">
               {formatNumber(novel.popularity)}
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
              novel.status === 'Completed' ? 'bg-green-600' : 'bg-blue-600'
            } text-white`}>
              {novel.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NovelCard;
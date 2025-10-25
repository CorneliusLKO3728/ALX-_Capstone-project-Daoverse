
export const getDownloadUrl = (driveId) => {
  if (!driveId) return '';
  return `https://drive.google.com/uc?export=download&id=${driveId}`;
};

export const formatNumber = (num) => {
  const number = parseInt(num);
  if (isNaN(number)) return '0';
  if (number >= 1000000) return (number / 1000000).toFixed(1) + 'M';
  if (number >= 1000) return (number / 1000).toFixed(1) + 'K';
  return number.toString();
};
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};


export const getGenreBadgeColor = (genre) => {
  const genreLower = genre?.toLowerCase() || '';
  const colors = {
    'action': 'bg-red-500',
    'adventure': 'bg-orange-500',
    'romance': 'bg-pink-500',
    'fantasy': 'bg-purple-500',
    'drama': 'bg-blue-500',
    'comedy': 'bg-yellow-500',
    'mystery': 'bg-indigo-500',
    'martial arts': 'bg-red-600',
    'cultivation': 'bg-emerald-500',
    'wuxia': 'bg-red-600',
    'xianxia': 'bg-purple-600',
    'xuanhuan': 'bg-blue-600',
  };
  return colors[genreLower] || 'bg-gray-500';
};

export const formatGenre = (genre) => {
  if (!genre) return '';
  return genre.charAt(0).toUpperCase() + genre.slice(1);
};
export const isCultivationNovel = (genres = []) => {
  const cultivationKeywords = ['martial arts', 'wuxia', 'xianxia', 'xuanhuan', 'cultivation', 'action', 'fantasy'];
  return genres.some(genre => 
    cultivationKeywords.some(keyword => 
      genre.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch {
    return 'Unknown';
  }
};
export const sanitizeHTML = (html) => {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
};
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage error:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  }
};
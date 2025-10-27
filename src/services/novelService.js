
import api from './api';


const transformBooksData = (books) => {
  return books.map(book => ({
    id: book.id,
    title: book.volumeInfo?.title || 'Unknown Scripture',
    cover: book.volumeInfo?.imageLinks?.thumbnail || book.volumeInfo?.imageLinks?.smallThumbnail || 'https://via.placeholder.com/300x400?text=No+Cover',
    authors: book.volumeInfo?.authors || ['Unknown Master'],
    publisher: book.volumeInfo?.publisher || 'Unknown Sect',
    description: book.volumeInfo?.description || 'This cultivation scripture contains profound mysteries...',
    publishedDate: book.volumeInfo?.publishedDate || 'Unknown Era',
    isbn: book.volumeInfo?.industryIdentifiers?.[0]?.identifier || 'N/A',
    pageCount: book.volumeInfo?.pageCount || 0,
    categories: book.volumeInfo?.categories || ['Cultivation'],
    rating: book.volumeInfo?.averageRating || 'N/A',
    
    genres: book.volumeInfo?.categories || ['Cultivation'],
    popularity: Math.floor(Math.random() * 10000),
    status: 'Completed'
  }));
};

const transformBookDetail = (book) => {
  return {
    id: book.id,
    title: book.volumeInfo?.title || 'Unknown Scripture',
    cover: book.volumeInfo?.imageLinks?.thumbnail || book.volumeInfo?.imageLinks?.smallThumbnail || 'https://via.placeholder.com/300x400?text=No+Cover',
    authors: book.volumeInfo?.authors || ['Unknown Master'],
    publisher: book.volumeInfo?.publisher || 'Unknown Sect',
    description: book.volumeInfo?.description || 'This cultivation scripture contains profound mysteries waiting to be unlocked...',
    publishedDate: book.volumeInfo?.publishedDate || 'Unknown Era',
    isbn: book.volumeInfo?.industryIdentifiers?.[0]?.identifier || 'N/A',
    pageCount: book.volumeInfo?.pageCount || 0,
    categories: book.volumeInfo?.categories || ['Cultivation'],
    rating: book.volumeInfo?.averageRating || 'N/A',
   
    language: book.volumeInfo?.language || 'en',
    previewLink: book.volumeInfo?.previewLink || '',
    infoLink: book.volumeInfo?.infoLink || ''
  };
};

export const novelService = {
  getLatest: async (page = 1, perPage = 12) => {
    try {
      const startIndex = (page - 1) * perPage;
      const response = await api.get(`/volumes`, {
        params: {
          q: 'subject:fantasy',
          orderBy: 'newest',
          startIndex,
          maxResults: perPage
        }
      });
      
      return {
        success: true,
        data: transformBooksData(response.data.items || []),
        total: response.data.totalItems || 0
      };
    } catch (error) {
      console.error('Failed to fetch latest scriptures:', error);
      throw error;
    }
  },

  getPopular: async (page = 1, perPage = 12) => {
    try {
      const startIndex = (page - 1) * perPage;
      const response = await api.get(`/volumes`, {
        params: {
          q: 'subject:fantasy',
          orderBy: 'relevance',
          startIndex,
          maxResults: perPage
        }
      });
      
      return {
        success: true,
        data: transformBooksData(response.data.items || []),
        total: response.data.totalItems || 0
      };
    } catch (error) {
      console.error('Failed to fetch popular scriptures:', error);
      throw error;
    }
  },

  getMostRated: async (page = 1, perPage = 12) => {
    try {
      const startIndex = (page - 1) * perPage;
      const response = await api.get(`/volumes`, {
        params: {
          q: 'subject:fantasy',
          orderBy: 'relevance',
          startIndex,
          maxResults: perPage
        }
      });
      
      return {
        success: true,
        data: transformBooksData(response.data.items || []),
        total: response.data.totalItems || 0
      };
    } catch (error) {
      console.error('Failed to fetch rated scriptures:', error);
      throw error;
    }
  },

  search: async (query, page = 1, perPage = 12) => {
    try {
      if (!query || !query.trim()) {
        throw new Error('Search query cannot be empty');
      }

      const startIndex = (page - 1) * perPage;
      const response = await api.get(`/volumes`, {
        params: {
          q: query.trim(),
          startIndex,
          maxResults: perPage
        }
      });
      
      return {
        success: true,
        data: transformBooksData(response.data.items || []),
        total: response.data.totalItems || 0
      };
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  },

  getNovelById: async (id) => {
    try {
      if (!id) {
        throw new Error('Scripture ID is required');
      }

      const response = await api.get(`/volumes/${id}`);
      
      return {
        success: true,
        data: transformBookDetail(response.data)
      };
    } catch (error) {
      console.error('Failed to fetch scripture details:', error);
      throw error;
    }
  },

  
  getFiltered: async (type = 'all', genre = '', page = 1, perPage = 12) => {
    try {
      const startIndex = (page - 1) * perPage;
      let query = 'subject:fantasy';
      
      if (genre) {
        query += ` ${genre}`;
      }
      
      const response = await api.get(`/volumes`, {
        params: {
          q: query,
          startIndex,
          maxResults: perPage
        }
      });
      
      return {
        success: true,
        data: transformBooksData(response.data.items || []),
        total: response.data.totalItems || 0
      };
    } catch (error) {
      console.error('Filter failed:', error);
      throw error;
    }
  }
};

import api from './api';

export const novelService = {

  getLatest: async (page = 1, perPage = 12) => {
    try {
      const response = await api.get('/latest', {
        params: { page, perPage }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch latest novels:', error);
      throw error;
    }
  },


  getPopular: async (page = 1, perPage = 12) => {
    try {
      const response = await api.get('/popular', {
        params: { page, perPage }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch popular novels:', error);
      throw error;
    }
  },

  
  getMostRated: async (page = 1, perPage = 12) => {
    try {
      const response = await api.get('/most-rated', {
        params: { page, perPage }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch rated novels:', error);
      throw error;
    }
  },


  search: async (query, page = 1, perPage = 12) => {
    try {
      if (!query || !query.trim()) {
        throw new Error('Search query cannot be empty');
      }
      const response = await api.get('/search', {
        params: { query: query.trim(), page, perPage }
      });
      return response.data;
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  },
  getNovelById: async (id) => {
    try {
      if (!id) {
        throw new Error('Novel ID is required');
      }
      const response = await api.get('/info', {
        params: { id }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch novel details:', error);
      throw error;
    }
  },

  getVolumes: async (id, page = 1, perPage = 50) => {
    try {
      if (!id) {
        throw new Error('Novel ID is required');
      }
      const response = await api.get('/volumes', {
        params: { id, page, perPage }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch volumes:', error);
      throw error;
    }
  },

  getFiltered: async (type = 'all', genre = '', page = 1, perPage = 12) => {
    try {
      const response = await api.get('/filter', {
        params: { type, genre, page, perPage }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to filter novels:', error);
      throw error;
    }
  },

  getRecommendations: async (id, page = 1, perPage = 10) => {
    try {
      if (!id) {
        throw new Error('Novel ID is required');
      }
      const response = await api.get('/recommendation', {
        params: { id, page, perPage }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      throw error;
    }
  },

  getByPublisher: async (publisher, page = 1, perPage = 12) => {
    try {
      if (!publisher || !publisher.trim()) {
        throw new Error('Publisher name is required');
      }
      const response = await api.get('/publisher', {
        params: { query: publisher.trim(), page, perPage }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch by publisher:', error);
      throw error;
    }
  },
};
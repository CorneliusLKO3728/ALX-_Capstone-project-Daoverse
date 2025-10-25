
import { useState, useEffect } from 'react';
import { novelService } from '../services/novelService';

export const useNovels = (fetchType = 'latest', params = {}) => {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(params.page || 1);

  useEffect(() => {
    fetchNovels();
  }, [fetchType, page, JSON.stringify(params)]);

  const fetchNovels = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let result;
      const currentPage = params.page || page;
      const perPage = params.perPage || 12;
      
      switch (fetchType) {
        case 'latest':
          result = await novelService.getLatest(currentPage, perPage);
          break;
        case 'popular':
          result = await novelService.getPopular(currentPage, perPage);
          break;
        case 'rated':
          result = await novelService.getMostRated(currentPage, perPage);
          break;
        case 'search':
          if (!params.query) {
            throw new Error('Search query is required');
          }
          result = await novelService.search(params.query, currentPage, perPage);
          break;
        case 'filter':
          result = await novelService.getFiltered(
            params.type || 'all',
            params.genre || '',
            currentPage,
            perPage
          );
          break;
        default:
          result = await novelService.getLatest(currentPage, perPage);
      }

      if (result && result.success) {
        setNovels(result.data || []);
        setTotal(result.total || 0);
      } else {
        setError('Failed to fetch novels');
        setNovels([]);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      setNovels([]);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchNovels();
  };

  const nextPage = () => {
    setPage(prev => prev + 1);
  };

  const prevPage = () => {
    setPage(prev => Math.max(1, prev - 1));
  };

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  return { 
    novels, 
    loading, 
    error, 
    total,
    page,
    refetch,
    nextPage,
    prevPage,
    goToPage
  };
};
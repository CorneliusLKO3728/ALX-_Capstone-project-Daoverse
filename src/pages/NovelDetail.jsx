// Replace the entire src/pages/NovelDetail.jsx with:
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { novelService } from '../services/novelService';
import BookDetails from '../components/BookDetails';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

function NovelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await novelService.getNovelById(id);
      
      if (result.success) {
        setBook(result.data);
      } else {
        setError('Failed to fetch cultivation scripture');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while seeking the scripture');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Seeking cultivation scripture..." />;
  if (error) return <ErrorMessage error={error} onRetry={fetchBookDetails} />;

  return <BookDetails book={book} />;
}

export default NovelDetail;
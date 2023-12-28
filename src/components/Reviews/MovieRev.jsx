import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './MovieRev.module.css';

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const apiKey = 'eed14fd55202ee0e89c15a259f6aa876';

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setReviews(data.results))
      .catch(error => console.error('Error fetching movie reviews:', error));
  }, [apiKey, movieId]);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.reviewsContainer}>
      <h2>Movie Reviews Page</h2>
      <Link to="#" onClick={goBack} className={`${styles.goBackLink} ${reviews.length === 0 && styles.hiddenLink}`}>
        Go Back to Movie Details
      </Link>
      {reviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {reviews.map(review => (
            <li key={review.id} className={styles.reviewItem}>
              <h3 className={styles.author}>{review.author}</h3>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noReviews}>
          <p>No reviews available for this movie.</p>
          <Link to="#" onClick={goBack} className={styles.searchLink}>
            Go Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default MovieReviews;
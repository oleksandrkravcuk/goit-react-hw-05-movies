import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieApi.module.css';

const MovieCredits = () => {
  const [credits, setCredits] = useState([]);
  const { movieId } = useParams();
  const apiKey = 'eed14fd55202ee0e89c15a259f6aa876';

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setCredits(data.cast))
      .catch(error => console.error('Error fetching movie credits:', error));
  }, [apiKey, movieId]);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.creditsContainer}>
      <h2>Movie Credits Page</h2>
      <button onClick={goBack} className={styles.goBackLink}>
        Go Back
      </button>
      <ul className={styles.creditList}>
        {credits.map(credit => (
          <li key={credit.credit_id} className={styles.creditItem}>
            {credit.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${credit.profile_path}`}
                alt={`${credit.name} profile`}
                className={styles.creditImage}
              />
            ) : (
              <div className={styles.noImagePlaceholder}>
                No Image
              </div>
            )}
            <div className={styles.creditInfo}>
              <p className={styles.creditName}>{credit.name}</p>
              <p className={styles.creditCharacter}>{credit.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCredits;
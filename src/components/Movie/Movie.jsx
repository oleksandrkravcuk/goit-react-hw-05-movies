import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import styles from './Movie.module.css';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();
  const apiKey = 'eed14fd55202ee0e89c15a259f6aa876';
  const location = useLocation();
  const cameBack = location.state?.from ?? '/';

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => setMovieDetails(data))
      .catch(error => console.error('Error fetching movie details:', error));
  }, [movieId, apiKey]);

  const releaseYear = movieDetails.release_date ? movieDetails.release_date.substring(0, 4) : '';

  return (
    <div className={styles.movieDetails}>
      <Link to={cameBack} className={styles.navigationLink}>
        Go back
      </Link>
      <h2 className={styles.movieTitle}>
        {movieDetails.title} ({releaseYear})
      </h2>
      <b className={styles.voteAverage}>Vote Average: {(movieDetails.vote_average * 10).toFixed(1)}%</b>
      <p className={styles.movieOverview}>{movieDetails.overview}</p>
      {movieDetails.poster_path && (
        <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} className={styles.moviePoster} />
      )}
      <b className={styles.runtime}>Runtime: {movieDetails.runtime} minutes</b>

      <div className={styles.genres}>
        <p className={styles.genresTitle}>Genres:</p>
        <ul className={styles.genreList}>
          {movieDetails.genres &&
            movieDetails.genres.map(genre => (
              <li key={genre.id} className={styles.genre}>
                {genre.name}
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.navigationLinks}>
        <Link
          to={{ pathname: `/movies/${movieId}/credits`, state: { from: cameBack }}}
          className={styles.navigationLink}
        >
          View Movie Credits
        </Link>
        <Link
          to={{ pathname: `/movies/${movieId}/reviews`, state: { from: cameBack } }}
          className={styles.navigationLink}
        >
          View Movie Reviews
        </Link>
      </div>
    </div>
  );
};

export default MovieDetails;
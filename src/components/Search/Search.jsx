import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import styles from './Search.module.css';

const apiKey = 'eed14fd55202ee0e89c15a259f6aa876';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('query') || '');
  const [files, setFiles] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const location = useLocation();
  const query = searchParams.get('query') || '';

  const handleSearch = () => {
    setSearchParams({ query: value });
    setSearchClicked(true);

    if (!value) {
      setFiles([]); 
      return;
    }

    fetchSearchMovie(value)
      .then(info => {
        if (info.total_results === 0) {
          return alert(`Sorry, we didn't find any results for ${value}.`);
        }

        setFiles(info.results);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setFiles([]); 
      });
  };

  useEffect(() => {
    if (!query || !searchClicked) {
      return;
    }

    fetchSearchMovie(query)
      .then(info => {
        if (info.total_results === 0) {
          return alert(`Sorry, we didn't find any results for ${query}.`);
        }

        setFiles(info.results);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, [query, searchClicked]);

  const fetchSearchMovie = (query) => {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
      .then(response => response.json());
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      {searchClicked && (
        <ul className={styles.movieList}>
          {files.map(({ title, id }) => (
          <li key={id} className={styles.movieListItem}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {title}
            </Link>
          </li>
        ))}

        </ul>
      )}
    </div>
  );
};

export default Movies;
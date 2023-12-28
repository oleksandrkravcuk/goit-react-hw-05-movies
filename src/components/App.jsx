import React, { lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import styles from './App.module.css';

const Home = lazy(() => import('./Home/Home'));
const MovieDetails = lazy(() => import('./Movie/Movie'));
const MovieCredits = lazy(() => import('./API/MovieApi'));
const MovieReviews = lazy(() => import('./Reviews/MovieRev'));
const Search = lazy(() => import('./Search/Search'));

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={`${styles.navLink} ${isHome ? styles.activeLink : ''}`}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/search" className={`${styles.navLink} ${!isHome ? styles.activeLink : ''}`}>
              Search
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export const App = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/movies/:movieId/credits" element={<MovieCredits />} />
          <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
};
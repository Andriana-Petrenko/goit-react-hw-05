import { useEffect, useRef } from "react";
import { fetchMovieDetailsById } from "../../movies-api";
import { useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import css from "./MovieDetailsPage.module.css"
import clsx from "clsx"
import Error from "../../components/Error/Error";

const activeLink = ({ isActive }) => {
  return clsx(css.details_link, isActive && css.active);
};

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovieDetails] = useState(null);
    const location = useLocation();
    const backLink=useRef(location.state ?? "/")
    const [error, setError] = useState(false);
    
    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                setError(false);
                const movie = await fetchMovieDetailsById(movieId);
                setMovieDetails(movie);
            } catch (error) {
                setError(true);
            }
        }
        fetchMovieDetails();
    }, [movieId])

    if (movie !== null) {
        const vote = Math.round(movie.vote_average * 100) / 10;
        return (
            
            (<div className={css.details_wrapper}>
                {error && <Error />}
                <Link className={css.go_back} to={backLink.current}>Back</Link>
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} width="360" alt={`${movie.title}`} />
                <h2 className={css.movie_title}>{movie.title}</h2>
                <p>User score: {vote}%</p>
                <p className={css.movie_overview}>Overview {movie.overview}</p>
                {movie.genres !== null && (<ul className={css.genres_list}>Genres  {movie.genres.map(genre => {
          return (
              <li key={genre.id} >
                  <p>{genre.name}</p>
              </li>)
      })}
      </ul>)} 

                <ul className={css.details_list}>
                    <li className={css.details_item}><NavLink className={activeLink} to="cast">Cast</NavLink></li>
                    <li className={css.details_item}><NavLink className={activeLink} to="reviews">Reviews</NavLink></li>
                </ul>
                <Routes>
                        <Route path="cast" element={<MovieCast/>}></Route>
                        <Route path="reviews" element={<MovieReviews/>}></Route>
                    </Routes>
            </div>)
        )
    }
        
}

export default MovieDetailsPage


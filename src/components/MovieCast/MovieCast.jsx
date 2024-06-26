import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../movies-api";
import css from "./MovieCast.module.css"
import Error from "../Error/Error";
const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'

const MovieCast = () => {
    const { movieId } = useParams();
    const [movieCasts, setCast] = useState(null);
    const [error, setError] = useState(false);
useEffect(() => {
        async function fetchCast() {
            try {
                 setError(false);
                const movieCasts = await fetchMovieCast(movieId);
                setCast(movieCasts);
            } catch (error) {
                 setError(true) 
            } 
        }
        fetchCast();
    }, [movieId])
if (movieCasts !== null){return (
      <div>
          <ul className={css.cast_list}>{movieCasts.map(cast => {
              return (
               <li key={cast.id} className={css.cast_item}>
                    <img src={cast.profile_path ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}` : defaultImg} width="200" alt={`${cast.name}`} />
                  <p className={css.cast_name}>{cast.name}</p>
                  <p className={css.cast_charecter}>Character {cast.character }</p>
              </li>   
              )
          })}
              
        </ul>
        {error && <Error />}
    </div>
  )}
  
}

export default MovieCast

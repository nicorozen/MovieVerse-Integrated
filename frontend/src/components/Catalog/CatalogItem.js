import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import LoadingSkeleton from '../Layout/LoadingSkeleton';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import MovieItem from './MovieItem';
import useFetch from '../../Helpers/useFetch';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Loader from '../Layout/Loader';
import { Link } from 'react-router-dom';

function CatalogItem({ selectedGenre, contentType, viewAllGenres }) {
  const type = contentType === 'series' ? 'tv' : 'movie';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchByGenre = async () => {
      setLoading(true); 
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=4f5f43495afcc67e9553f6c684a82f84&language=es-ES&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_genres=${selectedGenre.id}`);
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching movies for genre:`, error);
        setLoading(false);
      }
    };
  
    fetchByGenre();
  }, [selectedGenre.id, type]); 
  

  const settings = {
    modules: [Navigation, Pagination, Scrollbar, A11y],
    spaceBetween: 20,
    slidesPerView: 2,
    navigation: true,
    scrollbar: false,
    breakpoints: {
      768: {
        slidesPerView: 6,
      },
    },
  };

  if (loading) {
    return <Loader />; 
  } else if (viewAllGenres) {
    return (
      <div className="catalog-item">
        <Link to={`/${contentType}/category/${selectedGenre.id}`}>
          <h4>{selectedGenre.name}</h4>
        </Link>
        <Swiper {...settings}>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieItem key={movie.id} item={movie} contentType={contentType} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  } else {
    return (
      <div className="catalog-item">
        <h4 style={{ fontSize: '2.4rem', margin: '4rem 0' }}>{selectedGenre ? selectedGenre.name : 'Loading...'}</h4>
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieItem key={movie.id} item={movie} contentType={contentType} />
            ))}
        </div>
      </div>
    );
  }
}

export default CatalogItem;

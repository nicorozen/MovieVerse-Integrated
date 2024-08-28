import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useFetch from '../../Helpers/useFetch'; 
import Loader from '../Layout/Loader';

function TopTenCatalog({ contentType }) {
  
  const type = contentType === 'series' ? 'tv' : 'movie';
  const { data: popularMoviesData, loading: popularMoviesLoading, error: popularMoviesError } = useFetch(`/${type}/popular`, {page: 1});
  
  const movies = popularMoviesData?.results || [];

  const settings = {
    modules: [Navigation, Pagination, Scrollbar, A11y],
    spaceBetween: 50,
    slidesPerView: 3,
    navigation: false,
    scrollbar: false,
    breakpoints: {
      768: {
        slidesPerView: 5,
      },
    },
  };

  return (
    <>
      <div className='top-ten-movies-section shared-container'>
        <h2>TOP 10</h2>
        {popularMoviesLoading ? (
          <Loader></Loader>
        ) 
        : (
          <Swiper {...settings} className='top-ten-movies-swiper'>
            {movies.filter(m => m.overview).slice(0, 10).map((movie, index) => (
              <SwiperSlide key={movie.id} className='top-ten-movies-slide'>
                <Link to={`/detail/${type}/${movie.id}`}>
                  <span className="rank">{index + 1}</span>
                  <img
                    width={170}
                    height={230}
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}

export default TopTenCatalog;

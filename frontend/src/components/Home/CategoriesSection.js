import React, { useState, useEffect } from 'react';
// import movies from '../../movies.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function CategoriesSection() {

  const [movies, setMovies] = useState([]);
  
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4f5f43495afcc67e9553f6c684a82f84&language=es-ES&page=1`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error(`Error fetching popular movies:`, error);
      }
    };

    fetchMovies();
  }, []);
    return (
    <div className="categories-section shared-container">
      <h4 className='title'>¿Qué vas a ver primero?</h4>
      
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={15}
        slidesPerView={2}
        navigation={true}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {movies.slice(0, 10).map((movie) => (
          <SwiperSlide key={movie.id} className='movie-slide'>
            <Category movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CategoriesSection;


function Category({ movie }) {
    const imageUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
  
    return (
      <div>
        <Link to={`/detail/movie/${movie.id}`}>
          <img
            width={230}
            height={345}
            src={imageUrl}
            alt=''
          />
        </Link>
      </div>
    );
  }
  
  

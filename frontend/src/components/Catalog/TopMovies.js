import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  pagination:true,
  autoplay:true,
  autoplaySpeed:6000
};

function TopMovies({contentType}) {
  const [popularList, setPopularList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let endpoint = '';
    if (contentType === 'series') {
      endpoint = 'tv';
    } else {
      endpoint = 'movie';
    }

    const fetchPopularList = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/${endpoint}/popular?api_key=4f5f43495afcc67e9553f6c684a82f84&language=es-ES&page=1`);
        const data = await response.json();
        setPopularList(data.results);
      } catch (error) {
        console.error('Error fetching new releases:', error);
      }
    };

    fetchPopularList();
  }, []);
  


  return (
    <div className="movie-top-slider">
      <Slider {...settings}>
        {popularList.filter(m=> m.overview).slice(0, 8).map((movie) => (
          <div key={movie.id}>
            <TopMovie movie={movie} contentType={contentType}/>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TopMovies;

function TopMovie({movie, contentType}){
  let type = contentType === 'series' ? 'tv' : 'movie';
  return(
  <>
  <Link to={`/detail/${type}/${movie.id}`}>
    <div
      className="slider-item"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      
      <div className="slider-overlay"></div>
      <div className="slider-content">
        <h2>{movie.title || movie.name}</h2>
        <p>{movie.overview}</p>
      </div>
    </div>
  </Link>
  </>
  );
}

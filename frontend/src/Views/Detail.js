import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLists } from '../Context/ListsContext';
import { useAuth } from '../Context/AuthContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus, faEye, faMinus, faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Layout/Loader';
import useFetch from '../Helpers/useFetch';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


const Detail = () => {
  const { type, id } = useParams(); 
  const { toWatchList, favoritesList, viewedList, add, remove } = useLists();
  const { isAuthenticated } = useAuth();

  let detailId = parseInt(id);
  const isFavorite = favoritesList.some(favorite => favorite.movieId === detailId);
  const isToWatch = toWatchList.some(toWatch => toWatch.movieId === detailId);
  const isViewed = viewedList.some(viewed => viewed.movieId === detailId);
  const endpoint = type === 'movie' ? `movie` : `tv`;

  const { data: detail, loading, error } = useFetch(`/${endpoint}/${id}`);
  const detailGenres = detail?.genres;
  const { data: similarItems, loading: loadingSimilar } = useFetch(`/discover/${endpoint}`, {
    "with_genres": detailGenres ? detailGenres.map(genre => genre.id).join(',') : null
  });
  const { data: credits, loading: loadingCredits } = useFetch(`/${endpoint}/${id}/credits`);
  const { data: videos, loading: loadingVideos } = useFetch(`/${endpoint}/${id}/videos`);

  const similarItemsResults = similarItems?.results.filter(s => s.id !== detailId).slice(0, 7);

  const [showSimilar, setShowSimilar] = useState(true);
  const [showInformation, setShowInformation] = useState(false);
  const [showTrailerPopup, setShowTrailerPopup] = useState(false);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleToggleSimilar = () => {
    setShowSimilar(true);
    setShowInformation(false);
  };

  const handleToggleInformation = () => {
    setShowSimilar(false);
    setShowInformation(true);
  };

  const handleAdd = (list) => {
    const itemDetails = {
      listType: list,
      movieId: detail.id,
      contentType: type,
      image: detail.poster_path
    };
    add(itemDetails);
  };

  const handleRemove = (listType) => {
    let list = null;
    if (listType === 'Favoritas') {
      list = favoritesList;
    } else if (listType === 'Por ver') {
      list = toWatchList;
    } else {
      list = viewedList;
    }

    const item = list.find(item => item.movieId === detailId);
    let listItemId = null;
    if (item) {
      listItemId = item.listItemId;
    }

    const itemDetails = {
      listItemId: listItemId,
      listType: list  
    };

    remove(itemDetails);
  };

  if (loading || !detail) {
    return <Loader/>;
  }

  // Filtrar el trailer
  const trailer = videos?.results.find(video => video.type === 'Trailer');

  const openTrailerPopup = () => {
    setShowTrailerPopup(true);
  };

  const closeTrailerPopup = () => {
    setShowTrailerPopup(false);
  };

  return (
    <div className="movie-detail">
      <div className="movie-top-slider">
        <div className="slider-overlay"></div>
        <div
          className="slider-item"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
          }}
        >
          <div className="slider-content">
            <h2>{detail.title || detail.name}</h2>

            {isAuthenticated && (
              <div className='actions'>
                {isFavorite ? (
                  <a className='action' onClick={() => handleRemove("Favoritas")}>
                    <FontAwesomeIcon icon={faHeart} style={{color: 'red'}} />
                    <span>Quitar de "Favoritos"</span>
                  </a>
                ) : (
                  <a className='action' onClick={() => handleAdd("Favoritas")}>
                    <FontAwesomeIcon icon={faHeart} />
                    <span>Agregar a "Favoritos"</span>
                  </a>
                )}

                {isViewed ? (
                  <a className='action' onClick={() => handleRemove("Vistas")}>
                    <FontAwesomeIcon icon={faEye} style={{color:'#33b5ff'}}/>
                    <span>Quitar de "Vistos"</span>
                  </a>
                ) : (
                  <a className='action' onClick={() => handleAdd("Vistas")}>
                    <FontAwesomeIcon icon={faEye} />
                    <span>Agregar a "Vistos"</span>
                  </a>
                )}

                {isToWatch ? (
                  <a className='action' onClick={() => handleRemove("Por ver")}>
                    <FontAwesomeIcon icon={faMinus} />
                    <span>Quitar de "Por ver"</span>
                  </a>
                ) : (
                  <a className='action' onClick={() => handleAdd("Por ver")}>
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Agregar a "Por ver"</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='content'>
        <div className='description'>
          <p>{detail.overview}</p>
        </div>
      </div>


      {trailer && (
        <button className="button white" style={{width:'20rem', margin:'2rem 2rem 1rem', display:'flex', justifyContent:'center', alignItems:'center', gap:'1rem'}} onClick={openTrailerPopup}>
          <FontAwesomeIcon icon={faPlay} />
          <span>Ver Trailer</span>
        </button>
      )}
      {showTrailerPopup && trailer && (
        <div className="trailer-popup-overlay">
          <div className="trailer-popup">
            <div className="trailer-popup-header">
              <button className="close-button" onClick={closeTrailerPopup}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="trailer-popup-content">
            <div className="trailer-video">
              <iframe
                className="trailer-iframe"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`} // Agregar autoplay=1 al URL
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            </div>
          </div>
        </div>
      )}

      <div className='additional shared-container'>
        <div className='additional-titles'>
          {similarItemsResults && (
            <div className={`additional-title ${showSimilar ? 'active' : ''}`} onClick={handleToggleSimilar}>
              <h3>Quizás También Te Guste</h3>
            </div>
            )
          }
          <div className={`additional-title ${showInformation ? 'active' : ''}`} onClick={handleToggleInformation}>
            <h3>Información</h3>
          </div>
        </div>

        {showSimilar && (
          <>
            {loadingSimilar || !similarItemsResults && !similarItemsResults.length > 0 ? (
              <Loader />
            ) : (
              <div className="similar-items" style={{margin:'2rem 0'}}>
                <Swiper {...settings}>
                  {similarItemsResults.filter(x => x.poster_path).map((item) => (
                    <SwiperSlide key={item.id}>
                      <Link to={`/detail/${type}/${item.id}`}>
                        <img
                          width={180}
                          height={250}
                          src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                          alt={item.title || item.name}
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </>
        )}

        {showInformation && (
          <div className='information'>
            {loadingCredits ? (
              <Loader />
            ) : (
              <>
                {credits.cast.length > 0 && (
                  <p className='item'>
                    <strong>Protagonizado por:</strong> {credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}
                  </p>
                )}
                {credits.crew.find(person => person.job === 'Director')?.name && (
                  <p className='item'>
                    <strong>Director:</strong> {credits.crew.find(person => person.job === 'Director')?.name}
                  </p>
                )}
                {(detail.release_date || detail.first_air_date) && (
                  <p className='item'>
                    <strong>Fecha de Estreno:</strong> {detail.release_date || detail.first_air_date}
                  </p>
                )}
                {detail.runtime && (
                  <p className='item'>
                    <strong>Duración:</strong> {detail.runtime} minutos
                  </p>
                )}
                {detail.genres.length > 0 && (
                  <p className='item'>
                    <strong>Géneros:</strong> {detail.genres.map(genre => genre.name).join(', ')}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;

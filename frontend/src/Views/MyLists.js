import React, { useState, useEffect } from 'react';
import ListCatalogItem from '../components/Catalog/ListCatalogItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useLists } from '../Context/ListsContext';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

function MyLists(){
  const { toWatchList, favoritesList, viewedList} = useLists();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const settings = {
        modules: [Navigation, Pagination, Scrollbar, A11y],
        spaceBetween: 20,
        slidesPerView: 2,
        navigation: true,
        scrollbar:false,
        breakpoints: {
          768: {
            slidesPerView: 6,
          }
        },
      };

    useEffect(() => {
      if (!isAuthenticated) {
          navigate('/'); // Redirige a la página de inicio si el usuario ya está autenticado
      }
    }, [isAuthenticated, navigate]);
    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
if(toWatchList.length == 0 && favoritesList.length == 0 && viewedList.length == 0){
  return(
    <>
    <div className="catalog-section shared-container">
      
      <h1 style={{fontWeight: 600, fontSize: "4rem", margin: "3rem 0", textAlign:'center'}}>No tienes contenido agregado a tus listas</h1>
      <div className='back' style={{textAlign:'center'}}> 
        <Link to={'/'}>
          <FontAwesomeIcon icon={faChevronCircleLeft} /> Volver al catálogo de películas y series
        </Link>
      </div>
    </div>
    </>
  )
}

    return(
    <div className="catalog-section shared-container">
      
      <h1 style={{fontWeight: 600, fontSize: "4rem", margin: "3rem 0"}}>Mis listas</h1>

      {favoritesList.length > 0 && (
        <ul className='catalog-item'>
          <h4>Tus favoritos</h4>
            <Swiper {...settings}>
            {favoritesList.map((item) => (
                <SwiperSlide key={item.listItemId}>
                  <ListCatalogItem item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
        </ul>

      )}
  
      {viewedList.length > 0 && (
        <ul className='catalog-item'>
          <h4>Para volver a ver</h4>
          <Swiper {...settings}>
          {viewedList.map((item) => (
              <SwiperSlide key={item.listItemId}>
                <ListCatalogItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
      </ul>

      )}
  
      {toWatchList.length > 0 && (
        <ul className='catalog-item'>
        <h4>Por ver</h4>
          <Swiper {...settings}>
          {toWatchList.map((item) => (
              <SwiperSlide key={item.listItemId}>
                <ListCatalogItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      )}

      </div>
    );
}

export default MyLists;

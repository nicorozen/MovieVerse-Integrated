import React, { useState, useEffect } from 'react';
import CatalogItem from './CatalogItem';
import GenreList from './GenreList';
import { useLists } from '../../Context/ListsContext';
import ListCatalogItem from './ListCatalogItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import MovieItem from './MovieItem';
import Loader from '../Layout/Loader';
import useFetch from '../../Helpers/useFetch';

function Catalog({ contentType }) {
  const { toWatchList, favoritesList, viewedList } = useLists();
  // const [loading, setLoading] = useState(false);

  const endpoint = contentType === 'series' ? 'tv' : 'movie';
  
  const { data: genresData, loading: genresLoading, error: genresError } = useFetch(`/genre/${endpoint}/list`);
  const { data: upcomingData, loading: upcomingLoading, error: upcomingError } = useFetch(contentType !== 'series' ? `/${endpoint}/upcoming` : null, { page: 1 });
  const { data: topRatedData, loading: topRatedLoading, error: topRatedError } = useFetch(`/${endpoint}/top_rated`, {"sort_by": "vote_count.desc"});
  const { data: nowPlayingData, loading: nowPlayingLoading, error: nowPlayingError } = useFetch(contentType !== 'series' ? `/movie/now_playing` : null, { page: 2 });
  const { data: trendingData, loading: trendingLoading, error: trendingError } = useFetch(`/trending/${endpoint}/day`, {"sort_by": "vote_count.desc"});
  const { data: onTheAirData, loading: onTheAirLoading, error: onTheAirError } = useFetch(contentType !== 'movies' ? `/tv/on_the_air` : null, { page: 1 });
  
  if (genresLoading || upcomingLoading || topRatedLoading || trendingLoading || nowPlayingLoading || onTheAirLoading ) {
    return <Loader />;
  }

  const genres = genresData?.genres || [];
  const upcomingList = upcomingData?.results || [];
  const topRatedList = topRatedData?.results || [];
  const nowPlayingList = nowPlayingData?.results || [];
  const trendingList = trendingData?.results || [];
  const onTheAirList = onTheAirData?.results || [];

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

    return (
      <>
        <div className="catalog-section shared-container">
          {favoritesList.length > 0 && (
            <ul className="catalog-item">
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
            <ul className="catalog-item">
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
            <ul className="catalog-item">
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
          {upcomingList.length > 0 && (
            <ul className="catalog-item">
              <h4>Próximamente</h4>
              <Swiper {...settings}>
                {upcomingList.map((item) => (
                  <SwiperSlide key={item.id}>
                    <ListCatalogItem item={item} contentType={contentType} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </ul>
          )}
          {nowPlayingList.length > 0 && (
            <ul className="catalog-item">
              <h4>En cartelera</h4>
              <Swiper {...settings}>
                {nowPlayingList.map((item) => (
                  <SwiperSlide key={item.id}>
                    <ListCatalogItem item={item} contentType={contentType} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </ul>
          )}
          {topRatedList.length > 0 && (
            <ul className="catalog-item">
              <h4>Aclamados por la crítica</h4>
              <Swiper {...settings}>
                {topRatedList.map((item) => (
                  <SwiperSlide key={item.id}>
                    <ListCatalogItem item={item} contentType={contentType}  />
                  </SwiperSlide>
                ))}
              </Swiper>
            </ul>
          )}
          {trendingList.length > 0 && (
            <ul className="catalog-item">
              <h4>Tendencias</h4>
              <Swiper {...settings}>
                {trendingList.map((item) => (
                  <SwiperSlide key={item.id}>
                    <ListCatalogItem item={item} contentType={contentType}/>
                  </SwiperSlide>
                ))}
              </Swiper>
            </ul>
          )}
          {onTheAirList.length > 0 && (
            <ul className="catalog-item">
              <h4>En emisión</h4>
              <Swiper {...settings}>
                {onTheAirList.map((item) => (
                  <SwiperSlide key={item.id}>
                    <ListCatalogItem item={item} contentType={contentType} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </ul>
          )}
          <GenreList genres={genres} contentType={contentType} />
          
          {/* <ul>
            {selectedGenreId > 0 ? (
              <CatalogItem key={selectedGenreId} contentType={contentType} genres={genres} genre={null} selectedGenreId={selectedGenreId} />
            ) : (
              genres.map((genre) => (
                <CatalogItem key={genre.id} contentType={contentType} genre={genre} selectedGenreId={0} />
              ))
            )}
          </ul> */}
        </div>
      </>
    );
}

export default Catalog;

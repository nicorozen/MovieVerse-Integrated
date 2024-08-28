import React, { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import Catalog from '../components/Catalog/Catalog';
import MovieItem from '../components/Catalog/MovieItem';
import Loader from '../components/Layout/Loader';

function Search(){
    const { term } = useParams();
    const [searchedList, setSearchedList] = useState([]);
    const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4f5f43495afcc67e9553f6c684a82f84&language=es-ES&query=${term}`);
        const movieData = await movieResponse.json();
        
        const tvResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=4f5f43495afcc67e9553f6c684a82f84&language=es-ES&query=${term}`);
        const tvData = await tvResponse.json();
        
        const combinedResults = [
          ...movieData.results.map((movie) => ({ ...movie, type: 'movie' })),
          ...tvData.results.map((tvShow) => ({ ...tvShow, type: 'series' }))
        ];
        combinedResults.sort((a, b) => b.vote_count - a.vote_count);
        setSearchedList(combinedResults);
        setLoading(false);
  
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };

    if(term){
      fetchSearchResults();
    }
  }, [term]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  if(loading){
    return <Loader></Loader>
  }

    return(
        <>
        <div className="catalog-section shared-container">
          {searchedList.length > 0 ? (
            <>
              <h1 style={{ fontWeight: 600, fontSize: '4rem', margin: '3rem 0' }}>Resultados para "{term}"</h1>
              <div className="movie-list">
                {searchedList.filter((movie) => movie.poster_path).map((movie) => (
                  <MovieItem key={movie.id} item={movie} contentType={movie.type === 'movie' ? 'movie' : 'series'}/>
                ))}
              </div>
            </>
          ) : (
            <h1 style={{ fontWeight: 600, fontSize: '4rem', margin: '3rem 0' }}>Sin resultados para "{term}"</h1>
          )}
        </div>
      </>
    );
}

export default Search;
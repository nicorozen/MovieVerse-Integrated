import React, { useState, useEffect } from 'react';
import useFetch from '../Helpers/useFetch';
import { useParams } from 'react-router-dom';
import CatalogItem from '../components/Catalog/CatalogItem';
import Loader from '../components/Layout/Loader';

function Category() {
  const { type, genreId } = useParams(); 
  
  const endpoint = type === 'series' ? 'tv' : 'movie';

  const { data: genresData, loading: genresLoading, error: genresError } = useFetch(`/genre/${endpoint}/list`);
  const genres = genresData?.genres || [];
  
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    if (genres.length > 0 && genreId) {
      const foundGenre = genres.find(genre => String(genre.id) === genreId);
      setSelectedGenre(foundGenre || null);
    } else {
      setSelectedGenre(null);
    }
  }, [genres, genreId, type]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  if (genresLoading) {
    return <Loader />;
  }

  return (
    <div className="catalog-section shared-container">
      <ul>
        {genreId === '0' ? (
          genres.map((genre) => (
            <CatalogItem key={genre.id} contentType={type} selectedGenre={genre} viewAllGenres={true}/>
          ))
        ) : (
          selectedGenre ? (
            <CatalogItem key={genreId} contentType={type} selectedGenre={selectedGenre} />
          ) : (
            <p style={{textAlign:'center', margin:'auto', fontSize:'2.4rem'}}>No se encontró el género</p>
          )
        )}
      </ul>
    </div>
  );
}

export default Category;

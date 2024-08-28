import React from 'react';
import '../styles/modules/home/home.css';
import TopMovies from '../components/Catalog/TopMovies';
import Catalog from '../components/Catalog/Catalog';
import TopTenCatalog from '../components/Catalog/TopTenCatalog';
import '../styles/components/movies.css';

function Series() {
 return (
    <>
        <TopMovies contentType={"series"}/>
        <TopTenCatalog contentType={"series"}/>
        <Catalog contentType="series" />
    </>
 );
}

export default Series;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext.js'; 
import '../styles/modules/home/home.css';
import CategoriesSection from '../components/Home/CategoriesSection.js';
import OutstandingsSection from '../components/Home/OutstandingsSection.js';
import Logo from '../components/Layout/Logo.js';
import Information from '../components/Home/Information';
import TopMovies from '../components/Catalog/TopMovies';
import Catalog from '../components/Catalog/Catalog';
import TopTenCatalog from '../components/Catalog/TopTenCatalog';
import '../styles/components/movies.css';
import Loader from '../components/Layout/Loader.js';
import { Link } from 'react-router-dom';

function Home() {
 const { isAuthenticated } = useAuth();

 const [isLoading, setIsLoading] = useState(true); 

 useEffect(() => {
   setTimeout(() => {
     setIsLoading(false);
   }, 2000);
 }, []);

 if (isLoading) {
   return <Loader />;  
 }


 return (
    <>
      {!isAuthenticated && (
        <>
          <div className="main-banner" style={{ backgroundImage: 'url("/images/home/Bienvenidos.png")' }}></div>
          <div className='home-login-section'>
            <h4>Explorá las mejores series y peliculas en un solo lugar</h4>
            <p>Iniciá sesión o creá tu cuenta y sumergite en el mundo del cine</p>
            <Link to={"/login"}>
              <button className="button white">Ingresar a <Logo></Logo></button>
            </Link>
          </div>
          
          <Information />
          <OutstandingsSection span="Mucho más" title="De Tus Favoritos" floatImage="./images/home/tbbt_characters.jpg" background="./images/home/tbbt_module_background.jpg" />
          <CategoriesSection />
          <OutstandingsSection span="Mucho más" title="Para Ver y Descubrir" floatImage="./images/home/feature-harry-potter-char.jpg" background="./images/home/feature-harry-potter-bg.jpg" />
        </>
         )}
      {isAuthenticated && (
        <>
          <TopMovies />
          <TopTenCatalog />
          <Catalog />
        </>
      )}
    </>
 );
}

export default Home;

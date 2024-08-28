import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus, faEye, faInfo, faTimes, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useLists } from '../../Context/ListsContext';
import { useAuth } from '../../Context/AuthContext'; 

function MovieItem({item, contentType}){
  const { toWatchList, favoritesList, viewedList, add, remove } = useLists();
  const { isAuthenticated } = useAuth();


  let type = 'movie';
  if(item.contentType){
    type = item.contentType;
  }
  else if(contentType){
    type = contentType === 'series' ? 'tv' : 'movie';
  }

  let image = item.image || item.poster_path;
  let itemId = item.id || item.movieId
  const isFavorite = favoritesList.some(favorite => favorite.movieId === itemId);
  const isToWatch = toWatchList.some(toWatch => toWatch.movieId === itemId);
  const isViewed = viewedList.some(viewed => viewed.movieId === itemId);
  const [isActionsHidden, setIsActionsHidden] = useState(true);

  const toggleShowListsOptions = () => {
    setIsActionsHidden(!isActionsHidden); 
  };

  const handleAdd = (list, movie) => {
    
    const itemDetails = {
      listType: list,
      movieId: itemId,
      contentType: type,
      image: image
    };

    add(itemDetails);
  };
  const handleRemove = (listType, movie) => {
  
    let list = null
    if(listType == 'Favoritas'){
      list = favoritesList;
    }
    else if(listType == 'Por ver'){
      list = toWatchList;
    }
    else{
      list = viewedList;
    }

    const item = list.find(item => item.movieId === itemId);
    let listItemId = null;
    if (item) {
      listItemId = item.listItemId;
    }

    const itemDetails = {
      listItemId: listItemId,
      listType: list  
    }

    remove(itemDetails)
  };

    return(
    <>
    <div className='movie-item'>
      <Link to={`/detail/${type}/${itemId}`}>
      <img
        width={180}
        height={250}
        src={`https://image.tmdb.org/t/p/w300${image}`}
        alt={item.title}
      />
      </Link>
      
      {isAuthenticated && (
        <>
          <div className='options' onClick={() => { toggleShowListsOptions() }}>
            <span>-</span>
            <span>-</span>
            <span>-</span>
          </div>
        
          <div className= {isActionsHidden ? 'actions hidden' : 'actions'}>
          <div className='close' onClick={toggleShowListsOptions}><FontAwesomeIcon icon={faTimes}/></div>
          <div className='item'>
            {isFavorite? (
              <>
              <div className='icon'>
                <FontAwesomeIcon icon={faHeart} />
              </div>
                <button onClick={() => handleRemove("Favoritas", item)}>Quitar de "Favoritos"</button>
              </>
            ) : (
              <>
              <div className='icon'>
                <FontAwesomeIcon icon={faHeart} />
              </div>
                <button onClick={() => handleAdd("Favoritas", item)}>Agregar a "Favoritos"</button>
              </>
                )}
          </div>
          <div className='item'>
            {isToWatch? (
              <>
              <div className='icon'>
                <FontAwesomeIcon icon={faPlus} />
              </div>
                <button onClick={() => handleRemove("Por ver", item)}>Quitar de "Por ver"</button>
              </>
            ) : (
              <>
              <div className='icon'>
                <FontAwesomeIcon icon={faPlus} />
              </div>
                <button onClick={() => handleAdd("Por ver", item)}>Agregar a "Por ver"</button>
              </>
            )}
          </div>
          <div className='item'>
            {isViewed? (
              <>
                <div className='icon'>
                  <FontAwesomeIcon icon={faEye} />
                </div>
                <button onClick={() => handleRemove("Vistas", item)}>Quitar de "Vistos"</button>
              </>
            ) : (
              <>
                <div className='icon'>
                  <FontAwesomeIcon icon={faEye} />
                </div>
                <button onClick={() => handleAdd("Vistas", item)}>Agregar a "Vistos"</button>
              </>
            )}
          </div>
          <div className='item'>
            <div className='icon'>
              <FontAwesomeIcon icon={faInfo} />
            </div>
            <Link to={`/detail/${type}/${itemId}`}>Más información</Link>
          </div>
        </div>
        </>
        )}
        
    </div>

    </>
    );

  }
  
  export default MovieItem;
  
  
  
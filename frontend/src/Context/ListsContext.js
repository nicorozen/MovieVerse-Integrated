import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';

export const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [toWatchList, setToWatchList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [viewedList, setViewedList] = useState([]);
  const { isAuthenticated, user } = useAuth();

  const fetchUserLists = async () => {
    try {
      let token = sessionStorage.getItem("access-token");

      if(token){
        const response = await getUserLists(token);
        if (response.success) {
          let lists = response.lists;
  
          if(lists.length > 0){
            setToWatchList(lists.filter(list => list.listType === 'Por ver')[0]?.items || []);
            setFavoritesList(lists.filter(list => list.listType === 'Favoritas')[0]?.items || []);
            setViewedList(lists.filter(list => list.listType === 'Vistas')[0]?.items || []);
          }
          else{
            resetLists();
          }
          
        }
      }
      
    } catch (error) {
      console.error('Error fetching user lists:', error);
    }
  };

  useEffect(() => {
    fetchUserLists();
  }, [favoritesList, toWatchList, viewedList, isAuthenticated, user]);

  const resetLists = () => {
    setToWatchList([]);
    setFavoritesList([]);
    setViewedList([]);
  };


  const getUserLists = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      mode:'cors'
    };

    try{
      let response = await fetch("http://localhost:3000/api/lists/", requestOptions);
      let jsonData = await response.json();
      return jsonData;
    }
    catch(error){
      console.error('Error:', error);
      toast('Error de red. Por favor, intenta nuevamente más tarde.', {
        type: 'error',
        theme: 'colored',
        hideProgressBar: true,
      });
    }
  }

  const addListItem = async (itemDetails) => {
    let token = sessionStorage.getItem("access-token");
    const { listType, movieId, contentType, image } = itemDetails;
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt", token);
  
    var raw = JSON.stringify({
      listType: listType,
      movieId: movieId,
      contentType: contentType,
      image: image
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      mode: 'cors'
    };
  
    try{
      let response = await fetch("http://localhost:3000/api/lists/addItem", requestOptions);
      let jsonData = await response.json();
      
      if(response.ok){
        return jsonData;
      }
      else if (response.status === 400) {
        toast(jsonData.message, {
          type: 'error',
          theme: 'colored',
          hideProgressBar: true,
        });
      } else {
        toast('Error al agregar a la lista: ' + jsonData.message, {
          type: 'error',
          theme: 'colored',
          hideProgressBar: true,
        });
      } 

      return response;
    }
    catch(error){
      console.error('Error:', error);
      toast('Error de red. Por favor, intenta nuevamente más tarde.', {
        type: 'error',
        theme: 'colored',
        hideProgressBar: true,
      });
    }

  };

  const removeListItem = async (listItemId) => {
    let token = sessionStorage.getItem("access-token");
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt", token);
  
    var raw = JSON.stringify({
      listItemId: listItemId
    });
  
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      mode: 'cors'
    };
  
    try{
      let response = await fetch("http://localhost:3000/api/lists/removeItem", requestOptions);
      let jsonData = await response.json();
      
      if(response.ok){
        return jsonData;
      }
      else if (response.status === 400) {
        toast(jsonData.message, {
          type: 'error',
          theme: 'colored',
          hideProgressBar: true,
        });
      } else {
        toast('Error al eliminar de la lista: ' + jsonData.message, {
          type: 'error',
          theme: 'colored',
          hideProgressBar: true,
        });
      } 

      return jsonData;
    }
    catch(error){
      console.error('Error:', error);
      toast('Error de red. Por favor, intenta nuevamente más tarde.', {
        type: 'error',
        theme: 'colored',
        hideProgressBar: true,
      });
    }

  };

  const add = async (itemDetails) => {
    try {
      const response = await addListItem(itemDetails);
      if (response.data) {
        const newItem = response.data;
        if (itemDetails.listType === 'Favoritas') {
          setFavoritesList([...favoritesList, newItem]);
        } else if (itemDetails.listType === 'Por ver') {
          setToWatchList([...toWatchList, newItem]);
        } else {
          setViewedList([...viewedList, newItem]);
        }
        toast('El elemento se agregó a la lista.', {
          type: 'success',
          theme: 'colored',
          hideProgressBar: false,
        });
      }
      
    } catch (error) {
      console.error('Error adding list item:', error);
      toast('Error al agregar el producto a la lista', {
        type: 'error',
        theme: 'colored',
        hideProgressBar: true,
      });
    }
  };

  const remove = async (itemDetails) => {
    try {
      const response = await removeListItem(itemDetails.listItemId);
      if (response.success) {
        if (itemDetails.listType === 'Favoritas') {
          setFavoritesList(favoritesList.filter(m => m.listItemId !== itemDetails.listItemId));
        } else if (itemDetails.listType === 'Por ver') {
          setToWatchList(toWatchList.filter(m => m.listItemId !== itemDetails.listItemId));
        } else {
          setViewedList(viewedList.filter(m => m.listItemId !== itemDetails.listItemId));
        }
        toast('El elemento se eliminó a la lista.', {
          type: 'error',
          theme: 'colored',
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error('Error removing list item:', error);
      toast('Error al eliminar el producto de la lista', {
        type: 'error',
        theme: 'colored',
        hideProgressBar: true,
      });
    }
  };

  const getListItemId = (list, movie) => {
    const item = list.find(item => item.movieId === movie.id);
    if (item) {
      return item.listItemId;
    }
  };
  
  
  return (
    <ListsContext.Provider value={{ favoritesList, toWatchList, viewedList, add, remove, getListItemId, resetLists }}>
      {children}
    </ListsContext.Provider>
  );
};

export const useLists = () => useContext(ListsContext);

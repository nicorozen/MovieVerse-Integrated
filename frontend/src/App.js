import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext'; 
import { ToastContainer } from 'react-toastify';
import Home from './Views/Home.js';
import Loader from './components/Layout/Loader.js'; 
import Layout from './Layout/Layout.js'
import './styles/components/loading.css';
import './styles/App.css';
import './styles/components/components.css';
import './styles/modules/login/login.css';
import './styles/components/popup.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Views/Login';
import Register from './Views/Register';
import MyAccount from './Views/MyAccount';
import MyLists from './Views/MyLists.js'
import Series from './Views/Series.js';
import Movies from './Views/Movies.js';
import Detail from './Views/Detail.js';
import Category from './Views/Category.js';
import Search from './Views/Search.js'
import { ListsProvider } from './Context/ListsContext.js';

function App() {
  const [isLoading, setIsLoading] = useState(true);  // Estado para el loader

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loader />;  
  }

  return (
    <Router>
      <AuthProvider>
        <ListsProvider>
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/myaccount" element={<MyAccount />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/:type/category/:genreId" element={<Category />} />
              <Route path="/search/:term" element={<Search />} />
              <Route path="/detail/:type/:id" element={<Detail/>} />
              <Route path="/mylists" element={<MyLists />} />
            </Route>
          </Routes>
        </ListsProvider>
      </AuthProvider>
    </Router>

);
}

export default App;

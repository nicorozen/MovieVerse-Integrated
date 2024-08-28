import '../../styles/App.css';
import Logo from './Logo';
import MenuItem from './MenuItem';
import { useAuth } from '../../Context/AuthContext'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faTimes, faSignOutAlt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [showUserActions, setShowUserActions] = useState(false);
  const [showSearchArea, setShowSearchArea] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const handleUserClick = () => {
    setShowUserActions(!showUserActions);
  };

  const toggleSearch = () => {
    setSearchTerm(''); // Limpiar el término de búsqueda al abrir el área de búsqueda
    setShowSearchArea(!showSearchArea);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSearchArea(!showSearchArea);
    navigate(`/search/${searchTerm}`);
  };

  const isActive = (path) => {
    if (location.pathname === '/' && path === 'home') {
      return 'active';
    }
    return location.pathname.includes(path) ? 'active' : '';
  };

  return (
    <>
      <div className='header-wrapper'>
        <div className='header'>
          <div className='logo-wrapper'>
            <Link to={'/'}>
              <Logo />
            </Link>
          </div>
          <div className='categories'>
            <Link to={'/'} className={`item ${isActive('home')} inicio`}>
              <MenuItem name="Inicio" />
            </Link>
            <Link to={'/movies'} className={`item ${isActive('movies') || isActive('movie')}`}>
              <MenuItem name="Películas" />
            </Link>
            <Link to={'/series'} className={`item ${isActive('series') || isActive('tv')}`}>
              <MenuItem name="Series" />
            </Link>
            {isAuthenticated && (
              <Link to={'/mylists'} className={`item ${isActive('mylists')}`}>
                <MenuItem name="Mis listas" />
              </Link>
            )}
          </div>
          <div className='actions'>
            <div className='item' onClick={toggleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className='item user' onClick={handleUserClick}>
              <FontAwesomeIcon icon={faUser} />
              {!showUserActions ? (
                <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '10px', marginLeft: '.5rem' }} />
              ) : (
                <>
                  <FontAwesomeIcon icon={faChevronUp} style={{ fontSize: '10px', marginLeft: '.5rem' }} />
                  <div className='user-actions'>
                    {isAuthenticated ? (
                      <>
                        <div className='action'>
                          <Link to="/myaccount">Mi cuenta</Link>
                        </div>
                        <div className='action'>
                          <a onClick={handleLogout}>Cerrar sesión</a>
                          <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '10px', marginLeft: '.5rem' }} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className='action'>
                          <Link to="/login">Ingresar</Link>
                        </div>
                        <div className='action'>
                          <Link to="/register">Registrarme</Link>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSearchArea && (
        <div className='search-area'>
          <div className='close'>
            <FontAwesomeIcon icon={faTimes} onClick={toggleSearch} />
          </div>

          <form className='search-area-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                placeholder="Busca tus películas y series preferidas"
                className='search-area-input'
                autoComplete="off"
                value={searchTerm} // Mostrar el término de búsqueda actual
                onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda al escribir
              />
              <button type="submit" className='search-area-button'>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Header;

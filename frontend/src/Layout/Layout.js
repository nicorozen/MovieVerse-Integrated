import { Outlet, Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Logo from '../components/Layout/Logo';
import { useAuth } from '../Context/AuthContext';
const Layout = () => {
  
  const {  isAuthenticated } = useAuth();
    return (
        <>
        <Header/>
        <main>
          <Outlet />
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <div>© <Link to="/"><Logo/></Link></div>
          <div className='links'>
            {
              !isAuthenticated ? (
              <>
                <Link to="/login" className=''>Ingresar</Link>
                <Link to="/login" className=''>Registrarse</Link>
              </>
              ) :
              <>
                <Link to="/movies" className=''>Peliculas</Link>
                <Link to="/series" className=''>Series</Link>
                <Link to="/mylists" className=''>Mis listas</Link>
              </>
            }
            
          </div>
        </footer>

        </>
    );
}

export default Layout;
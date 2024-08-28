import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Layout/Loader';

const Register = () => {
  const { register, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Simula la carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
 
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirige a la página de inicio si el usuario ya está autenticado
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    register(username, email, password);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
 
  if (isLoading) {
    return <Loader />;  
  }

  return (
    <>
    <div className='back'> 
        <Link to={'/'}>
          <FontAwesomeIcon icon={faChevronCircleLeft} /> Volver
        </Link>
        </div>
        <div className='login-content'>
          <div className='login-section'>
          <h1 className='login-heading'>Registrarme</h1>
          <form className='login-form' onSubmit={handleSubmit}>
          
          <div className='input-group'>
            <label htmlFor="username" className='login-label'>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='login-input'
              required
            />
          </div>
          
          <div className='input-group'>
            <label htmlFor="username" className='login-label'>Nombre de usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='login-input'
              required
            />
          </div>
          
          <div className='input-group'>
            <label htmlFor="password" className='login-label'>Contraseña</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='login-input'
              required
            />
            
            <div style={{ color: 'white', position:'absolute',top:'4.5rem',right:'3rem', fontSize:'1.5rem'}} onClick={handleClickShowPassword}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </div>
          </div>

          <button className='button white' type="submit">Registrarme</button>
          </form>
          </div>
        </div>
    </>
    
  );
};

export default Register;

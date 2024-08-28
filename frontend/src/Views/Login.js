import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirige a la página de inicio si el usuario ya está autenticado
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await login(email, password);
    if(response)
      console.log("Guardo el token en sessionStorage");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (

    <>
    <div className='back'> 
    <Link to={'/'}>
      <FontAwesomeIcon icon={faChevronCircleLeft} /> Volver
    </Link>
    </div>
    <div className='login-content'>
      <div className='login-section'>
        <h1 className='login-heading'>Iniciar sesión</h1>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor="email" className='login-label'>Email</label>
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
              <label htmlFor="password" className='login-label'>Contraseña</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='login-input'
                required
                // onBlur={handleBlurPassword}
               />
               <div style={{ color: 'white', position:'absolute',top:'4.5rem',right:'3rem', fontSize:'1.5rem'}} onClick={handleClickShowPassword}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </div>
            </div>

          <button className='button white' type="submit" style={{ width: '15rem' }}>Ingresar</button>
        </form>
      </div>

      <div className='login-section'>
        <h4>¿No estás registrado?</h4>
        <p>Creá tu cuenta comenzá a disfrutar las mejores películas y series.</p>
        <Link to={'/register'} className='button white' type="submit" style={{ display:'block', textAlign: 'center', width: '15rem' }}>Registrarme</Link>
      </div>
    </div>
    </>
  );
};

export default Login;
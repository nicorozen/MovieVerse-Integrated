import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faEye, faEyeSlash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Layout/Loader';

const MyAccount = () => {
  const { isAuthenticated, getCurrentUser, updateUser } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    if (!isAuthenticated) {
        navigate('/'); 
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []); 

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try{
        const user = await getCurrentUser(); 
        setUsername(user.username);
        setEmail(user.email);
        setIsLoading(false);
      }
      catch{
        setIsLoading(false);
      }
    }

    window.scrollTo(0, 0);
    fetchUser();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(username); 
    } catch (error) {

    }
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
          <h1 className='login-heading'>Cuenta</h1>
          <form className='login-form' onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor="username" className='login-label'>Email</label>
            <input
              type="text"
              id="email"
              value={email}
              readOnly 
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
            <div style={{ color: 'white', position:'absolute',top:'4.5rem',right:'3rem', fontSize:'1.5rem'}} onClick={handleClickShowPassword}>
                  <FontAwesomeIcon icon={faPencilAlt} />
              </div>
          </div>
          {/* <div className='input-group'>
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
          </div> */}

          <button className='button white' type="submit">Guardar</button>
          </form>
          </div>
        </div>
    </>
    
  );
};

export default MyAccount;

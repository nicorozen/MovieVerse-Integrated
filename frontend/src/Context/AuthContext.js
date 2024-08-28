import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('access-token');

    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);


  const login = async (email, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "email": email,
      "password": password
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try{
      let response = await fetch("http://localhost:3000/api/users/login", requestOptions);
      let jsonData = await response.json();
      
      if(response.status === 200) {
        sessionStorage.setItem("access-token", jsonData.token);
        sessionStorage.setItem("userEmail", jsonData.email);
        setIsAuthenticated(true);
        navigate("/");

      } else {
        toast(jsonData.message, {
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
  }

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('access-token');
  };

  const getCurrentUser = async () => {
    let token = sessionStorage.getItem("access-token");
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt", token);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try{
      let response = await fetch("http://localhost:3000/api/users/getUser", requestOptions);
      let jsonData = await response.json();
      
      if(response.ok) {
        return jsonData;
      } 
      else if (response.status === 400) {
        toast(jsonData.message, {
          type: 'error',
          theme: 'colored',
          hideProgressBar: true,
        });
      } else {
        toast('Error al traer los datos del usuario: ' + jsonData.message, {
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
  }

  const register = async (username, email, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "email": email,
      "username": username,
      "password": password
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    try {
      let response = await fetch("http://localhost:3000/api/users/", requestOptions);
      let jsonData = await response.json();

      if (response.ok) {
        toast('Registro exitoso. Iniciando sesión...', {
          type: 'success',
          theme: 'colored',
          hideProgressBar: false,
        });
  
        await login(email, password);

      } else if (response.status === 400) {
        toast(jsonData.message, {
          type: 'error',
          theme: 'colored',
          hideProgressBar: true,
        });
      } else {
        toast('Error durante el registro: ' + jsonData.message, {
          type: 'error',
          theme: 'colored',
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast('Error de red. Por favor, intenta nuevamente más tarde.', {
        type: 'error',
        theme: 'colored',
        hideProgressBar: true,
      });
    }
  };

  const updateUser = async (username) => {
    let token = sessionStorage.getItem("access-token");
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt", token);
    
    var raw = JSON.stringify({
      "username": username,
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    try {
      let response = await fetch("http://localhost:3000/api/users/updateUser", requestOptions);
      let jsonData = await response.json();

      if (response.ok) {
        toast('Se guardaron los cambios.', {
          type: 'success',
          theme: 'colored',
          hideProgressBar: false,
        });

      } else if (response.status === 400) {
        toast(jsonData.message, {
          type: 'error',
          theme: 'colored',
          hideProgressBar: true,
        });
      } else {
        toast('Error al guardar los datos: ' + jsonData.message, {
          type: 'error',
          theme: 'colored',
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast('Error de red. Por favor, intenta nuevamente más tarde.', {
        type: 'error',
        theme: 'colored',
        hideProgressBar: true,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated,user ,login, logout, register, getCurrentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

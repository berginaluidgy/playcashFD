import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';
import { useNavigate } from 'react-router-dom';
import DOMAINBACKEND from '../GLOBALVAR/DOMAINBACKEND';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false); // État pour gérer l'animation du bouton
  const navigate = useNavigate();
const [errr,seterrr]=useState('')
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Activer l'animation de chargement
    try {
      const response = await axios.post(DOMAINBACKEND + '/api/token/', {
        username,
        password,
      });
      setToken(response.data.access);
      localStorage.setItem('token', response.data.access);
      alert('Connexion réussie !');
      navigate('/views');
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
     seterrr(error.response.data.detail)
    } finally {
      setLoading(false); // Désactiver l'animation de chargement
    }
  };

  return (
    <form onSubmit={handleLogin} id="form">
      <div id="divi1">
        <input
          id="input1"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div id="divi2">
        <input
          id="input2"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div id="divSub">
        <button id="inputSubmit" type="submit" disabled={loading}>
          {loading ? (
            <div className="loading-animation">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            'Se connecter'
          )}
        </button>
       
      </div>
 <div id="errr">
        <p>{errr}</p>
      </div>

      
    </form>
  );
}

export default Login;

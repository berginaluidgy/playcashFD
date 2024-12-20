import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';
import { useNavigate } from 'react-router-dom';
import DOMAINBACKEND from '../GLOBALVAR/DOMAINBACKEND';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // État pour l'animation de chargement
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Activer l'animation
    try {
      const response = await axios.post(DOMAINBACKEND + '/api/auth/register/', {
        username,
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem('token', response.data.access);
      alert('Inscription réussie !');
      navigate('/auth/auth/login');
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    } finally {
      setLoading(false); // Désactiver l'animation
    }
  };

  return (
    <form onSubmit={handleRegister} id="form">
      <div id="divi1">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div id="divi2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div id="divi2">
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div id="divSub">
        <button type="submit" disabled={loading}>
          {loading ? (
            <div className="loading-animation">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            "S'inscrire"
          )}
        </button>
      </div>
    </form>
  );
}

export default Register;

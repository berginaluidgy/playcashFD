

import React, { useEffect, useState } from 'react';
import './views.css';
import CardYoutubeViews from '../../subcomponent/cardYoutubeViews';
import axios from 'axios';
import DOMAINBACKEND from '../../GLOBALVAR/DOMAINBACKEND';
import Loader from '../../load/loadMain';

export default function Views() {
  const [data, setdata] = useState(null);

  // Récupérer le token du localStorage
  const token = localStorage.getItem("token");

  // Fonction pour décoder le token de manière sécurisée
  const decodeToken = (token) => {
    try {
      if (!token) {
        throw new Error("Token introuvable");
      }
      const payload = token.split(".")[1];
      if (!payload) {
        throw new Error("Token malformé");
      }
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error.message);
      return null;
    }
  };

  const decodedToken = decodeToken(token);
  const userId = decodedToken && decodedToken.user_id ? decodedToken.user_id : 11; // Valeur par défaut si user_id est introuvable

  console.log("User ID :", userId,DOMAINBACKEND+'/Views/'+userId);
  useEffect(() => { 

    axios
      .get(DOMAINBACKEND+'/Views/'+userId)
      .then(res => {
        console.log(res.data);
        setdata(res.data);
      })
      .catch(error => console.log(error));
  }, []);
        
  return (
    <div>
      {data == null ? (
        <Loader/>
      ) : (
        <div>
          {data.map((child) => (
           <div key={data.indexOf(child)}> <CardYoutubeViews  data={child} />
        </div> // Passer les données spécifiques de chaque enfant au composant CardYoutubeViews
             ))}
        </div>
      )}
    </div>
  );
}


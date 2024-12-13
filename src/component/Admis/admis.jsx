import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admis.css';  // Créez ce fichier CSS pour le style
import DOMAINBACKEND from '../GLOBALVAR/DOMAINBACKEND';


const Admins = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get(DOMAINBACKEND+"/admins/statistics/").then((response) => {
      
      setStats(response.data);
    console.log(stats)
    }).catch(error=>{console.log(error)});
  }, []);

  if (!stats) return <p>Chargement...</p>;

  return (
    <div>
      <div id="">
        <AddYouTubeLink/>
      </div>
      <h1>Tableau de bord administrateur</h1>
      <p>Nombre total d'utilisateurs : {stats.total_users}</p>
      <p>Utilisateurs actifs : {stats.active_users}</p>
      <p>Nombre de Vidéo Makers : {stats.video_makers_count}</p>
      <p>Utilisateurs ayant atteint 5000 gourdes : {stats.users_5000_gourdes}</p>
      <p>Nombre total de vidéos : {stats.total_videos}</p>
      <ul>
        {/* {stats.video_details.map((video) => (
          <li key={video.id}>
            {video.title} - {video.length} caractères - Auteur : {video.author}
          </li>
        ))} */}
      </ul>
      <p>Missions complétées : {stats.completed_missions_count}</p>
      <p>Personne ayant effectué le plus de missions : {stats.most_missions_user?.user__username || "N/A"}</p>
    </div>
  );
};



export default Admins;




const AddYouTubeLink = () => {
  const [link, setLink] = useState("");
  const [channelId, setChannelId] = useState("");

  const handleSubmit = (e) => {
    
    e.preventDefault();
    axios.post(DOMAINBACKEND+"/admin/add-youtube/", { youtube_link: link }).then((response) => {
      setChannelId(response.data.channel_id);
      console.log(response)
    }).catch((error) => {
      console.log(error)
       });
  };

  return (
    <div>
      <h2>Ajouter un lien YouTube</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Lien YouTube"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
      {channelId && <p>ID de la chaîne : {channelId}</p>}
    </div>
  );
};



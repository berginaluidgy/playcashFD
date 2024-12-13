import React from 'react'
import './mission.css'
import Header from '../header/header';
import axios from 'axios';
import Authconfirmator from '../Auth.confirmator';
import { useNavigate } from "react-router-dom";
import DOMAINBACKEND from '../GLOBALVAR/DOMAINBACKEND';
// Importation du fichier CSS pour les styles

const data = [
    {
        mission_name: "Monteur Novice",
        description: "Réalisez 60 vidéos simples pour gagner 25 000 gourdes.",
        total_videos: 60,
        cash_reward: 25000,  // HTG
        difficulty: "Facile"
    },
    {
        mission_name: "Monteur Confirmé",
        description: "Réalisez 85 vidéos intermédiaires avec des transitions basiques.",
        total_videos: 85,
        cash_reward: 35417,  // 85 * 416.67 HTG
        difficulty: "Intermédiaire"
    },
    {
        mission_name: "Monteur Avancé",
        description: "Accomplissez 110 montages vidéo avec des effets avancés.",
        total_videos: 110,
        cash_reward: 45833,  // 110 * 416.67 HTG
        difficulty: "Difficile"
    },
    {
        mission_name: "Expert en Montage",
        description: "Montez 135 vidéos complexes incluant des effets spéciaux.",
        total_videos: 135,
        cash_reward: 56250,  // 135 * 416.67 HTG
        difficulty: "Expert"
    },
    {
        mission_name: "Maître du Montage",
        description: "Réalisez 160 montages professionnels pour atteindre le sommet.",
        total_videos: 160,
        cash_reward: 66667,  // 160 * 416.67 HTG
        difficulty: "Maître"
    }
];

const MissionSelector = () => {
    const navigate = useNavigate();
    
 
    function push(mission_name,difficulty,total_videos,cash_reward){
        if(Authconfirmator()){

            const decodeToken = (token) => {
                const payload = token.split(".")[1];
                return JSON.parse(atob(payload));
            };
            
            const Token = localStorage.getItem("token");
            const decodedToken = decodeToken(Token);
            console.log(decodedToken.user_id)
            axios.post(DOMAINBACKEND+'/api/Mission',{
    userid: decodedToken.user_id,
    is_video_maker: true,
    mission_name:mission_name,
    description: difficulty,
    rewardMoney: cash_reward,
    total_videos:total_videos

})
.then(res=>{
    navigate("/Video");
})
.catch(error=>{
    console.log(error)
    navigate("/chooseMission");
})
           }

        
    }
    
    return (
        <div>
            
        <div className="mission-container">
            <h1 className="title">Choisissez votre mission</h1>
            <div className="missions">
                {data.map((mission, index) => (
                    <div key={index} className="mission-card" onClick={()=>{push(mission.mission_name,mission.difficulty,mission.total_videos,mission.cash_reward)}}>
                        <h2 className="mission-name">{mission.mission_name}</h2>
                        <p className="mission-description">{mission.description}</p>
                        <p className="mission-detail">📹 {mission.total_videos} vidéos</p>
                        <p className="mission-detail">💰 {mission.cash_reward} HTG</p>
                        <p className={`difficulty difficulty-${mission.difficulty.toLowerCase()}`}>{mission.difficulty}</p>
                    </div>
                ))}
            </div>
        </div></div>
    );
};

export default MissionSelector;

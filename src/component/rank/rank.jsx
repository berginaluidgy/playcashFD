import './rank.css'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../header/header';
import DOMAINBACKEND from '../GLOBALVAR/DOMAINBACKEND';
 

const RankedUserPage = () => {
    const [userPoints, setUserPoints] = useState([]);

    useEffect(() => {
        fetchUserPoints();
    }, []);

    const fetchUserPoints = async () => {
        try {
            const response = await axios.get(DOMAINBACKEND+"/api/user-points/");
            setUserPoints(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des points :", error);
        }
    };

    return (
        < div className="ranking-page" id="body">
           
            <h1 className="game-title">🏆 Top Players - Classement 🎮</h1>
            <div className="leaderboard">
                {userPoints.map((user, index) => (
                    <div key={index} className={`player-card rank-${index + 1}`}>
                        <span className="rank-number">#{index + 1}</span>
                        <span className="player-name">{user.username}</span>
                        <span className="player-points">{user.points} pts</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RankedUserPage;

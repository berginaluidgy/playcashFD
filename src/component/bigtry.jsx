import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

function ExternalLinkReward() {
  const [startTime, setStartTime] = useState(null);
  const [rewardMessage, setRewardMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // Fonction pour gérer le clic et surveiller le retour
  const handleExternalLink = (url, minTime) => {
    // Enregistrer le temps de départ
    setStartTime(Date.now());
    setRewardMessage(""); // Réinitialiser le message
    setShowConfetti(false); // Réinitialiser les confettis

    // Ouvrir le lien dans un nouvel onglet
    window.open(url, "_blank", "noopener,noreferrer");

    // Gérer le retour et comparer le temps
    const handleFocus = () => {
      const elapsedTime = (Date.now() - startTime) / 1000; // Temps en secondes
      if (elapsedTime >= minTime) {
        setRewardMessage("Félicitations ! Vous avez gagné une récompense 🎉");
        setShowConfetti(true);

        // Arrêter les confettis après 5 secondes
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      } else {
        setRewardMessage("Vous êtes resté hors du site moins de 3 minutes. Réessayez !");
      }

      setStartTime(null); // Réinitialiser le temps
      window.removeEventListener("focus", handleFocus); // Nettoyer l'événement
    };

    // Ajouter un gestionnaire pour surveiller le retour sur le site
    window.addEventListener("focus", handleFocus);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Test de temps hors site</h1>
      <button
        onClick={() => handleExternalLink("https://example.com", 180)} // Lien et temps (3 minutes)
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Visitez un site externe
      </button>

      {/* Affichage du message de récompense */}
      {rewardMessage && <p style={{ marginTop: "20px", fontWeight: "bold" }}>{rewardMessage}</p>}

      {/* Animation des confettis */}
      {showConfetti && <Confetti />}
    </div>
  );
}

export default ExternalLinkReward;

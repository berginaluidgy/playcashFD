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

  export default handleExternalLink
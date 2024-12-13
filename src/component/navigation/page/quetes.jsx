// import React from 'react'
// import Cardquest from '../../subcomponent/cardquest'
// export default function Quetes() {
//   return (
//     <div>

//       <Cardquest/>
//     </div>
//   )
// }

import React from 'react';
import Cardquest from '../../subcomponent/cardquest';

export default function Quetes() {
  // Liste des quêtes avec des informations dynamiques
  const quests = [
    { questTitle: 'S\'abonner à Telegram', reward: '10$', description: 'Abonnez-vous à notre canal Telegram' },
    { questTitle: 'S\'abonner à YouTube', reward: '5$', description: 'Abonnez-vous à notre chaîne YouTube' },
    { questTitle: 'Regarder 30 vidéos YouTube', reward: '20$', description: 'Regardez 30 vidéos sur notre chaîne YouTube' },
    { questTitle: 'Partager un article', reward: '15$', description: 'Partagez notre dernier article sur Facebook' },
    { questTitle: 'Suivre sur Instagram', reward: '10$', description: 'Suivez-nous sur Instagram' },
    { questTitle: 'Commenter sur YouTube', reward: '5$', description: 'Laissez un commentaire sur nos vidéos YouTube' },
    { questTitle: 'Participer à un sondage', reward: '25$', description: 'Répondez à notre sondage rapide' },
    { questTitle: 'Télécharger une application', reward: '10$', description: 'Téléchargez notre application mobile' },
    { questTitle: 'Acheter un produit', reward: '30$', description: 'Achetez un produit de notre boutique en ligne' },
    { questTitle: 'Partager un post', reward: '10$', description: 'Partagez un post sur vos réseaux sociaux' },
    { questTitle: 'Visionner une publicité', reward: '5$', description: 'Regardez une publicité sur notre site' },
    { questTitle: 'Écrire un avis', reward: '20$', description: 'Écrivez un avis sur notre produit' },

    { questTitle: 'Participer à un événement', reward: '50$', description: 'Assistez à notre événement en ligne' },
    { questTitle: 'Voter sur une plateforme', reward: '10$', description: 'Voter sur notre plateforme en ligne' },
    { questTitle: 'Faire un don', reward: '40$', description: 'Faites un don pour une bonne cause' },
    { questTitle: 'Tester un produit', reward: '30$', description: 'Testez un produit et donnez votre avis' },
    { questTitle: 'Recommander à un ami', reward: '20$', description: 'Recommandez notre service à un ami' },
    { questTitle: 'Écrire un article', reward: '50$', description: 'Écrivez un article sur notre blog' },
    { questTitle: 'Répondre à une enquête', reward: '15$', description: 'Répondez à une enquête rapide' },
  ];

  return (
    <div>
      {quests.map((quest, index) => (
        <Cardquest
          key={index}
          questTitle={quest.questTitle}
          reward={quest.reward}
          description={quest.description}
        />
      ))}
    </div>
  );
}

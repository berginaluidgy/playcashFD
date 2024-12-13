// import React from 'react'
// import './Cardquest.css'

// export default function Cardquest() {
//   return (
//     <div>

// <div id='cardsubs'>
//     <div id="headerC">
//            <div id="pro">
//             <div id="progressBig">
//             <div id="progressSUb"></div>
//         </div></div>
        
//     </div>

//     <div id="bodyC">
// <div id="indic">
//     <p id="">Regarder 30 videos Youtubes</p>
// </div>
//         <div id="subspart">
                  
//         <div id="x">
//         <div id="xa"><p>recompense</p></div>
//         <div id="xb" className='ipy'><p>20$</p></div>
//         </div>
       
//         </div>

//     </div>
// </div>


//     </div>
//   )
// }


import React from 'react';
import './Cardquest.css';

export default function Cardquest({ questTitle, reward, description }) {
  return (
    <div id='cardsubs'>
      <div id="headerC">
        <div id="pro">
          <div id="progressBig">
            <div id="progressSUb"></div>
          </div>
        </div>
      </div>

      <div id="bodyC">
        <div id="indic">
          <p>{description}</p>
        </div>
        <div id="subspart">
          <div id="x">
            <div id="xa"><p>Récompense</p></div>
            <div id="xb" className='ipy'><p>{reward}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

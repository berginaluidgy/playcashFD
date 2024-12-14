

import React, { useEffect, useState } from 'react';
import './views.css';
import CardYoutubeViews from '../../subcomponent/cardYoutubeViews';
import axios from 'axios';
import DOMAINBACKEND from '../../GLOBALVAR/DOMAINBACKEND';

export default function Views() {
  const [data, setdata] = useState(null);

  useEffect(() => { 
    axios
      .get(DOMAINBACKEND+'/Views')
      .then(res => {
        console.log(res.data);
        setdata(res.data);
      })
      .catch(error => console.log(error));
  }, []);
        
  return (
    <div>
      {data == null ? (
        <div>Patientez Un peu.....</div>
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


import React, { useEffect, useState } from 'react'
import './compte.css'
import acsHOMEINFO from '../access/acsHOMEINFO';



export default function Compte() {
  const [location, setLocation] = useState('Haiti'); // Valeur par défaut
  const [error, setError] = useState(null);

  useEffect(() => {
    // Vérifiez si la géolocalisation est disponible
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Vous pouvez utiliser une API de géocodage ici pour obtenir le nom du lieu
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setLocation(`Lat: ${latitude}, Lng: ${longitude}`); // Remplacez par un appel à une API si nécessaire
        },
        (err) => {
          console.error(err.message);
          setError('Impossible de récupérer la localisation.');
        }
      );
    } else {
      setError('La géolocalisation n\'est pas supportée par ce navigateur.');
    }
  }, []);
  const infos=acsHOMEINFO().firstdegree;
  
  // console.log(acsHOMEINFO().firstdegree.username,)
  const [datanew,setdatanew]=useState({})
  // console.log(acsHOMEINFO())
  const data=acsHOMEINFO()
 useEffect(()=>{
 if(data!=null){

    setdatanew(data)
    console.log(datanew)
  }
 },[data])
  const accountData = {
    nom:  datanew?.firstdegree?.username || '',
    // prenom: 'Bergi',
    numero: 'XXXXXXXXXX',
    localisation:location,
  };

  return (
    <div id="bigplev">
<div id="plev">
      <div id="a">
        <p>Nombre de video Vue</p>
        <p>-</p>
      </div>
      <div id="b">
      <p> Nombre de partage</p>
      <p>-</p>
      </div>
      <div id="c">
      <p>Votre revenu</p>
      <p>{datanew.firstdegree ? datanew.firstdegree.Money : '-'} HTG</p>

      </div>
      <div id="d"></div></div>
    <div id="acc">
      
      <div id="acc1">
        <div className="acc-item">
          <p className="acc-title">UserName</p>
          <p>{accountData.nom?accountData.nom:''}</p>
        </div>
        {/* <div className="acc-item">
          <p className="acc-title">Prénom</p>
          <p>{accountData.prenom}</p>
        </div> */}
        <div className="acc-item">
          <p className="acc-title">Numéro</p>
          <p>{accountData.numero}</p>
        </div>
        <div className="acc-item">
          <p className="acc-title">Localisation</p>
          <p>{accountData.localisation}</p>
        </div>
      </div>
    
    </div>
    <div id="shut"> < ShutDown/></div>
    
    </div>
  );
};





 function ShutDown() {
  return (
    <div id='shutdown'>

<i className="fa-solid fa-user-slash"></i>

    </div>
  )
}

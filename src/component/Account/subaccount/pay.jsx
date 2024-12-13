import React ,{useState,useEffect}from 'react'
import './pay.css';
import axios from 'axios';
import acsHOMEINFO from '../access/acsHOMEINFO';
import Authconfirmator from '../../Auth.confirmator';
import DOMAINBACKEND from '../../GLOBALVAR/DOMAINBACKEND';


export default function Pay() {
  
  const [islogg ,setislogg]=useState("S'authentifier")
  // États pour la gestion de l'utilisateur
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subC,setsubC] = useState(null);
  const [balance, setBalance] = useState(2000); // Solde actuel de l'utilisateur (en HTG)
  const [paymentRequested, setPaymentRequested] = useState(false);
  const infoo=acsHOMEINFO().firstdegree;
  const[message,setmessage]=useState('Votre demande de paiement a été envoyée. Un agent prendra contact avec vous pour la confirmation.')
 const SUBCDATA=acsHOMEINFO().all;
 console.log(SUBCDATA)
 useEffect(()=>{
  console.log(Authconfirmator())
  if (Authconfirmator() === true && infoo) {
    setislogg(infoo.Money + " HTG");
    setsubC(SUBCDATA)
  }
    else{
setislogg(("S'authentifier"))
}
},[Authconfirmator(),infoo,SUBCDATA])

  // Liste simulée des numéros enregistrés dans la base de données
  const registeredPhones = ['5617236224', '3729364568', '4393748574'];

  // Fonction pour vérifier si le numéro est enregistré
  const handlePhoneCheck = () => {
    if (registeredPhones.includes(phoneNumber)) {
      setIsPhoneRegistered(true);
    } else {
      setIsPhoneRegistered(false);
    }
  };

  // Fonction pour demander un paiement
  const handlePaymentRequest = () => {
    if (balance >= 1500) {
      setPaymentRequested(true);
      requestMoney()
      alert("Demande de paiement effectuée avec succès !");
    } else {
      alert("Votre solde est insuffisant. Vous devez avoir au moins 1500 HTG pour demander un paiement.");
    }
  };

  function requestMoney(){

  
    if(Authconfirmator()){
      const decodeToken = (token) => {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
  };
  
  const Token = localStorage.getItem("token");
  const decodedToken = decodeToken(Token);
  console.log(decodedToken);
  const Capture=decodedToken.user_id;
  console.log(Capture)
  axios.post(DOMAINBACKEND+'/RequestMoney',{
    'Userid':Capture  ,
    'phone':phoneNumber,
  })
  .then(res=>{
    console.log(res.data)
    
      setmessage(res.data.message)
    

  })
    }}

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2>Page de Paiement MyCash Digicel</h2>
    <div id="Seuil">
      <p>Le seuil de paiement est de :<strong>5000 HTG</strong></p>
    </div>
        {/* Vérification si le téléphone est enregistré
        {/* {!isPhoneRegistered ? ( */}
          <div className="phone-entry">
            <label htmlFor="phoneNumber">Entrez votre numéro de téléphone :</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Ex: 5611234567"
            />
            {/* <button onClick={handlePhoneCheck}>Vérifier</button> */}
          </div>
        {/* ) : (
          <div className="phone-registered">
            <p>Numéro de téléphone enregistré : {phoneNumber}</p>
          </div>
        )} */}

        {/* Affichage du solde */}
        <div className="balance-info">
          <p>Votre solde actuel : <strong>{islogg}</strong></p>
        </div>

        {/* Condition pour activer le paiement */}
        <div className="payment-action">
          {balance >= 1500 ? (
            <button onClick={handlePaymentRequest}>Demander un Paiement</button>
          ) : (
            <button disabled>Solde insuffisant</button>
          )}
        </div>

        {/* Message de confirmation du paiement */}
        {paymentRequested && (
          <div className="payment-status">
            <p>{message}</p>
          </div>
        )}
 <LIST list={subC}/>
oo
      </div>

     
    </div>
  );
};


function LIST({ list }) {
  console.log("Type de list :", typeof list, list);
  const [data, setdata] = useState([]);

  // Mettre à jour `data` lorsque `list` change
  useEffect(() => {
    if (Array.isArray(list)) {
      setdata(list);
    } else {
      setdata([]); // Valeur par défaut si `list` n'est pas un tableau
    }
  }, [list]);

  // Rendu
  if (!data.length) {
    return <div>Aucune donnée disponible</div>;
  }

  return (
    <div>
      {data.map((element) => (
        <div key={element.id} id="historique">
         <div id="cardHISTO">
          
          <div id="carddate">
            <p>Demande de retrait faite le :{element.date}</p>
          </div>
          { element.status=="succes"?(<div id="cardstatus">
            <p>Status: {element.status}</p>
          </div>):(<div id="cardstatusfail">
            <p>Status: {element.status}</p>
          </div>)
}
          
          </div> {/* Exemple d'affichage */}
        </div>
      ))}
    </div>
  );
}

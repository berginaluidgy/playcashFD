


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './vdeoscreator.css'
import { useNavigate } from "react-router-dom";
// import acsHOMEINFO from '../Account/access/acsHOMEINFO';
import Authconfirmator from '../Auth.confirmator';
import DOMAINBACKEND from '../GLOBALVAR/DOMAINBACKEND';

const API_URL = DOMAINBACKEND+'/videos/';

export default function VideoManager() {
    const [dt,setdt]=useState({})
    const [videos, setVideos] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [videoName, setVideoName] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [message, setMessage] = useState('');
    const [view, setview] = useState(<Param/>);

    useEffect(() => {
        fetchVideos();
    }, []);

    // Fonction pour lister les vidéos
    const fetchVideos = async () => {
        try {
            const response = await axios.get(API_URL);
            setVideos(response.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };
 
    // Fonction pour uploader une vidéo
    const uploadVideo = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('name', videoName);
        formData.append('description', videoDescription);
        formData.append('thumbnail_url', thumbnailUrl);
       
                const decodeToken = (token) => {
                const payload = token.split(".")[1];
                return JSON.parse(atob(payload));
            };


        const Token = localStorage.getItem("token");
        const decodedToken = decodeToken(Token);
        console.log(decodedToken);
        const Capture=decodedToken.user_id;
        formData.append('userId',Capture)
        try {
            const response = await axios.post(`${API_URL}upload/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage('Vidéo uploadée avec succès');
            fetchVideos(); // Refresh la liste des vidéos
        } catch (error) {
            console.error('Error uploading video:', error);
            setMessage('Erreur lors de l\'upload');
        }
    };

    // Fonction pour supprimer une vidéo
    const deleteVideo = async (id) => {
        try {
            await axios.delete(`${API_URL}delete/${id}/`);
            setMessage('Vidéo supprimée');
            fetchVideos(); // Refresh la liste des vidéos
        } catch (error) {
            console.error('Error deleting video:', error);
            setMessage('Erreur lors de la suppression');
        }
    }; 
//   function acsHOMEINFO() {
        
        useEffect(() => {
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
    
        axios.get(DOMAINBACKEND+'/ACCESS/'+Capture)
        .then(res=>{
            console.log(res.data.data)
           setdt(res.data.data)
        })
        .catch(
           error=>console.error(error)
           
        )
      
      }
      }, []);
    //   return
    // return(dt)
    // }


    useEffect(()=>{
        
    console.log(dt) 
    
    if(dt.firstdegree?.isvideoMaker){
    setview(<ParamISVIDEOMAKER/>)
}else{
    setview(<Param/>)

}},[dt])
        

    return (
        <div id='HeadVideoMaker'>
           
            <div id="param">{view}</div>
            <div style={styles.container}>
            <h1 style={styles.heading}>Gestionnaire de Vidéos</h1>
            <p style={styles.message}>{message}</p>

            <form style={styles.form} onSubmit={uploadVideo}>
                <input 
                    type="file" 
                    onChange={(e) => setVideoFile(e.target.files[0])} 
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Nom de la vidéo" 
                    value={videoName} 
                    onChange={(e) => setVideoName(e.target.value)} 
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={videoDescription} 
                    onChange={(e) => setVideoDescription(e.target.value)} 
                    style={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="URL de la miniature" 
                    value={thumbnailUrl} 
                    onChange={(e) => setThumbnailUrl(e.target.value)} 
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Uploader Vidéo</button>
            </form>

            <h2 style={styles.subheading}>Liste des Vidéos</h2>
            <div style={styles.videoList}>
                {videos.map(video => (
                    <div key={video.id} style={styles.videoCard}>
                        <h3>{video.name}</h3>
                        <p>{video.description}</p>
                        {video.thumbnail_url && <img src={video.thumbnail_url} alt={video.name} style={styles.thumbnail} />}
                        <button onClick={() => deleteVideo(video.id)} style={styles.deleteButton}>Supprimer</button>
                    </div>
                ))}
            </div>
        </div></div>
    );
}

// Styles
const styles = {
    container: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px',
        maxWidth: '600px',
        margin: 'auto',
        borderRadius: '8px',
    },
    heading: {
        fontSize: '24px',
        textAlign: 'center',
        marginBottom: '10px',
    },
    message: {
        color: '#4CAF50',
        textAlign: 'center',
        marginBottom: '10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px',
    },
    input: {
        padding: '8px',
        borderRadius: '4px',
        border: 'none',
        outline: 'none',
    },
    button: {
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    subheading: {
        fontSize: '20px',
        marginBottom: '10px',
    },
    videoList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    videoCard: {
        backgroundColor: '#444',
        padding: '10px',
        borderRadius: '6px',
    },
    thumbnail: {
        width: '100%',
        borderRadius: '4px',
        marginTop: '10px',
    },
    deleteButton: {
        marginTop: '10px',
        padding: '8px',
        backgroundColor: '#E57373',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};



 function Param() {

    const navigate = useNavigate();

    function goAheadMission(){
        navigate("/chooseMission");
    }

  return (
    <div id='paramchild'>
        <div id="firstVM"><div id="exclamation"><i class="fa-solid fa-exclamation"></i></div><p>Vous pouvez publier des videos mais vous ne serrez pas renumerer.</p></div>
        <div id="secondVM"  onClick={goAheadMission}><div id="signButton"><p>Devenir Video Maker</p></div></div>
    </div>
  )
}

function ParamISVIDEOMAKER(){
   
    return(

<div id='viewVideoMakerparam'>
<div id="stats"><i class="fa-solid fa-chart-simple"></i><p> Statistique</p></div>
<div id="close"><p id='1'>Mission </p><p id='close2'>98%</p></div>


</div>
    )
}
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

import { imageNames } from '../utils/imageList'


const sendData = async (data) => {


    let back = "https://b124-128-210-106-58.ngrok-free.app"
    try {
        const response = await axios.post(back+'/gather/', {
          name:data.name,
          lat:data.lat,
          long:data.long,
          time:"",
          platform:data.platform,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 5000, // 5 seconds timeout
        });

        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    }
};


const MapComponent = () => {
   
    const [userLocations, setUserLocations] = useState([
    ]);

   
  const [userLocation, setUserLocation] = useState(null); 
  const [error, setError] = useState(null);
  const [positionNew, setPositionNew] = useState(null);

  const [loading, setLoading] = useState(true); 
  const [send, setSend] = useState(false); 



  useEffect(() => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            
            let fold_path = process.env.PUBLIC_URL + '/assets/nUser/'
            
            let iconurl = ''
           
            const randomIndex = Math.floor(Math.random() * imageNames.length);
            iconurl = fold_path+imageNames[randomIndex]

            console.log(iconurl)
            console.log([ latitude, longitude])

            const nicon = new L.Icon({
                iconUrl: iconurl, 
                iconSize: [50, 50], 
                iconAnchor: [25, 50], 
                popupAnchor: [0, -40],
            });
            console.log(nicon)
            const platform = navigator.platform;
            const newUserLocation = { id: 0, position: [latitude, longitude], name: 'You', icon: nicon , plat:platform, time:Date.now()};
        
            setUserLocation([latitude, longitude]); 
            setUserLocations((prevLocations) => [...prevLocations, newUserLocation]);
            setPositionNew([ latitude, longitude])
            setLoading(false)
            
        
        },
          (err) => {
            setError(err.message); 
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.'); 
        setLoading(false);
      }
 
   
  }, []);
  
  if (loading) {
    return <div>Loading...</div>; 
  }else{
    console.log(userLocations)
    
    if(!send){
        console.log("Send")
        console.log(userLocations)
        const data = {
          name:userLocations[0].name,
          lat:userLocations[0].position[0],
          long:userLocations[0].position[1],
          platform:userLocations[0].plat,
      }
      console.log("DATA : "+data)
        sendData(data)
        setSend(true)
    }

  }




/*

  if(!loading){
  const getIconSize = (zoom) => {
    const baseSize = 50; // Base icon size
    const scaleFactor = 5; // How much bigger for each zoom level
    return [baseSize + (zoom - 13) * scaleFactor, baseSize + (zoom - 13) * scaleFactor]; // Adjust size based on zoom
  };
  console.log(userLocations[0])
  const userIcon = new L.Icon({
    iconUrl: userLocations[0]?.icon?.options.iconUrl, // Safely access the icon URL
    iconSize: getIconSize(zoomLevel),
    iconAnchor: userLocations[0]?.icon?.options.iconAnchor,
    popupAnchor: userLocations[0]?.icon?.options.popupAnchor,
  });
  userLocations[0].icon = userIcon; 
}*/
  return (
    <MapContainer center={positionNew} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
   
       {userLocations.map(user => {
                console.log("User Position:", user.position); // Log positions
                if (user.position[0] !== NaN && user.position[1] !== NaN) {
                    return (
                        <Marker key={user.id} position={user.position} icon={user.icon}>
                            <Popup>{user.name}</Popup>
                        </Marker>
                    );
                }
                return null; // Return null if the position is invalid
            })}
    
    </MapContainer>
  );


  };

export default MapComponent;
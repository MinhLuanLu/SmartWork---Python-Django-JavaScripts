import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';



const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultLocation = {
  lat: 56.2639,
  lng: 9.5018
};


const MapComponent = () => {
  const getFullName = sessionStorage.getItem('FullName');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState('');
  
  useEffect(() => {
    async function getAddress(lat, lng) {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC8eCx3JUetYjgfE6f8535dfCCtGb9oZdo`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAddress(data.results[0].formatted_address);
        sessionStorage.setItem('Address', data.results[0].formatted_address);  
        sessionStorage.setItem('CheckIn_status', 'Successful');
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }

    async function fetchLocation() {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
          });
        });

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation({ lat, lng });
        getAddress(lat, lng);

      } catch (error) {
        console.error("Error fetching geolocation:", error);
        setLocation(defaultLocation);
        getAddress(defaultLocation.lat, defaultLocation.lng);
      }
    }

    fetchLocation();
  
  }, []);

  useEffect(() => {
    if (location.lat && location.lng && address) {
      const now = new Date();
      const currentTime = now.toLocaleTimeString();
      const myObject = {
        'FullName': getFullName,
        'Location': address,
        'Latitude': location.lat,
        'Longitude': location.lng,
        'CheckIn_time': currentTime
      };
      console.log(myObject);
      

      const endpoint = `${import.meta.env.VITE_API_URL}api/CheckIn`;
      async function fetch_checkin() {
        
          await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(myObject)
          })

          .then(res =>{
              if(res.ok){
                return res.json();
              }
              if (res.status === 400){
                alert(data.massage);
              }
          })
          .then(data => {
            if (data.message){
              alert(data.message);
            }
          })
        
      }

      fetch_checkin();
    }
  }, [location, address, getFullName]);

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyAkf3d652599d-xXb0sX_WjGp8_4bxzuWk">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location.lat ? location : defaultLocation}
          zoom={10}
        >
          {location.lat && <MarkerF position={location} />}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapComponent;

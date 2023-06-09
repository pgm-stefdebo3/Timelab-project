import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { ConditionalLoader } from '../components/ConditionalLoader';
import { Bounds } from '../components/Bounds';
import { Icon } from 'leaflet';

import UserIconImage from '../assets/images/user-marker.png';

import "leaflet/dist/leaflet.css";


const Home = () => {
  const [location, setLocation] = useState<null | [number, number]>(null);
  const [isLocationSet, setIsLocationSet] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const crds = position.coords;
      if (location?.[0] !== crds.latitude && location?.[1] !== crds.longitude) {
        let tempLoc: [number, number] = [crds.latitude, crds.longitude];
        setLocation(tempLoc);
        setIsLocationSet(true);
      }
    }, (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    , {
      enableHighAccuracy: true,
    });
  }, []);

  const center: [number, number] = [51.0591448, 3.7418415];

  const userIcon = new Icon({
    iconUrl: UserIconImage,
    iconSize: [32, 32]
  })

    return (
    <div>
      <MapContainer center={center} zoom={16} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ConditionalLoader condition={isLocationSet}>
          <Marker icon={userIcon} position={location !== null ? location : [0 , 0]}>
            <Popup>
              Jouw locatie
            </Popup>
          </Marker>
        </ConditionalLoader>
        <Bounds />
      </MapContainer>
    </div>
  )
}

export default Home;
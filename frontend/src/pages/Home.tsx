import { MapContainer, TileLayer, Popup, Marker, useMapEvent, useMap } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
import { Icon, LatLng, latLng } from 'leaflet';
import { Bounds, Button, ConditionalLoader, MassModal } from '../components';
import FilterIcon from '@mui/icons-material/FilterList';
import MyLocationIcon from '@mui/icons-material/MyLocation';

import UserIconImage from '../assets/images/user-marker.png';

import "leaflet/dist/leaflet.css";
import { toast, ToastContainer } from 'react-toastify';


const Home = () => {
  const [location, setLocation] = useState<null | [number, number]>(null);
  const [isLocationSet, setIsLocationSet] = useState(false);
  const [modal, setModal] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [refresh, setRefresh] = useState(new Date());
  const [center, setCenter] = useState<[number, number]>([51.0591448, 3.7418415]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      toast.info('Fetching your location', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
  }, [refresh]);
  
  const onRefreshClick = () => {
    setRefresh(new Date());
    if (location) {
      setCenter(location);
    }
  };

  const userIcon = new Icon({
    iconUrl: UserIconImage,
    iconSize: [32, 32]
  })
    return (
    <div className='app-container'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className={formVisible? 'app-container-map--small': 'app-container-map'}>
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
      
      {/* UI COMPONENTS */}
      <h2 className='title'><span className='sub'>powered by</span><br/>Timelab</h2>
      <div className='button-container button-container--bottom-left'>
        <Button className='button button--filters' disabled={modal !== ''} type='button' onClick={() => setModal('filters')}>
          <FilterIcon/>
        </Button>
        <Button className='button button--refresh' disabled={modal !== ''} type='button' onClick={onRefreshClick}>
          <MyLocationIcon/>
        </Button>
      </div>
      
      <MassModal visible={modal === 'filters'} setVisible={(e : string) => setModal(e)}>

      </MassModal>
    </div>
    <ConditionalLoader condition={formVisible}>
      <div className='form-container'>

      </div>
    </ConditionalLoader>
  </div>
  )
}

export default Home;
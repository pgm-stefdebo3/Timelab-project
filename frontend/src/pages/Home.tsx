import { MapContainer, TileLayer, Popup, Marker, useMapEvent, useMap } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
import { Icon, LatLng, latLng } from 'leaflet';
import { Bounds, Button, ConditionalLoader, CustomCheckbox, MassModal } from '../components';
import { toast, ToastContainer } from 'react-toastify';
import { GET_MAPS_DATA } from '../gql/queries';
import { useQuery } from '@apollo/client';
import MarkerForm from '../components/MarkerForm';
import bounds from "../utils/bounds"
import classifyPoint from 'robust-point-in-polygon';

import FilterIcon from '@mui/icons-material/FilterList';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import UserIconImage from '../assets/images/user-marker.png';
import TreeIconImage from '../assets/images/tree-marker.png';
import MarkerIconImage from '../assets/images/normal-marker.png';
import LogoImage from '../assets/images/logo.png';

import "leaflet/dist/leaflet.css";


const Home = () => {
  const [location, setLocation] = useState<null | [number, number]>(null);
  const [isLocationSet, setIsLocationSet] = useState(false);
  const [modal, setModal] = useState('');
  const [inBounds, setInBounds] = useState(false);
  const [layers, setLayers] = useState<string[]>([]);
  const [formVisible, setFormVisible] = useState('');
  const [refresh, setRefresh] = useState(new Date());
  const [center, setCenter] = useState<[number, number]>([51.0591448, 3.7418415]);
  const { loading, error, data, refetch } = useQuery(GET_MAPS_DATA);

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
        if (classifyPoint(bounds, [crds.latitude, crds.longitude]) === 1) {
          setInBounds(false)
        } else {
          setInBounds(true)
        }
      }
    }, (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    , {
      enableHighAccuracy: true,
    });
  }, [refresh, formVisible]);

  if (loading) return <p>Loading...</p>;

  if (error) {
      return <p>Error...</p>;
  }
  
  const onRefreshClick = () => {
    setRefresh(new Date());
    if (location) {
      setCenter(location);
    }
  };

  const toggleLayer = (name: string) => {
    let index = layers.indexOf(name);
    let newLayers = layers;
    if (index > -1) {
      newLayers.splice(index, 1);
      setLayers(newLayers)
    } else {
      newLayers.push(name);
      setLayers(newLayers)
    }
  }

  const userIcon = new Icon({
    iconUrl: UserIconImage,
    iconSize: [32, 32]
  })

  const treeIcon = new Icon({
    iconUrl: TreeIconImage,
    iconSize: [32, 32]
  })

  const markerIcon = new Icon({
    iconUrl: MarkerIconImage,
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
        <MapContainer center={center} zoom={20} scrollWheelZoom={true}>
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
          
          <ConditionalLoader condition={data}>
              {data.layers?.filter((layer: {name: string}) => layers.indexOf(layer.name) > -1).map((layer: {markers: {id: number, name: string, layerId: number, coordinates: [{latitude: number, longitude: number}]}[]}) => {
              return (layer.markers.map((marker: {id: number, name: string, layerId: number, coordinates: [{latitude: number, longitude: number}]}) => (
                <Marker  icon={marker.layerId === 1? treeIcon : markerIcon} position={[marker.coordinates[0].longitude , marker.coordinates[0].latitude]}>
                  <Popup>
                    {marker.name}
                  </Popup>
                </Marker>
              )))})}
          </ConditionalLoader>
          <Bounds />
        </MapContainer>
          <div className='map-form-container'>
            <div className='map-form-container__close' onClick={() => setFormVisible('')}>
              <ArrowForwardIosIcon  color='secondary' sx={{
                visibility: formVisible? 'visible': 'hidden',
                width: formVisible? '2rem': '0',
              }}/>
            </div>
            <MarkerForm refetch={refetch} setFormVisible={setFormVisible} visible={formVisible === 'create-marker'} layers={data.layers} coordinate={location? location : [0, 0]}/>
          </div>
      </div>
      {/* UI COMPONENTS */} 
      
      <img className='title' src={LogoImage}/>
      <div className='button-container button-container--bottom-left'>
        <Button className='button button--filters' disabled={modal !== ''} type='button' onClick={() => setModal('filters')}>
          <FilterIcon color='secondary'/>
        </Button>
        <Button className='button button--refresh' disabled={modal !== ''} type='button' onClick={onRefreshClick}>
          <MyLocationIcon color='secondary'/>
        </Button>
        <MassModal visible={modal === 'filters'} setVisible={(e : string) => setModal(e)}>
          <h2>Filters</h2>
          <div className='flex flex-col'>
            {data.layers.map((layer: {id: number, name: string}) => (
                <CustomCheckbox initialChecked={layers.indexOf(layer.name) > -1} onClick={() => toggleLayer(layer.name)} name={layer.name} />
            ))}
          </div>
        </MassModal>
      </div>
      <ConditionalLoader condition={inBounds && !formVisible}>
        <div className=''>
          <Button className='button button--form' disabled={modal !== ''} type='button' onClick={() => setFormVisible('create-marker')}>
            <AddBoxIcon color='secondary'/>
          </Button>
        </div>
      </ConditionalLoader>
    </div>
  )
}

export default Home;
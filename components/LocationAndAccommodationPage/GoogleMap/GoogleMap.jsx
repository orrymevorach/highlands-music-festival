import styles from '../location-and-accommodation.module.scss';

import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

const center = {
  lat: 45.2004677,
  lng: -77.4433219,
};

const Google = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    id: 'map',
  });

  return isLoaded ? (
    <GoogleMap
      center={center}
      options={{ zoom: 5, mapId: 'map' }}
      mapContainerClassName={styles.googleMap}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Google;

import { useState, useEffect } from 'react';

const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBaC0FPHnBjd1CO1awyTQo_1mOZ3iUGvD4';
    document.head.appendChild(script);
    script.addEventListener('load', () => setIsLoaded(true));
  }, []);

  useEffect(() => {
    const hasWidget = window.google;
    if (isLoaded && hasWidget) {
      const geo = new window.google.maps.Geocoder();

      geo.geocode(
        { address: '38483 Hwy 28, Palmer Rapids, ON K0J 2E0' },
        function (results) {
          if (results) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            const latLng = { lat, lng };
            const mapOptions = {
              center: {
                ...latLng,
              },
              zoom: 5,
            };

            const map = new window.google.maps.Map(
              document.getElementById('map'),
              mapOptions
            );

            new window.google.maps.Marker({
              position: latLng,
              map,
            });
          }
        }
      );
    }
  }, [isLoaded]);
};

export default useGoogleMaps;

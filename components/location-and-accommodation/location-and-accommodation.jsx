import styles from './location-and-accommodation.module.scss';
import Layout from '../layout';
import GoogleMap from 'components/location-and-accommodation/GoogleMap';
import clsx from 'clsx';
import Image from 'next/image';
import MapOfCamp from 'public/map-dark.jpg';
import Cabin from 'public/cabin.jpeg';
import FadeSlider from 'components/shared/sliders/fade-slider';

const packingList = [
  { packingItem: 'Single bed fitted/flat sheet ' },
  { packingItem: 'Blanket/comforter' },
  { packingItem: 'Pillow' },
  { packingItem: 'Shower towel' },
  { packingItem: 'Swim towel' },
  { packingItem: 'Bathing suit' },
  { packingItem: 'Warm clothing for cooler evenings ' },
  { packingItem: 'Toiletries' },
  { packingItem: 'Flashlight & batteries' },
  { packingItem: 'Device chargers (regular or portable)' },
];

const iframeData = [
  { name: 'Walden Swim Docks', lat: 45.2044181, long: -77.4447824 },
  {
    name: 'Canoe and Sail Docks',
    lat: 45.2049779,
    long: -77.4446768,
    heading: 245,
  },
  { name: 'The Amphitheatre', lat: 45.2040309, long: -77.444126, heading: 48 },
  {
    name: 'Camper Cabin',
    imgSrc:
      'https://www.campwalden.ca/wp-content/uploads/2023/03/360-cabin-interior-1.jpg',
  },
  {
    name: 'Ski Docks',
    imgSrc:
      'https://www.campwalden.ca/wp-content/uploads/2023/03/360-ski-docks-1.jpg',
  },
  {
    name: 'Far Raft',
    imgSrc:
      'https://www.campwalden.ca/wp-content/uploads/2023/03/360-far-raft-1.jpg',
  },
  {
    name: 'Main Field',
    imgSrc:
      'https://www.campwalden.ca/wp-content/uploads/2023/03/360-main-field-1.jpg',
  },
  {
    name: "Lovers' Lane",
    imgSrc:
      'https://www.campwalden.ca/wp-content/uploads/2023/03/360-lovers-lane-1.jpg',
  },
  {
    name: 'The Climbing Wall',
    iframeSrc:
      'https://tours.829llc.com/2017/walden/vtour_1/tour.html?startscene=0&html5=only&onstart=skin_hideskin();removelayer(skin_btn_show);removelayer(skin_title)&autorotate.enabled=false',
  },
  {
    name: 'On the Water',
    iframeSrc:
      'https://tours.829llc.com/2017/walden/vtour_1/tour.html?startscene=2&html5=only&onstart=skin_hideskin();removelayer(skin_btn_show);removelayer(skin_title)&autorotate.enabled=false',
  },
  {
    name: 'The Basketball Court',
    iframeSrc:
      'https://tours.829llc.com/2017/walden/vtour_1/tour.html?startscene=7&html5=only&onstart=skin_hideskin();removelayer(skin_btn_show);removelayer(skin_title)&autorotate.enabled=false',
  },
  {
    name: 'The Dining Hall',
    iframeSrc:
      'https://tours.829llc.com/2017/walden/vtour_1/tour.html?startscene=13&html5=only&onstart=skin_hideskin();removelayer(skin_btn_show);removelayer(skin_title)&autorotate.enabled=false',
  },
  {
    name: 'The Swim Docks',
    iframeSrc:
      'https://tours.829llc.com/2017/walden/vtour_1/tour.html?startscene=14&html5=only&onstart=skin_hideskin();removelayer(skin_btn_show);removelayer(skin_title)&autorotate.enabled=false',
  },
  {
    name: 'The Comin Unit',
    iframeSrc:
      'https://tours.829llc.com/2017/walden/vtour_1/tour.html?startscene=17&html5=only&onstart=skin_hideskin();removelayer(skin_btn_show);removelayer(skin_title)&autorotate.enabled=false',
  },
  {
    name: 'The Tennis Courts',
    iframeSrc:
      'https://tours.829llc.com/2017/walden/vtour_1/tour.html?startscene=31&html5=only&onstart=skin_hideskin();removelayer(skin_btn_show);removelayer(skin_title)&autorotate.enabled=false',
  },
];

export default function LocationAndAccommodation() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  return (
    <Layout>
      <main>
        <div className={styles.locationAccommodationWrapper}>
          <FadeSlider data={iframeData}>
            {iframeData.map(
              ({ name, lat, long, heading = 245, iframeSrc, imgSrc }) => {
                if (lat && long) {
                  return (
                    <div key={name}>
                      {name}
                      <iframe
                        width="800"
                        height="450"
                        // style="border:0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${lat},${long}&heading=${heading}`}
                      ></iframe>
                    </div>
                  );
                }
                if (iframeSrc) {
                  return (
                    <div key={name}>
                      {name}
                      <iframe
                        width="800"
                        height="450"
                        // style="border:0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={iframeSrc}
                      ></iframe>
                    </div>
                  );
                }
                if (imgSrc) {
                  return <img src={imgSrc} alt={name} key={name} />;
                }
              }
            )}
          </FadeSlider>
        </div>
      </main>
    </Layout>
  );
}

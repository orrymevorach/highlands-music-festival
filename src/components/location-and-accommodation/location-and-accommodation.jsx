import React from 'react';
import './location-and-accommodation.scss';
import Layout from '../layout';
import { useGoogleMaps } from '@hooks';
import Map from '@images/map';

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

export default function LocationAndAccommodation() {
  useGoogleMaps();
  return (
    <Layout>
      <main>
        <div className="locationAccommodationWrapper">
          <div className="row locationAccommodationHeading">
            <h2 className="heading">Location</h2>
            <h2 className="heading">& Accommodation</h2>
          </div>
          <div className="row">
            <div className="location">
              <div id="map"></div>
              <p className="locationLineOne bodyCopy">
                Camp Walden is located in the beautiful Haliburton Highlands
              </p>
              <p className="locationAddress bodyCopy">38483 Highway 28</p>
              <p className="locationAddress bodyCopy">Palmer Rapids, Ontario</p>
              <p className="locationAddress bodyCopy">K0J 2E0 (45.2,-77.44)</p>
            </div>
            <div className="accommodation">
              <div className="imageContainer"></div>
              <p className="accommodationLineOne bodyCopy">
                Cabins vary in size and features. Some have private bathrooms
                and sinks on the porch while others don’t. All cabin information
                can be found on the{' '}
                <a
                  href="https://www.eventbrite.ca/e/highlands-music-festival-tickets-353399967817"
                  target="_blank"
                  rel="noreferrer"
                >
                  ticketing page.
                </a>
              </p>
              <p className="bodyCopy">
                When purchasing a single{' '}
                <span className="bodyCopyBold">
                  ticket, or tickets for your group,
                </span>{' '}
                select one of the cabins listed. Each cabin will have a max
                capacity of 12 people.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="packingContainerLineOne">
              <p className="bodyCopyMedium col1Par3">
                We recommend checking out our suggested packing list
              </p>
            </div>
            <ul className="packingContainerLineTwo">
              {packingList.map(({ packingItem }) => (
                <li key={packingItem} className="packingListItem">
                  <p className="bodyCopy">{packingItem}</p>
                </li>
              ))}
            </ul>
          </div>
          <Map />
        </div>
      </main>
    </Layout>
  );
}

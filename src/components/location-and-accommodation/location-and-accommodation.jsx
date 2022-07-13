import React from 'react';
import './location-and-accommodation.scss';
import Layout from '../layout';

const packingList = [
  { packingItem: 'Single bed fitted/flat sheet ' },
  { packingItem: 'Blanket/comforter' },
  { packingItem: 'Pillow' },
  { packingItem: 'Shower towel' },
  { packingItem: 'Swim towel' },
  { packingItem: 'Bathing suit' },
  { packingItem: 'Warm clothing for cooler evenings Toiletries' },
  { packingItem: 'Flashlight & batteries' },
  { packingItem: 'Device chargers (regular or portable)' },
];

export default function LocationAndAccommodation() {
  return (
    <Layout>
      <div className="locationAccommodationWrapper">
        <div className="row locationAccommodationHeading">
          <h2 className="heading">Location</h2>
          <h2 className="heading">& Accommodation</h2>
        </div>
        <div className="row ">
          <div className="location">
            <div className="imageContainer"></div>
            <p className="center locationLineOne bodyCopy">
              Camp Walden is located in the beautiful Haliburton Highlands
            </p>
            <p className="center locationAddress bodyCopy">38483 Highway 28</p>
            <p className="center locationAddress bodyCopy">
              Palmer Rapids, Ontario
            </p>
            <p className="center locationAddress bodyCopy">
              K0J 2E0 (45.2,-77.44)
            </p>
          </div>
          <div className="accommodation">
            <div className="imageContainer"></div>
            <p className="accommodationLineOne bodyCopy">
              Since 1970, and set in Ontario’s beautiful Haliburton Highlands,
              Camp Walden has hosted hundreds of children each year for
              recreational summer programs. With 750 acres including its
              beautiful 100 acre private lake, 50 rustic camper cabins, a
              vaulting Dining Hall, and dozens of natural gathering spaces and
              trails, Walden is aptly named and a haven just 3 hours away from
              Toronto, and 2 from Ottawa.
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
      </div>
    </Layout>
  );
}

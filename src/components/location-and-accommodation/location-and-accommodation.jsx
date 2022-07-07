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
            <p className="center locationLineOne">
              Camp Walden is located in the beautiful Haliburton Highlands
            </p>
            <p className="center locationAddress">38483 Highway 28</p>
            <p className="center locationAddress">Palmer Rapids, Ontario</p>
            <p className="center locationAddress"> K0J 2E0 (45.2,-77.44)</p>
            <div className="packingContainer">
              <p>We recommend checking out our suggested packing list</p>
            </div>
          </div>
          <div className="accommodation">
            <p>
              Since 1970, and set in Ontario’s beautiful Haliburton Highlands,
              Camp Walden has hosted hundreds of children each year for
              recreational summer programs. With 750 acres including its
              beautiful 100 acre private lake, 50 rustic camper cabins, a
              vaulting Dining Hall, and dozens of natural gathering spaces and
              trails, Walden is aptly named and a haven just 3 hours away from
              Toronto, and 2 from Ottawa.
            </p>
            <p>
              When purchasing a single ticket, or tickets for your group, select
              one of the cabins listed. Each cabin will have a max capacity of
              12 people.
            </p>
            <ul className="packingContainer">
              {packingList.map(({ packingItem }) => (
                <li key={packingItem} className="packingListItem">
                  <p>{packingItem}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

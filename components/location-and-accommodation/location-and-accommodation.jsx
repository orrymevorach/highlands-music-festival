import styles from './location-and-accommodation.module.scss';
import GoogleMap from 'components/location-and-accommodation/GoogleMap/GoogleMap';
import clsx from 'clsx';
import Image from 'next/image';
import MapOfCamp from 'public/map-2024.jpg';
import Cabin from 'public/backgrounds/HL_2023_Logo190.jpg';

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
  { packingItem: 'Power bar' },
];

export default function LocationAndAccommodation() {
  return (
    <main>
      <div className={styles.locationAccommodationWrapper}>
        <div className={clsx(styles.row, styles.locationAccommodationHeading)}>
          <h2 className={styles.heading}>Location</h2>
          <h2 className={styles.heading}>& Accommodation</h2>
        </div>
        <div className={styles.row}>
          <div className={styles.location}>
            <GoogleMap />
            <p className={clsx(styles.locationLineOne, styles.bodyCopy)}>
              Camp Walden is located in the beautiful Haliburton Highlands
            </p>
            <p className={clsx(styles.locationAddress, styles.bodyCopy)}>
              38483 Highway 28
            </p>
            <p className={clsx(styles.locationAddress, styles.bodyCopy)}>
              Palmer Rapids, Ontario
            </p>
            <p className={clsx(styles.locationAddress, styles.bodyCopy)}>
              K0J 2E0 (45.2,-77.44)
            </p>
          </div>
          <div className={styles.accommodation}>
            <div className={styles.imageContainer}>
              <Image priority src={Cabin} quality={50} width={970} />
            </div>

            <p className={clsx(styles.accommodationLineOne, styles.bodyCopy)}>
              Cabins vary in size and features. Some have private bathrooms and
              sinks on the porch while others don’t. Cabin information will be
              available as you purchase your tickets.
            </p>
            {/* <p className={styles.bodyCopy">
                When purchasing a single{' '}
                <span className={styles.bodyCopyBold">
                  ticket, or tickets for your group,
                </span>{' '}
                select one of the cabins listed. Each cabin will have a max
                capacity of 12 people.
              </p> */}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.packingContainerLineOne}>
            <p className={clsx(styles.bodyCopyMedium, styles.col1Par3)}>
              We recommend checking out our suggested packing list
            </p>
          </div>
          <ul className={styles.packingContainerLineTwo}>
            {packingList.map(({ packingItem }) => (
              <li key={packingItem} className={styles.packingListItem}>
                <p className={styles.bodyCopy}>{packingItem}</p>
              </li>
            ))}
          </ul>
        </div>

        <Image
          src={MapOfCamp}
          alt="Map of Highlands Music Festival"
          className={styles.mapOfCamp}
          quality={50}
          width={1520}
        />
      </div>
    </main>
  );
}

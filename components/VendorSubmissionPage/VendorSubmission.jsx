import VendorSubmissionForm from './VendorSubmissionForm/VendorSubmissionForm';
import styles from './VendorSubmission.module.scss';
import Image from 'next/image';
import logo from 'public/Logo-1200px-Neutral.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { colors } from 'utils/constants';
import Information from './Information/Information';

const informationData = [
  // {
  //   heading: 'vendor options:',
  //   listItems: [
  //     'A one night stay at Highlands Music Festival - $150.',
  //     'Or, stay for the entire festival - $350.',
  //   ],
  // },
  // {
  //   heading: 'your vendor fee includes:',
  //   listItems: [
  //     'Your business spot reserved at our marketplace',
  //     'Meals and snacks for up to two people. Request for accomodations.',
  //   ],
  // },
  // {
  //   heading: "it's your responsibility to:",
  //   listItems: [
  //     'Post, share tag, on social media',
  //     'Arrive on time for set-up',
  //     'Keep an eye on your products - Highlands Music Festival is not responsible for any lost/stolen items.',
  //     'Pay your vendor fee if your application is approved.',
  //     'Have Fun!',
  //   ],
  // },
  {
    heading: 'vendor application',
    listItems: ['Now accepting applications for 2025.'],
  },
];

export default function VendorSubmission() {
  return (
    <main>
      <div className={styles.vendorFormPageContainer}>
        <Image
          src={logo}
          className={styles.logo}
          alt="Highlands Music Festival Logo"
        />
        <div className={styles.marketplaceContainer}>
          <FontAwesomeIcon icon={faMapPin} color={colors.beige} size="2xl" />
          <p className={styles.marketplaceText}>Marketplace</p>
        </div>

        {informationData.map(informationItem => (
          <Information {...informationItem} key={informationItem.heading} />
        ))}
        {/* <Information heading="vendor application" /> */}
        <VendorSubmissionForm />
      </div>
    </main>
  );
}

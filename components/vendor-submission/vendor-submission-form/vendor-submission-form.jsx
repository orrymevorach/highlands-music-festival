import SubmissionForm from 'components/shared/submission-form/submission-form';
import useVendorSubmissionForm from './useVendorSubmissionForm';
import { sendVendorSubmissionForm } from 'lib/mailgun';
import { createRecord } from 'lib/airtable-lib';
import { useState } from 'react';
import styles from './vendor-submission-form.module.scss';
import Image from 'next/image';
import logo from 'public/Logo-1200px-Neutral.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { colors } from 'utils/constants';
import Information from './information';

export default function ArtistSubmissionForm() {
  const useFormReducer = useVendorSubmissionForm();
  const { state, dispatch, actions, stages } = useFormReducer;
  const [isLoading, setIsLoading] = useState(false);
  const { stage } = state;

  const handleSubmit = async () => {
    setIsLoading(true);
    const fields = {
      Business: state.business,
      Products: state.products,
      Services: state.services,
      'IG Handle': `https://www.instagram.com/${state.instagram.replace(
        '@',
        ''
      )}/`,
      Website: state.website,
      'Email Address': state.email,
    };
    const { response: record } = await createRecord({
      tableId: 'Vendor Submissions',
      newFields: fields,
    });

    await sendVendorSubmissionForm({ fields, recId: record.id });
    dispatch({ type: actions.SET_STAGE, stage: stages.CONFIRMATION });
    setIsLoading(false);
  };

  const formConfig = [
    {
      type: 'text',
      label: 'Business',
      id: 'business',
      value: state.business,
      handleChange: value =>
        dispatch({ type: actions.SET_BUSINESS, business: value }),
      required: true,
    },
    {
      type: 'text',
      label: 'Products',
      id: 'products',
      value: state.products,
      handleChange: value =>
        dispatch({ type: actions.SET_PRODUCTS, products: value }),
    },
    {
      type: 'text',
      label: 'Services',
      id: 'services',
      value: state.services,
      handleChange: value =>
        dispatch({ type: actions.SET_SERVICES, services: value }),
    },
    {
      type: 'text',
      label: 'IG Handle',
      id: 'instagram',
      placeholder: '@',
      value: state.instagram,
      handleChange: value =>
        dispatch({ type: actions.SET_INSTAGRAM, instagram: value }),
    },
    {
      type: 'text',
      label: 'Website',
      id: 'website',
      value: state.website,
      handleChange: value =>
        dispatch({ type: actions.SET_WEBSITE, website: value }),
      required: true,
    },
    {
      type: 'text',
      label: 'Email',
      id: 'email',
      value: state.email,
      handleChange: value =>
        dispatch({ type: actions.SET_EMAIL, email: value }),
      required: true,
    },
  ];

  const informationData = [
    {
      heading: 'your $100.00 vendor fee includes:',
      listItems: [
        'Your business spot reserved at our marketplace',
        'A one night stay at Highlands Music Festival for up to two people. Meals, snacks. Request for accomodations.',
      ],
    },
    {
      heading: "it's your responsibility to:",
      listItems: [
        'Post, share tag, on social media',
        'Arrive on time for set-up',
        'Keep an eye on your products - Highlands Music Festival is not responsible for any lost/stolen items.',
        'Pay $100.00 if your application is approved.',
        'Have Fun!',
      ],
    },
  ];

  return (
    <>
      {stage === stages.FILL_OUT_FORM && (
        <div className={styles.vendorFormPageContainer}>
          <Image src={logo} className={styles.logo} />
          <div className={styles.marketplaceContainer}>
            <FontAwesomeIcon icon={faMapPin} color={colors.beige} size="2xl" />
            <p className={styles.marketplaceText}>Marketplace</p>
          </div>

          {informationData.map(informationItem => (
            <Information {...informationItem} />
          ))}
          <Information heading="vendor application" />
          <SubmissionForm
            formConfig={formConfig}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            formContainerClassNames={styles.formContainer}
            inputClassNames={styles.input}
            labelClassNames={styles.label}
            inputContainerClassNames={styles.inputContainer}
            buttonClassNames={styles.button}
            requiredPosition="bottom"
          />
        </div>
      )}
      {stage === stages.CONFIRMATION && (
        <div>
          <h2 className={styles.thankYou}>Thank you for your submission!</h2>
        </div>
      )}
    </>
  );
}

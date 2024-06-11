import SubmissionForm from 'components/shared/submission-form/submission-form';
import useVendorSubmissionForm from './useVendorSubmissionForm';
import { sendVendorSubmissionForm } from 'lib/mailgun';
import { createRecord } from 'lib/airtable-lib';
import { useState } from 'react';
import styles from './vendor-submission-form.module.scss';

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
      'Length Of Stay': state.lengthOfStay,
    };
    const { response } = await createRecord({
      tableId: 'Vendor Submissions',
      newFields: fields,
    });

    // await sendVendorSubmissionForm({ fields });
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
    {
      type: 'dropdown',
      dropdownItems: ['1 night (Saturday Night)', '3 nights (Entire festival)'],
      label: 'Length of stay',
      id: 'lengthOfStay',
      value: state.lengthOfStay,
      handleChange: value =>
        dispatch({ type: actions.SET_LENGTH_OF_STAY, lengthOfStay: value }),
      required: true,
    },
  ];

  return (
    <>
      {stage === stages.FILL_OUT_FORM && (
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
      )}
      {stage === stages.CONFIRMATION && (
        <div>
          <h2 className={styles.thankYouHeading}>
            Thank you for your submission!
          </h2>
          <p className={styles.thankYouText}>
            We will be in touch shortly with more information.
          </p>
        </div>
      )}
    </>
  );
}

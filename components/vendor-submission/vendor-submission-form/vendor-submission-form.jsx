import SubmissionForm from 'components/shared/submission-form/submission-form';
import useVendorSubmissionForm from './useVendorSubmissionForm';
import {
  sendArtistSubmissionForm,
  sendVendorSubmissionForm,
} from 'lib/mailgun';
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
    };
    await sendVendorSubmissionForm({ fields });
    await createRecord({
      tableId: 'Vendor Submissions',
      newFields: fields,
    });
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

  return (
    <>
      {stage === stages.FILL_OUT_FORM && (
        <SubmissionForm
          formConfig={formConfig}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
      {stage === stages.CONFIRMATION && (
        <div>
          <h2 className={styles.thankYou}>Thank you for your submission!</h2>
        </div>
      )}
    </>
  );
}

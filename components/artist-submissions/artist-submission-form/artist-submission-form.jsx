import SubmissionForm from 'components/shared/submission-form/submission-form';
import useArtistSubmissionFormReducer from '../useArtistSubmissionForm';
import { sendArtistSubmissionForm } from 'lib/mailgun';
import { createRecord } from 'lib/airtable-lib';
import { useState } from 'react';
import styles from './artist-submission-form.module.scss';

export default function ArtistSubmissionForm() {
  const useFormReducer = useArtistSubmissionFormReducer();
  const { state, dispatch, actions, stages } = useFormReducer;
  const [isLoading, setIsLoading] = useState(false);
  const { name, email, message, stage } = state;

  const handleSubmit = async () => {
    setIsLoading(true);
    const fields = {
      Name: name,
      'Email Address': email,
      Message: message,
    };
    await sendArtistSubmissionForm({ fields });
    await createRecord({
      tableId: 'Artist Submissions',
      newFields: fields,
    });
    dispatch({ type: actions.SET_STAGE, stage: stages.CONFIRMATION });
    setIsLoading(false);
  };

  const formConfig = [
    {
      type: 'text',
      label: 'Name',
      id: 'name',
      value: name,
      handleChange: value => dispatch({ type: actions.SET_NAME, name: value }),
    },
    {
      type: 'text',
      label: 'Email',
      id: 'email',
      value: email,
      handleChange: value =>
        dispatch({ type: actions.SET_EMAIL, email: value }),
    },
    {
      type: 'textarea',
      label: 'Message',
      id: 'message',
      value: message,
      minRows: 3,
      handleChange: e =>
        dispatch({
          type: actions.SET_MESSAGE,
          message: e.target.value,
        }),
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

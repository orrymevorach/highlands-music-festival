import SubmissionForm from 'components/shared/submission-form/submission-form';
import useArtistSubmissionFormReducer from './useArtistSubmissionForm';
import { sendArtistSubmissionForm } from 'lib/mailgun';
import { createRecord } from 'lib/airtable-lib';
import { useState } from 'react';
import styles from './artist-submission-form.module.scss';

export default function ArtistSubmissionForm() {
  const useFormReducer = useArtistSubmissionFormReducer();
  const { state, dispatch, actions, stages } = useFormReducer;
  const [isLoading, setIsLoading] = useState(false);
  const { stage } = state;

  const handleSubmit = async () => {
    setIsLoading(true);
    const fields = {
      'Contact Name': state.contactName,
      'Artist Name': state.artistName,
      'Contact Email': state.contactEmail,
      'Contact Phone': state.contactPhone,
      City: state.city,
      Website: state.website,
      'Social Page': state.socialPage,
      About: state.about,
      'Audio Example One': state.audioExampleOne,
      'Audio Example Two': state.audioExampleTwo,
      'Audio Example Three': state.audioExampleThree,
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
      label: 'Contact Name',
      id: 'name',
      value: state.contactName,
      handleChange: value =>
        dispatch({ type: actions.SET_CONTACT_NAME, contactName: value }),
      required: true,
    },
    {
      type: 'text',
      label: 'Artist Name',
      id: 'name',
      value: state.artistName,
      handleChange: value =>
        dispatch({ type: actions.SET_ARTIST_NAME, artistName: value }),
      required: true,
    },
    {
      type: 'text',
      label: 'Contact Email',
      id: 'email',
      value: state.contactEmail,
      handleChange: value =>
        dispatch({ type: actions.SET_CONTACT_EMAIL, contactEmail: value }),
      required: true,
    },
    {
      type: 'text',
      label: 'Contact Phone',
      id: 'phone',
      value: state.contactPhone,
      handleChange: value =>
        dispatch({ type: actions.SET_CONTACT_PHONE, contactPhone: value }),
    },
    {
      type: 'text',
      label: 'Artist Home Town (City, Country)',
      id: 'city',
      value: state.city,
      handleChange: value => dispatch({ type: actions.SET_CITY, city: value }),
      required: true,
    },
    {
      type: 'text',
      label: 'Artist Website',
      id: 'city',
      value: state.website,
      handleChange: value =>
        dispatch({ type: actions.SET_WEBSITE, website: value }),
    },
    {
      type: 'text',
      label: 'Artist Social Page (Instagram)',
      id: 'city',
      value: state.socialPage,
      handleChange: value =>
        dispatch({ type: actions.SET_SOCIAL_PAGE, socialPage: value }),
      required: true,
    },
    {
      type: 'textarea',
      label:
        'About You: Provide a brief 250 word or less overview of your band, music style, and artist bio.',
      id: 'message',
      value: state.about,
      minRows: 7,
      handleChange: value =>
        dispatch({ type: actions.SET_ABOUT, about: value }),

      required: true,
      maxWordCount: 250,
    },
    {
      type: 'text',
      label: 'Audio/Video Example 1 (links for youtube, spotify, etc)',
      id: 'message',
      value: state.audioExampleOne,
      minRows: 3,
      required: true,
      handleChange: value =>
        dispatch({ type: actions.SET_AUDIO_EXAMPLE_1, audioExampleOne: value }),
      required: true,
    },
    {
      type: 'text',
      label: 'Audio/Video Example 2 (links for youtube, spotify, etc)',
      id: 'message',
      value: state.audioExampleTwo,
      minRows: 3,
      handleChange: value =>
        dispatch({ type: actions.SET_AUDIO_EXAMPLE_2, audioExampleTwo: value }),
    },
    {
      type: 'text',
      label: 'Audio/Video Example 3 (links for youtube, spotify, etc)',
      id: 'message',
      value: state.audioExampleThree,
      minRows: 3,
      handleChange: value =>
        dispatch({
          type: actions.SET_AUDIO_EXAMPLE_3,
          audioExampleThree: value,
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

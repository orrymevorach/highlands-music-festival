import SubmissionForm from 'components/shared/submission-form/submission-form';
import useArtistSubmissionFormReducer from '../useArtistSubmissionForm';

export default function ArtistSubmissionForm() {
  const useFormReducer = useArtistSubmissionFormReducer();
  const { state, dispatch, actions, stages } = useFormReducer;
  const handleSubmit = () => {
    dispatch({ type: actions.SET_STAGE, stage: stages.CONFIRMATION });
  };
  const formConfig = [
    {
      type: 'dropdown',
      label: 'Dropdown Label',
      id: 'Dropdown',
      value: state.dropdown,
      handleChange: value =>
        dispatch({ type: actions.SET_DROPDOWN, dropdown: value }),
      dropdownItems: ['Option 1', 'Option 2'],
    },
    {
      type: 'text',
      label: 'Text Label',
      id: 'label',
      value: state.name,
      handleChange: value => dispatch({ type: actions.SET_NAME, name: value }),
    },
    {
      type: 'textarea',
      label: 'Textarea Label',
      id: 'label',
      value: state.textarea,
      minRows: 3,
      handleChange: e =>
        dispatch({
          type: actions.SET_TEXTAREA,
          textarea: e.target.value,
        }),
    },
  ];
  return (
    <SubmissionForm
      formConfig={formConfig}
      stage={state.stage}
      stages={stages}
      handleSubmit={handleSubmit}
    />
  );
}

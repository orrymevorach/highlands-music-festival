import Button from '../button/button';
import GetFormElement from './formElements';
import styles from './submission-form.module.scss';

export default function SubmissionForm({
  formConfig,
  handleSubmit = () => {},
  stage = '',
  confirmationText = '',
  stages = {},
}) {
  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit();
  };
  if (!stage || stage === stages.FILL_OUT_FORM)
    return (
      <form action="#" className={styles.container} onSubmit={handleSubmitForm}>
        {formConfig.map((elementConfig, index) => {
          return (
            <GetFormElement
              key={`${index}-submission-form`}
              {...elementConfig}
            />
          );
        })}

        <Button classNames={styles.submitButton}>Continue</Button>
      </form>
    );

  if (stage === stages.CONFIRMATION)
    return (
      <div className={styles.confirmationContainer}>
        <p className={styles.confirmationText}>{confirmationText}</p>
      </div>
    );
}

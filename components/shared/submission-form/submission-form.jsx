import Button from '../button/button';
import GetFormElement from './formElements';
import styles from './submission-form.module.scss';

export default function SubmissionForm({
  formConfig,
  handleSubmit = () => {},
  isLoading = false,
}) {
  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form action="#" className={styles.container} onSubmit={handleSubmitForm}>
      <p className={styles.requiredText}>
        Fields marked with an <span className={styles.asterisk}>*</span> are
        required
      </p>
      {formConfig.map((elementConfig, index) => {
        return (
          <GetFormElement key={`${index}-submission-form`} {...elementConfig} />
        );
      })}

      <Button classNames={styles.submitButton} isLoading={isLoading}>
        Continue
      </Button>
    </form>
  );
}

import EmailCaptureForm from 'components/email-capture-form';
import styles from './contact.module.scss';

export default function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>2025 Tickets</h1>
      <div className={styles.formContainer}>
        <p className={styles.description}>
          Sign up to be the first to know about tickets for Highlands 2025!
        </p>
        <EmailCaptureForm
          formClassNames={styles.form}
          buttonClassNames={styles.button}
        />
      </div>
    </div>
  );
}

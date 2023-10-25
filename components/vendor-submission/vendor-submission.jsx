import Layout from 'components/layout';
import styles from './vendor-submission.module.scss';
import VendorSubmissionForm from './vendor-submission-form';

export default function VendorSubmission() {
  return (
    <main>
      <Layout>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>Vendor Submissions</h2>
          <VendorSubmissionForm />
        </div>
      </Layout>
    </main>
  );
}

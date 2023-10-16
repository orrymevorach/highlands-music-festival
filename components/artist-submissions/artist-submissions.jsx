import Layout from 'components/layout';
import styles from './artist-submissions.module.scss';
import ArtistSubmissionForm from './artist-submission-form';

export default function CheckIn() {
  return (
    <main>
      <Layout>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>Artist Submissions</h2>
          <p className={styles.text}>
            Use this form to submit to the Highlands Music Festival. We accept
            artist submissions year-round, however submissions must be received
            by December 15 in order to be considered for the following year's
            Festival.
          </p>
          <p className={styles.text}>
            2024 dates are September 26-29. Due to the high volume of
            submissions we receive, only successful applicants will be notified.
            We aim to notify successful applicants by April 15.
          </p>

          <ArtistSubmissionForm />
        </div>
      </Layout>
    </main>
  );
}

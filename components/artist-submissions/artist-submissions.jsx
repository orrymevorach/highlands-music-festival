import Layout from 'components/layout';
import styles from './artist-submissions.module.scss';
import ArtistSubmissionForm from './artist-submission-form';

export default function ArtistSubmission() {
  return (
    <main>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Artist Submissions</h2>
        <p className={styles.text}>
          Welcome to the Highlands Music Festival Artist Submission form!
        </p>
        <p className={styles.text}>
          We accept submissions all year round, however submissions must be
          received by January 31 in order to be considered for the following
          year’s Festival.
          {/* We accept submissions all year round, however submissions for 2024 are
          now closed. Stay tuned for more info about HMF 2025 submission
          deadlines. */}
        </p>
        <p className={styles.text}>
          {/* HMF 2024 will take place on Sept 26-29. We will notify you with any
          further questions or confirmation. Please be patient as we receive a
          high volume of submissions. */}
          We will notify you with any further questions or confirmation. Please
          be patient as we receive a high volume of submissions.
        </p>
        <p className={styles.text}>
          Please note: HMF takes place at Camp Walden approximately 3 hours away
          from Toronto and 2 from Ottawa, and we do not provide transportation.
        </p>

        <ArtistSubmissionForm />
      </div>
    </main>
  );
}

import styles from './ArtistSubmissions.module.scss';
import ArtistSubmissionForm from './ArtistSubmissionForm/ArtistSubmissionForm';

export default function ArtistSubmission() {
  const year = new Date().getFullYear();
  const nextYear = year + 1;
  return (
    <main>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Artist Submissions</h2>
        <p className={styles.text}>
          Welcome to the Highlands Music Festival Artist Submission form!
        </p>
        <p className={styles.text}>
          {/* We accept submissions all year round, however submissions must be
          received by January 31 in order to be considered for the following
          year’s Festival. */}
          Submissions for {year} are now closed. Stay tuned for more info about
          HMF {nextYear} submission deadlines.
        </p>
        {/* <p className={styles.text}> */}
        {/* HMF {year} will take place on Sept 25-28. We will notify you with any
          further questions or confirmation. Please be patient as we receive a
          high volume of submissions. */}
        {/* We will notify you with any further questions or confirmation. Please
          be patient as we receive a high volume of submissions. */}
        {/* </p> */}
        {/* <p className={styles.text}> */}
        {/* Please note: HMF takes place at Camp Walden approximately 3 hours away */}
        {/* from Toronto and 2 from Ottawa, and we do not provide transportation. */}
        {/* </p> */}

        {/* <ArtistSubmissionForm /> */}
      </div>
    </main>
  );
}

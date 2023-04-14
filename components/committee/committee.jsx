import Layout from '../layout';
import styles from './committee.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

const CommitteeMember = ({ name, jobTitle, image }) => {
  const firstName = name?.split(' ')[0].toLowerCase();
  return (
    <div className={styles.memberContainer}>
      <div className={clsx(styles.imageContainer)}>
        {image && (
          <Image
            src={image.url}
            alt={image.description}
            className={clsx(styles.memberImage, styles[firstName])}
            quality={50}
            width={image.width}
            height={image.height}
          />
        )}
      </div>
      <div className={styles.textContainer}>
        <p className={styles.subHeadingHeavy}>{name}</p>
        <p className={styles.bodyCopy}>{jobTitle}</p>
      </div>
    </div>
  );
};
export default function Committee({
  committeeMembers: {
    foundingMembersCollection: { items: foundingMembers },
    friendsOfHighlandsCollection: { items: friendsOfHighlands },
  },
}) {
  return (
    <Layout>
      <main>
        <div className={styles.committeePage}>
          <h1 className={styles.heading}>Founding Members</h1>
          <div className={styles.committeeMembers}>
            {foundingMembers.map(committeeMemberData => (
              <CommitteeMember
                {...committeeMemberData}
                key={committeeMemberData.name}
              />
            ))}
          </div>
          <h3 className={styles.heading}>Friends of Highlands</h3>
          <div className={styles.committeeMembers}>
            {friendsOfHighlands.map(committeeMemberData => (
              <CommitteeMember
                {...committeeMemberData}
                key={committeeMemberData.name}
              />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}

import Layout from '../layout';
import styles from './committee.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import Takeover from 'components/takeover/takeover';
import { useState } from 'react';

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
            placeholder="blur"
            blurDataURL={image.url}
          />
        )}
      </div>
      <div className={styles.textContainer}>
        <p className={styles.subHeadingHeavy}>{name}</p>
        {jobTitle && <p className={styles.bodyCopy}>{jobTitle}</p>}
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
  const [showTakeover, setShowTakeover] = useState(false);
  return (
    <main>
      <div className={styles.committeePage}>
        {showTakeover && (
          <Takeover
            modalClassNames={styles.takeover}
            handleClose={() => setShowTakeover(false)}
          >
            <h2 className={styles.storyHeading}>How Highlands Was Created</h2>
            <p>
              At the peak of the pandemic... and at the worst possible time,
              Pulver gave Sol (one of the owners of Camp Walden) an idea. Sol
              stewed on it for too long until finally it took hold. Sol turned
              his attention to putting an all-star team of dedicated young
              people together... not to work for Highlands but to Co-Create it!
              Sol texted Sammy. Sammy got really excited which showed Sol that
              Pulver wasn’t so crazy after-all. Danielle and Amanda who work
              with Sol insisted we call Orry and Brooke. Sol grabbed capable
              cousins Toby and Josh which made our 9-person co-creator team
              complete! People said… “if you build it, they will come.” But Sol
              called Corey to help that along! Early Bird tickets sold fast,
              Josh had a baby, and here we are… ready for the 3rd Annual
              Highlands Music Festival!
            </p>
          </Takeover>
        )}
        <h1 className={styles.heading}>Co-Creators</h1>
        <button
          className={styles.readOurStoryButton}
          onClick={() => setShowTakeover(true)}
        >
          <span className={styles.underline}>Click here</span> to read our story
        </button>
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
  );
}

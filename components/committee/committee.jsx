import Layout from '../layout';
import styles from './committee.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

const committeeData = [
  {
    name: 'Sammy Steiner',
    title: 'The Music',
    Img: () => (
      <Image
        src="/committeeMembers/sammy.jpg"
        placeholder="blur"
        alt=""
        className={clsx(styles.memberImage, styles.sammy)}
        width={708}
        height={944}
        blurDataURL="/committeeMembers/sammy.jpg"
        priority
      />
    ),
  },
  {
    name: 'Toby Gottlieb',
    title: 'Is this mic on?',
    Img: () => (
      <Image
        src="/committeeMembers/toby.jpg"
        placeholder="blur"
        alt=""
        className={clsx(styles.memberImage, styles.toby)}
        width={1184}
        height={789}
        blurDataURL="/committeeMembers/toby.jpg"
        priority
      />
    ),
  },

  {
    name: 'Amanda Black',
    title: 'That Camp Feelin',
    Img: () => (
      <Image
        src="/committeeMembers/amanda.jpg"
        placeholder="blur"
        alt=""
        className={styles.memberImage}
        width={944}
        height={710}
        blurDataURL="/committeeMembers/amanda.jpg"
        priority
      />
    ),
  },
  {
    name: 'Danielle Zelikovitz',
    title: 'Who needs tickets?',
    Img: () => (
      <Image
        src="/committeeMembers/danielle.jpg"
        placeholder="blur"
        alt=""
        className={clsx(styles.memberImage, styles.danielle)}
        width={944}
        height={708}
        blurDataURL="/committeeMembers/danielle.jpg"
      />
    ),
  },
  {
    name: 'Brooke Rudman',
    title: 'Beautiful Branding',
    Img: () => (
      <Image
        src="/committeeMembers/brooke.jpeg"
        placeholder="blur"
        alt=""
        className={styles.memberImage}
        width={944}
        height={710}
        blurDataURL="/committeeMembers/brooke.jpeg"
      />
    ),
  },
  {
    name: 'Orry Mevorach',
    title: "Food Trucks, Drugs, and Rock 'n Roll",
    Img: () => (
      <Image
        src="/committeeMembers/orry.jpg"
        placeholder="blur"
        alt=""
        className={clsx(styles.memberImage, styles.orry)}
        width={944}
        height={757}
        blurDataURL="/committeeMembers/orry.jpg"
      />
    ),
  },
  {
    name: 'Sol Birenbaum',
    title: 'The Big Talker',
    Img: () => (
      <Image
        src="/committeeMembers/sol.jpeg"
        placeholder="blur"
        alt=""
        className={clsx(styles.memberImage, styles.sol)}
        width={944}
        height={649}
        blurDataURL="/committeeMembers/sol.jpeg"
      />
    ),
  },
  {
    name: 'Steven Pulver',
    title: 'The Visionary',
    Img: () => (
      <Image
        src="/committeeMembers/steven.jpg"
        alt=""
        className={clsx(styles.memberImage, styles.sol)}
        width={944}
        height={710}
      />
    ),
  },
  {
    name: 'Corey Raubvogel',
    title: 'The Friendly Hustler',
    Img: () => (
      <Image
        src="/committeeMembers/Corey.png"
        alt=""
        className="memberImage"
        width={944}
        height={710}
      />
    ),
  },
];

const CommitteeMember = ({ name, title, Img }) => (
  <div className={styles.memberContainer}>
    <div className={styles.imageContainer}>{Img && <Img />}</div>
    <div className={styles.textContainer}>
      <p className={styles.subHeadingHeavy}>{name}</p>
      <p className={styles.bodyCopy}>{title}</p>
    </div>
  </div>
);
export default function Committee() {
  return (
    <Layout>
      <main>
        <div className={styles.committeePage}>
          <h1 className={styles.heading}>Who We Are</h1>
          <div className={styles.committeeMembers}>
            {committeeData.map(committeeMemberData => (
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

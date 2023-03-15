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
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/sammy.jpg"
        alt=""
        className={clsx(styles.memberImage, styles.sammy)}
        width={708}
        height={944}
      />
    ),
  },
  {
    name: 'Toby Gottlieb',
    title: 'Is this mic on?',
    Img: () => (
      <Image
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/toby.jpg"
        alt=""
        className={clsx(styles.memberImage, styles.toby)}
        width={1184}
        height={789}
      />
    ),
  },

  {
    name: 'Amanda Black',
    title: 'That Camp Feelin',
    Img: () => (
      <Image
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/amanda.jpg"
        alt=""
        className={styles.memberImage}
        width={944}
        height={710}
      />
    ),
  },
  {
    name: 'Danielle Zelikovitz',
    title: 'Who needs tickets?',
    Img: () => (
      <Image
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/danielle.jpg"
        alt=""
        className={clsx(styles.memberImage, styles.danielle)}
        width={944}
        height={708}
      />
    ),
  },
  {
    name: 'Brooke Rudman',
    title: 'Beautiful Branding',
    Img: () => (
      <Image
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/IMG_1545.jpg"
        alt=""
        className={styles.memberImage}
        width={944}
        height={710}
      />
    ),
  },
  {
    name: 'Orry Mevorach',
    title: "Food Trucks, Drugs, and Rock 'n Roll",
    Img: () => (
      <Image
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/orry.jpg"
        alt=""
        className={clsx(styles.memberImage, styles.orry)}
        width={944}
        height={757}
      />
    ),
  },
  {
    name: 'Sol Birenbaum',
    title: 'The Big Talker',
    Img: () => (
      <Image
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/sol.jpeg"
        alt=""
        className={clsx(styles.memberImage, styles.sol)}
        width={944}
        height={649}
      />
    ),
  },
  {
    name: 'Steven Pulver',
    title: 'The Visionary',
    Img: () => (
      <Image
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/steven.jpg"
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
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/Corey.png"
        alt=""
        width={944}
        height={710}
        className="memberImage"
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

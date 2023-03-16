import Layout from '../layout';
import styles from './committee.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import Sammy from 'public/committeeMembers/sammy.jpg';
import Toby from 'public/committeeMembers/toby.jpg';
import Amanda from 'public/committeeMembers/amanda.jpg';
import Danielle from 'public/committeeMembers/danielle.jpg';
import Brooke from 'public/committeeMembers/brooke.jpeg';
import Orry from 'public/committeeMembers/orry.jpg';
import Sol from 'public/committeeMembers/sol.jpeg';
import Steven from 'public/committeeMembers/steven.jpg';
import Corey from 'public/committeeMembers/Corey.png';

const committeeData = [
  {
    name: 'Sammy Steiner',
    title: 'The Music',
    Img: () => (
      <Image
        src={Sammy}
        alt=""
        className={clsx(styles.memberImage, styles.sammy)}
        priority
        quality={50}
      />
    ),
  },
  {
    name: 'Toby Gottlieb',
    title: 'Is this mic on?',
    Img: () => (
      <Image
        src={Toby}
        alt=""
        className={clsx(styles.memberImage, styles.toby)}
        priority
        quality={50}
      />
    ),
  },

  {
    name: 'Amanda Black',
    title: 'That Camp Feelin',
    Img: () => (
      <Image
        src={Amanda}
        alt=""
        className={styles.memberImage}
        priority
        quality={50}
      />
    ),
  },
  {
    name: 'Danielle Zelikovitz',
    title: 'Who needs tickets?',
    Img: () => (
      <Image
        src={Danielle}
        alt=""
        className={clsx(styles.memberImage, styles.danielle)}
        quality={50}
      />
    ),
  },
  {
    name: 'Brooke Rudman',
    title: 'Beautiful Branding',
    Img: () => (
      <Image src={Brooke} alt="" className={styles.memberImage} quality={50} />
    ),
  },
  {
    name: 'Orry Mevorach',
    title: "Food Trucks, Drugs, and Rock 'n Roll",
    Img: () => (
      <Image
        src={Orry}
        alt=""
        className={clsx(styles.memberImage, styles.orry)}
        quality={50}
      />
    ),
  },
  {
    name: 'Sol Birenbaum',
    title: 'The Big Talker',
    Img: () => (
      <Image
        src={Sol}
        alt=""
        className={clsx(styles.memberImage, styles.sol)}
        quality={50}
      />
    ),
  },
  {
    name: 'Steven Pulver',
    title: 'The Visionary',
    Img: () => (
      <Image
        src={Steven}
        alt=""
        className={clsx(styles.memberImage, styles.sol)}
        quality={50}
      />
    ),
  },
  {
    name: 'Corey Raubvogel',
    title: 'The Friendly Hustler',
    Img: () => (
      <Image src={Corey} alt="" className="memberImage" quality={50} />
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

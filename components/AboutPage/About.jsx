import clsx from 'clsx';
import styles from './About.module.scss';
import { useWindowSize } from 'hooks';
import Image from 'next/image';
import Logo from 'public/Logo-1200px-No-Bkgd-min-small.png';
import Banner from 'public/backgrounds/HL_2023_Logo269.jpg';
import GreenSun from 'public/green-sun-small.png';

import CLEvening from 'public/backgrounds/HL_2023_Logo269-narrow.jpg';
import GuitarNight from 'public/backgrounds/HL_2023_Logo295.jpg';
import Stage from 'public/backgrounds/HL_2023_Logo460.jpg';
import Sax from 'public/backgrounds/HL_2023_Logo17.jpg';
import Backflip from 'public/backgrounds/HL_2023_Logo492.jpg';

export default function About({ festivalDate }) {
  const { isDesktop } = useWindowSize();
  return (
    <main>
      <div className={styles.aboutPageImageContainer}>
        <Image priority src={Banner} alt="" quality={30} />
      </div>
      <div className={styles.aboutWrapper}>
        <Image
          src={Logo}
          alt="Highlands Music Festival logo"
          className={styles.aboutLogo}
          priority
          quality={10}
          width={500}
          height={150}
        />
        <h3 className={clsx(styles.aboutDate, styles.subheading)}>
          Thursday, {festivalDate}
        </h3>
        {isDesktop && (
          <Image
            src={GreenSun}
            alt=""
            className={styles.aboutIcon}
            quality={10}
            width={150}
            height={150}
          />
        )}
        <div className={styles.row}>
          <div className={styles.aboutColumn}>
            <p className={clsx(styles.bodyCopyBold, styles.col1, styles.par1)}>
              Takes place at Camp Walden in the beautiful Haliburton Highlands
            </p>
            <p className={clsx(styles.bodyCopy, styles.aboutAddress)}>
              38483 Highway 28
            </p>
            <p className={clsx(styles.bodyCopy, styles.aboutAddress)}>
              Palmer Rapids, Ontario
            </p>
            <p className={clsx(styles.bodyCopy, styles.aboutAddress)}>
              K0J 2E0, (45.2,-77.44)
            </p>
            <p
              className={clsx(
                styles.bodyCopy,
                styles.col1,
                styles.par3,
                styles.bodyCopyMedium
              )}
            >
              For adults any age who are 19+
            </p>
          </div>
          {/* <ul className={styles.aboutColumn">
              <li className={styles.bodyCopy col2 par1 bodyCopyMedium">
                $425 + Eventbrite Fee + HST Ticket price includes —
              </li>
              <li className={styles.bodyCopy">
                Festival pass (admission to all acts from Friday-Sunday)
              </li>
              <li className={styles.bodyCopy">
                2 nights of basic camp accommodations
              </li>
              <li className={styles.bodyCopy">5 delicious meals</li>
              <li className={styles.bodyCopy">Parking </li>
              <li className={styles.bodyCopy">Access to rural Wi-Fi</li>
              <li className={styles.bodyCopy">Camp activities</li>
            </ul> */}
        </div>

        <div className={styles.row}>
          <div className={styles.aboutColumn}>
            <p className={clsx(styles.bodyCopy, styles.col1, styles.par4)}>
              In the early 1960s, music festivals were a place of social action
              and political dialogue. The times were a changin’ and music was
              its tool. At some of those festivals you could sit on the grass,
              hugging your knees, and be just a few feet away from Bob Dylan and
              Joan Baez. Young people had something to say and with a guitar in
              hand, they would play it and they would say it.
            </p>
            <p className={styles.bodyCopy}>
              Since 1970, and set in Ontario’s beautiful Haliburton Highlands,
              Camp Walden has hosted hundreds of children each year for
              recreational summer programs. With 750 acres including its
              beautiful 100 acre private lake, 50 rustic camper cabins, a
              vaulting Dining Hall, and dozens of natural gathering spaces and
              trails, Walden is aptly named and a haven just 3 hours away from
              Toronto, and 2 from Ottawa.
            </p>
          </div>
          <div className={styles.aboutColumn}>
            <p className={clsx(styles.bodyCopy, styles.col2, styles.par3)}>
              Founded by its 9-person Co-Creator-Team, Highlands is a three-
              night Folk Music getaway celebrating the musical talent of many
              youthful Folk (and Folk’ish!) performances on its 3 stage setup at
              Camp Walden this {festivalDate}. Camp-style meals and basic
              accommodations are provided as part of the one-price- fits-all
              ticket format. With an intentional capacity of just 500, the
              weekend is, by design, meant to be an intimate gathering of music
              lovers looking to reconnect with the outdoors, with community, and
              with the healing power of the arts.
            </p>
            <p className={styles.bodyCopy}>
              The times are changin’ again, and we think young people are worth
              listening to. Won’t you join us?
            </p>
          </div>
        </div>
      </div>
      <div className={styles.imagesRow}>
        {isDesktop && (
          <>
            <Image
              src={Sax}
              alt=""
              width={450}
              // style={{ height: '100%' }}
              quality={50}
            />
            <Image
              src={CLEvening}
              alt=""
              width={450}
              style={{ height: '100%' }}
              quality={50}
            />
            <Image
              src={GuitarNight}
              alt=""
              width={450}
              style={{ height: '100%' }}
              quality={50}
            />
          </>
        )}
        <Image
          src={Backflip}
          alt=""
          width={450}
          style={{ height: '100%' }}
          quality={50}
        />
        <Image
          src={Stage}
          alt=""
          width={450}
          style={{ height: '100%' }}
          quality={50}
        />
      </div>
    </main>
  );
}

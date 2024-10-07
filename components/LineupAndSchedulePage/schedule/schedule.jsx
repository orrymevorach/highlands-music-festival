import styles from './schedule.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import schedule from './schedule.json';
import { useWindowSize } from 'hooks';
import clsx from 'clsx';
import Image from 'next/image';
import largeMusic from 'public/LARGE-MUSIC.jpg';
import scheduleOne from 'public/scheduleOne.jpg';
import scheduleTwo from 'public/scheduleTwo.jpg';

const Schedule = () => {
  const { isDesktop } = useWindowSize();
  return (
    <div className={styles.scheduleWrapper}>
      <h2 className={clsx(styles.heading, styles.scheduleHeading)}>Schedule</h2>
      <div className={styles.row}>
        <Image src={largeMusic} className={styles.poster} />
        <Image src={scheduleOne} className={styles.posterLarge} />
        <Image src={scheduleTwo} className={styles.posterLarge} />
      </div>
      {/* <div className={styles.scheduleContainer}>
        {schedule.map(({ dayOfWeek, dailySchedule }) => (
          <div key={dayOfWeek} className={styles.thirdColumn}>
            <p className={clsx(styles.scheduleDate, styles.subHeadingHeavy)}>
              {dayOfWeek}
            </p>
            {!isDesktop && (
              <>
                <Image
                  src="/green-sun-small.png"
                  alt=""
                  className={styles.greenSun}
                  width={100}
                  height={100}
                  quality={10}
                />
                <Image
                  src="/green-sun-small.png"
                  alt=""
                  className={styles.greenSun}
                  width={100}
                  height={100}
                  quality={10}
                />
              </>
            )}
            {dailySchedule.map(
              ({ startTime, endTime, activity, lineBreak }) => (
                <div
                  key={`${startTime}-${endTime}-${activity}`}
                  className={clsx(
                    styles.scheduleRow,
                    lineBreak ? styles.lineBreak : ''
                  )}
                >
                  <p
                    className={clsx(
                      styles.subHeadingHeavy,
                      styles.scheduleTime
                    )}
                  >
                    {startTime}{' '}
                    {endTime ? (
                      <>
                        <FontAwesomeIcon icon={faMinus} /> {endTime}
                      </>
                    ) : (
                      ''
                    )}
                  </p>

                  <p
                    className={clsx(styles.subheading, styles.scheduleActivity)}
                  >
                    {activity}
                  </p>
                </div>
              )
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Schedule;

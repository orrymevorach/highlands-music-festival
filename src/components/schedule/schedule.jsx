import React from 'react';
import './schedule.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import schedule from './schedule.json';
import { useWindowSize } from '@hooks';
import { GreenSun } from '@images';

const Schedule = () => {
  const { isDesktop } = useWindowSize();
  return (
    <div className="scheduleWrapper">
      <h2 className="heading scheduleHeading">Schedule</h2>
      <div className="scheduleContainer">
        {schedule.map(({ dayOfWeek, dailySchedule }) => (
          <div key={dayOfWeek} className="thirdColumn">
            <p className="scheduleDate subheadingHeavy">{dayOfWeek}</p>
            {!isDesktop && (
              <>
                <GreenSun classNames="greenSun" />
                <GreenSun classNames="greenSun" />
              </>
            )}
            {dailySchedule.map(
              ({ startTime, endTime, activity, lineBreak }) => (
                <div
                  key={`${startTime}-${endTime}-${activity}`}
                  className={`scheduleRow ${lineBreak ? 'lineBreak' : ''}`}
                >
                  {endTime ? (
                    <p className="subheadingHeavy scheduleTime">
                      {startTime} <FontAwesomeIcon icon={faMinus} /> {endTime}
                    </p>
                  ) : (
                    <p className="subheadingHeavy scheduleTime">{startTime}</p>
                  )}
                  <p className="subheading scheduleActivity">{activity}</p>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;

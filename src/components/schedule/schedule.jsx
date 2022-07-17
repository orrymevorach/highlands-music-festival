import React from 'react';
import './schedule.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { imgPath } from '../../utils/constants';
import schedule from './schedule.json';

const Schedule = () => {
  return (
    <div className="scheduleWrapper">
      <h2 className="heading scheduleHeading">Schedule</h2>
      <div className="scheduleContainer">
        {schedule.map(({ dayOfWeek, dailySchedule }) => (
          <div key={dayOfWeek} className="thirdColumn">
            <p className="scheduleDate subheadingHeavy">{dayOfWeek}</p>
            <img
              src={`${imgPath}/Iconography/Iconography-03.png`}
              alt=""
              className="greenSun"
            />
            <img
              src={`${imgPath}/Iconography/Iconography-03.png`}
              alt=""
              className="greenSun"
            />
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

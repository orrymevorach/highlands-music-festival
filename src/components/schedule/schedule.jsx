import React from 'react';
import './schedule.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { imgPath } from '../../utils/constants';

const schedule = [
  {
    dayOfWeek: 'Friday',
    dailySchedule: [
      {
        startTime: '4',
        endTime: '6:30PM',
        activity: 'Arrival',
      },
      {
        startTime: '4',
        endTime: '7:00PM',
        activity: 'Open Activities',
      },
      {
        startTime: '6',
        endTime: '7:15PM',
        activity: 'Dinner',
      },
      {
        startTime: '7:30',
        endTime: '8:15PM',
        activity: 'Opening Act',
      },
      {
        startTime: '8:30',
        endTime: '7:00PM',
        activity: 'Support Act',
      },
      {
        startTime: '10:00',
        endTime: '7:00PM',
        activity: 'Headline Act',
      },
      { startTime: '11:30PM', activity: 'Late Night Snack' },
      {
        startTime: '12:00AM Onwards',
        activity: 'After Party',
      },
    ],
  },
  {
    dayOfWeek: 'Saturday',
    dailySchedule: [
      {
        startTime: '7:00AM',
        activity: 'Meditation at Zen Desk',
      },
      { startTime: '8:00AM', activity: 'Yoga at swim docks' },
      {
        startTime: '9:00AM',
        activity: 'Morning dip in the lake',
      },
      {
        startTime: '8',
        endTime: '9:00AM',
        activity: 'Coffee and muffins',
      },
      {
        startTime: '9',
        endTime: '11:00AM',
        activity: 'Breakfast Buffet',
      },
      { startTime: '', endTime: '', activity: '', lineBreak: true },
      {
        startTime: '6',
        endTime: '7:15PM',
        activity: 'Dinner',
      },
      {
        startTime: '7',
        endTime: '8:15PM',
        activity: 'Opening act',
      },
      {
        startTime: '8:30',
        endTime: '9:30PM',
        activity: 'Supporting act',
      },
      {
        startTime: '10',
        endTime: '11:15PM',
        activity: 'Headline act',
      },
      {
        startTime: '11:00PM',
        activity: 'After party & bonfire',
      },
      { startTime: '11:30PM', activity: 'Late night snack' },
    ],
  },
  {
    dayOfWeek: 'Sunday',
    dailySchedule: [
      {
        startTime: '4',
        endTime: '6:30PM',
        activity: 'Arrival',
      },
      {
        startTime: '4',
        endTime: '7:00PM',
        activity: 'Open Activities',
      },
      {
        startTime: '6',
        endTime: '7:15PM',
        activity: 'Dinner',
      },
      {
        startTime: '7:30',
        endTime: '8:15PM',
        activity: 'Opening Act',
      },
      {
        startTime: '8:30',
        endTime: '7:00PM',
        activity: 'Support Act',
      },
      {
        startTime: '10:00',
        endTime: '7:00PM',
        activity: 'Headline Act',
      },
      { startTime: '11:30PM', activity: 'Late Night Snack' },
      {
        startTime: '12:00AM Onwards',
        activity: 'After Party',
      },
    ],
  },
];

const Schedule = () => {
  return (
    <div className="scheduleWrapper">
      <h2 className="heading scheduleHeading">Schedule</h2>
      <div className="row">
        {schedule.map(({ dayOfWeek, dailySchedule }) => (
          <div key={dayOfWeek} className="thirdColumn">
            <p className="scheduleDate subheadingHeavy">{dayOfWeek}</p>
            {dailySchedule.map(
              ({ startTime, endTime, activity, lineBreak }) => (
                <div
                  key={`${startTime}-${endTime}-${activity}`}
                  className={`row scheduleRow ${
                    lineBreak ? 'lineBreak' : null
                  }`}
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
      <img
        src={`${imgPath}/Iconography/Iconography-03.png`}
        alt=""
        className="greenSun"
      />
    </div>
  );
};

export default Schedule;

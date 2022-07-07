import React from 'react';
import './schedule.scss';

const schedule = [
  {
    dayOfWeek: 'Friday',
    dailySchedule: [
      { startTime: '4', endTime: '6:30PM', activity: 'Arrival' },
      { startTime: '4', endTime: '7:00PM', activity: 'Open Activities' },
      { startTime: '6', endTime: '7:15PM', activity: 'Dinner' },
      { startTime: '7:30', endTime: '8:15PM', activity: 'Opening Act' },
      { startTime: '8:30', endTime: '7:00PM', activity: 'Support Act' },
      { startTime: '10:00', endTime: '7:00PM', activity: 'Headline Act' },
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
      { startTime: '7:00AM', activity: 'Meditation at Zen Desk' },
      { startTime: '8:00AM', activity: 'Yoga at swim docks' },
      { startTime: '9:00AM', activity: 'Morning dip in the lake' },
      { startTime: '8', endTime: '9:00AM', activity: 'Coffee and muffins' },
      { startTime: '9', endTime: '11:00AM', activity: 'Breakfast Buffet' },
      { startTime: '6', endTime: '7:15PM', activity: 'Dinner' },
      { startTime: '7', endTime: '8:15PM', activity: 'Opening act' },
      { startTime: '8:30', endTime: '9:30PM', activity: 'Supporting act' },
      { startTime: '10', endTime: '11:15PM', activity: 'Headline act' },
      { startTime: '11:00PM', activity: 'After party & bonfire' },
      { startTime: '11:30PM', activity: 'Late night snack' },
    ],
  },
  {
    dayOfWeek: 'Sunday',
    dailySchedule: [{ startTime: '4', endTime: '6:30PM', activity: 'Arrival' }],
  },
];

const Schedule = () => {
  return (
    <div className="wrapper">
      <h2 className="heading">Schedule</h2>
      <div className="center row">
        {schedule.map(({ dayOfWeek, dailySchedule }) => (
          <div key={dayOfWeek} className="thirdColumn">
            <p className="scheduleDate">{dayOfWeek}</p>
            {dailySchedule.map(({ startTime, endTime, activity }) => (
              <div className="row">
                {endTime ? (
                  <p>
                    {startTime} - {endTime}
                  </p>
                ) : (
                  <p>{startTime}</p>
                )}
                <p>{activity}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;

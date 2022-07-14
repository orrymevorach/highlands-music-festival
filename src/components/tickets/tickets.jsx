import React from 'react';
import { useLoadEvenbriteOnPageLoad } from '@hooks';
import './tickets.scss';

export default function BuyTickets() {
  useLoadEvenbriteOnPageLoad();
  return (
    <div className="widgetWrapper">
      <div id="eventbrite-widget-container-353399967817"></div>
    </div>
  );
}

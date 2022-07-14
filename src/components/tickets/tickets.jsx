import React, { useState } from 'react';
import { useLoadEvenbriteOnPageLoad } from '@hooks';
import './tickets.scss';
import Loader from '@components/loader';

export default function BuyTickets() {
  const [showLoader, setShowLoader] = useState(true);
  setTimeout(() => {
    setShowLoader(false);
  }, 500);

  useLoadEvenbriteOnPageLoad();
  return (
    <div className="widgetWrapper">
      {showLoader && <Loader />}
      <div
        id="eventbrite-widget-container-353399967817"
        className="widget"
      ></div>
    </div>
  );
}

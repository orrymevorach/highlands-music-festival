import React from 'react';
import './announcement.scss';
import { CloseButton } from '@components/icons/icons';

export default function Announcement({ setShowAnnouncement = () => {} }) {
  return (
    <div className="announcement">
      <div className="headlinerAnnouncementContainer fadeIn">
        <CloseButton dark handleClick={() => setShowAnnouncement(false)} />
        <p className="lineOne">Announcing:</p>
        <p className="artist">
          <span>WiILD</span>
          <span>RIVERS</span>
        </p>
      </div>
    </div>
  );
}

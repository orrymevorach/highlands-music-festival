import React from 'react';
import Layout from '@components/layout';
import './activities.scss';
import { colors } from '@utils/constants';
import { GreenSun } from '@images';
import { useWindowSize } from '@hooks';

export default function Activities() {
  const { isMobile } = useWindowSize();
  return (
    <Layout hasPaddingBottom={false} hamburgerMenuColor={colors.beige}>
      <div className="activitiesPageImageContainer"></div>
      <div className="activitiesWrapper">
        <h2 className="heading">Activities</h2>
        {!isMobile && <GreenSun classNames="activitiesSun" />}
        <div className="activitiesContainer">
          <div className="activitiesCol activitiesCol1">
            <p className="bodyCopyMedium">
              In between performances, take advantage of the many activities
              available on the campgrounds.
            </p>
          </div>
          <ul className="activitiesCol activitiesCol2">
            <li className="bodyCopy activity">Tennis & Basketball</li>
            <li className="bodyCopy activity">Painting, Beading, & Crafts</li>
            <li className="bodyCopy activity">Rock Climbing & Zipline</li>
            <li className="bodyCopy activity">Canoe, Kayak, Sail, and Swim</li>
            <li className="bodyCopy activity">Yoga & Fitness Classes</li>
            <li className="bodyCopy activity">Waterski</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
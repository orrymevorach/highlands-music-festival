import React from 'react';
import Layout from '@components/layout';
import './activities.scss';
import { colors } from '@utils/constants';
import { GreenSun, Hammocks } from '@images';
import { useWindowSize } from '@hooks';

export default function Activities() {
  const { isMobile } = useWindowSize();
  return (
    <Layout hamburgerMenuColor={colors.beige}>
      <main>
        <div className="hammocksContainer">
          <Hammocks />
        </div>
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
              <li className="bodyCopy activity">
                Tennis, Basketball, & Hockey
              </li>
              <li className="bodyCopy activity">Painting, Beading, & Crafts</li>
              <li className="bodyCopy activity">Canoe, Kayak, Sail, & Swim</li>
              <li className="bodyCopy activity">Yoga & Fitness Classes</li>
              <li className="bodyCopy activity">Waterski</li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}

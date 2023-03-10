import Layout from '@components/layout';
import './activities.scss';
import { colors } from 'utils/constants';
import { GreenSun, Hammocks } from '@images';
import { useWindowSize } from 'hooks';

const activities = [
  'Tennis, Basketball, & Hockey',
  'Painting, Beading, & Crafts',
  'Canoe, Kayak, Sail, & Swim',
  'Yoga & Fitness Classes',
  'Waterski',
];

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
              {activities.map(activity => (
                <li key={activity} className="bodyCopy activity">
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}

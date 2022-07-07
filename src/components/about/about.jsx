import React from 'react';
import './about.scss';
import Layout from '../layout';

export default function About() {
  return (
    <Layout>
      <div className="aboutWrapper">
        <div className="left">
          <h1 className="heading">Highlands Music Festival</h1>
          <h3 className="aboutDate">Sept 30 - Oct 2</h3>
          <div className="row">
            <div className="textColumn">
              <div>
                <p>
                  Takes place at Camp Walden in the beautiful Haliburton
                  Highlands
                </p>
                <p>
                  38483 Highway 28 Palmer Rapids, Ontario K0J 2E0, (45.2,-77.44)
                </p>
                <p>For adults any age who are 19+</p>
              </div>

              <p>
                In the early 1960s, music festivals were a place of social
                action and political dialogue. The times were a changin’ and
                music was its tool. At some of those festivals you could sit on
                the grass, hugging your knees, and be just a few feet away from
                Bob Dylan and Joan Baez. Young people had something to say and
                with a guitar in hand, they would play it and they would say it.
              </p>
              <p>
                Since 1970, and set in Ontario’s beautiful Haliburton Highlands,
                Camp Walden has hosted hundreds of children each year for
                recreational summer programs. With 750 acres including its
                beautiful 100 acre private lake, 50 rustic camper cabins, a
                vaulting Dining Hall, and dozens of natural gathering spaces and
                trails, Walden is aptly named and a haven just 3 hours away from
                Toronto, and 2 from Ottawa.
              </p>
            </div>
            <div className="textColumn">
              <div>
                <p>$425 + Eventbrite Fee + HS Ticket price includes —</p>
                <p>Festival pass (admission to all acts from Friday-Sunday)</p>
                <p>2 nights of basic camp accommodations 5 delicious meals</p>
                <p>Parking </p>
                <p>Access to rural Wi-Fi amp activities</p>
              </div>
              <p>
                Founded by its 9-person Co-Creator-Team, Highlands is a two-
                night Folk Music getaway celebrating the musical talent of many
                youthful Folk (and Folk’ish!) performances on its 3 stage setup
                at Camp Walden this September 30 - October 2. Camp-style meals
                and basic accommodations are provided as part of the one-price-
                fits-all ticket format. With an intentional capacity of just
                500, the weekend is, by design, meant to be an intimate
                gathering of music lovers looking to reconnect with the
                outdoors, with community, and with the healing power of the
                arts.
              </p>
              <p>
                The times are changin’ again, and we think young people are
                worth listening to. Won’t you join us?
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

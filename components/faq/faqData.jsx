import styles from './faq.module.scss';

import Link from 'next/link';
import { imgPath } from 'utils/constants';
import clsx from 'clsx';

const linkClassnames = clsx(styles.bodyCopyBold, styles.link);
const containerClassnames = clsx(styles.bodyCopy, styles.answer);

const Anchor = ({ href, children }) => (
  <a href={href} className={linkClassnames} target="_blank" rel="noreferrer">
    {children}
  </a>
);

const List = ({ children }) => <ul className={styles.faqList}>{children}</ul>;

export const faq = [
  {
    question:
      'How do I get there, when should I arrive, and what will the first hour look and feel like?',
    Answer: () => (
      <p className={containerClassnames}>
        Located 2 hours from Ottawa, 3 hours from Toronto, and 4 hours from
        Montreal, the best route to take can be found{' '}
        <Anchor href="https://www.campwalden.ca/guidebook/directions/">
          here
        </Anchor>
        . Enjoy the foliage. Your final half hour is literally a beautiful
        ascent into the Highlands. When you arrive, your vehicle will be greeted
        at our front gate, handed a program, screened by our friendly security
        team, and directed to park. We will assist you with your baggage, check
        you in, show you to your cabin, and invite you to wander the beautiful
        property before dinner. Gates open at 4 pm. Try to arrive no later than
        6:30 (dinner will be delicious!) Gates officially close at 9:00PM (it
        just isn’t safe to drive later than that!) Then the festival is yours to
        discover! Our simple schedule can be found{' '}
        <Link href="/lineup-and-schedule" className={linkClassnames}>
          here
        </Link>
      </p>
    ),
  },
  // {
  //   question: 'Are tickets still available?',
  //   Answer: () => (
  //     <p className={containerClassnames}>
  //       Yes! Those last minute friends of yours should be sent{' '}
  //       <Anchor href="https://www.eventbrite.ca/e/highlands-music-festival-tickets-353399967817">
  //         here
  //       </Anchor>{' '}
  //       here immediately to snag their tickets!
  //     </p>
  //   ),
  // },
  {
    question: 'What are the cabins like?',
    answer:
      'Our cabins are cozy and rustic. There are four walls covered in five decades of camper’s names and memories.  Every cabin has windows, and an A-line tin roof to provide shelter from any storm.  Cabins have beds, running water and a bathroom but there is no central air or heat. In short, they’re simple and perfect.',
  },
  {
    question: 'What is the food situation?',
    answer:
      'Breakfast, lunch, dinner, and desserts will be provided!  Food is camp-chic! Think grilled cheese, poutine, and a loaded salad bar.  Get ready to be blown away by the great music first, and great food second!',
  },
  {
    question: 'Do you accommodate special diets?',
    answer:
      'Yes, please include any dietary restrictions when purchasing your ticket or email us at info@highlandsmusicfestival.ca to notify us of any allergies or dietary restrictions.',
  },
  {
    question: 'What’s the deal with booze and bud?',
    answer:
      "Highlands is for adults-only, and, for the most part, an “all-inclusive” experience.  You will be well fed, programmed, and full of music by the weekend's end.  Alcohol is sold at an inexpensive price from our booze bars throughout the weekend.  As part of our Special Occasions Permit, we must ask you to not bring alcohol on site and of course, that to enjoy responsibly! We also have a special activation brought to you by High Bar.",
  },
  {
    question: 'So do I need cash?',
    answer:
      'In addition to the booze, there’s some cool artists’ merch for sale, as well as a vendor marketplace.  Have a physical credit card handy to support the shopping bug.',
  },
  {
    question: 'What should I pack? ',
    Answer: () => (
      <div className={containerClassnames}>
        <p>
          The weather forecast looks just about perfect, but we want you to come
          prepared for whatever mother nature has in store for us! Walden is
          several degrees cooler at night than in the city and we plan to have
          music that runs late. So pack warm and then pack warmer!
        </p>
        <List>
          <li>
            Bedding: Sheets, comforter/duvet, and pillow. Add a sleeping bag for
            extra warmth. Bed size is 30”x72”
          </li>
          <li>2-3 towels (for the lake and shower)</li>
          <li>
            The usual essentials: toiletries, underwear, socks, comfy clothes,
            etc.
          </li>
          <li>Bathing suit (the lake will call to you!)</li>
          <li>Running shoes + flip flops</li>
          <li>Rainboots + raincoat just in case</li>
          <li>Flashlight</li>
          <li>
            Refillable water bottle! NOTE: Tap water at camp is fresh, filtered
            and delicious! There are water fountains/coolers all around camp to
            keep us hydrated!
          </li>
          <li>
            An orange t-shirt to honour Canada’s National Day for Truth and
            Reconciliation
          </li>
          <li>Optional: Lawn Chair</li>
          <li>Optional: Yoga wear (with layers)</li>
          <li>Optional: Musical Instruments for around the campfire</li>
        </List>
        <p>Please do not pack:</p>
        <List>
          <li>Butane or propane filled appliances</li>
          <li>Lamps</li>
          <li>Candles</li>
          <li>Fire crackers</li>
          <li>Glass containers</li>
          <li>Hair dryers, straighteners, etc.</li>
        </List>
        <p>
          We understand that items may be forgotten and not realized until you
          have arrived… DON’T WORRY….we can help. Please don’t hesitate to speak
          to one of our staff to help accommodate your needs.
        </p>
      </div>
    ),
  },
  {
    question: 'What kind of music am I going to hear at Highlands?',
    Answer: () => (
      <div className={containerClassnames}>
        <p>
          Inspired most-of-all by the festivals of the 1960’s, Highlands sought
          to find young and evolving artists who had something meaningful to say
          and sing about. Highlands is Folk’ish in its broadest sense. Get ready
          to sway… to cheer… to sing along… to ponder… with today’s amazingly
          talented musicians at one of our three professional stage locations:
        </p>
        <List>
          <li>
            “The CL” - our main stage in the beautiful backyard of camp’s heart
            center - the “Counsellor’s Lounge”
          </li>
          <li>
            “OMNI” - literally means “coming together” - our second stage is in
            Walden’s Musical Theatre
          </li>
          <li>
            The “Amphitheater” - get one-on-one with Highlands
            singer-songwriters in this scenic stage by the lake
          </li>
        </List>
        <p>
          We will all be together on Thursday, Friday, and Saturday night to
          hear our headliners. On Saturday all day it’s a musical choose your
          own adventure. Then join us for a special closing Highland Harmony on
          Sunday before departure!
        </p>
      </div>
    ),
  },
  {
    question: 'Camp activities, really?',
    answer:
      'Yes! While music is the focus of the Highlands experience, maybe between sets you will want to go for a ski (waterski!) or take out a canoe, kayak, or sailboat. Maybe you will want to go for a morning dip after Yoga on the docks. Maybe in the heat of the afternoon you’ll want to shoot down the waterslide into our glorious freshwater private lake. Make a bracelet for a friend, climb the bouldering wall, grab a friendly tennis or basketball game under the stadium lights... the site is yours to enjoy all weekend long.',
  },
  {
    question: 'How do I sign up for these camp activities?',
    answer:
      'There’s no need to sign up for anything before you arrive. Activities will be offered to suit the needs of the group and the weather throughout the weekend. You will have plenty of opportunities to enjoy what inspires you in the moment!  Do a little yoga… take a dip… experience hours of music… go for a ski… play a game of tennis… read a book… Highlands is truly yours to enjoy in your own way!',
  },
  {
    question: 'Are there any camp rules I should be aware of?',
    Answer: () => (
      <div className={containerClassnames}>
        <p>
          Yes, thank you for asking! On arrival you will be asked to sign a{' '}
          <Anchor href={`${imgPath}/waiver-updated.pdf`}>waiver</Anchor>{' '}
          attesting to your understanding and agreement to follow these four
          Highlands Principles.
        </p>
        <List>
          <li>
            Healthy, Safety, Joy, and Welcome: Health and Safety is established
            by establishing clearly defined physical and emotional rules and
            best practices. Highlands is an inclusive community and has no
            tolerance for hate or discrimination. Our goal is for you to feel
            not only safe, but also joyful and welcomed by our community. If you
            do not feel safe, please contact a staff member or security staff.
            Some{' '}
            <Anchor href={`${imgPath}/CAMP+WALDEN+-+PRIVATE+RENTAL+RULES_.pdf`}>
              camp rules
            </Anchor>{' '}
            will be posted on every cabin door. They can be read ahead of time
            here.
          </li>
          <li>
            Mindfulness of Those Around You: Take responsibility for the energy
            you bring into a space. Community isn’t created for participants,
            it’s created by participants.
          </li>
          <li>
            Leave No Trace: Take only photos, leave only footprints! We
            encourage you to plan ahead and come prepared with reusable water
            bottles, rain gear, and a carpool buddy. Please respect the wildlife
            and nature and clean up after yourselves.
          </li>
          <li>
            Respect the Land: Show appreciation and respect for the land we are
            using as well as the surrounding towns of Bancroft, Renfrew,
            Denbigh, and Barry’s Bay on our journeys to and from Highlands.
            Highlands hopes festival goers experience a ‘return to nature’ kind
            of feeling. In encouraging this connection with the land, we
            acknowledge we are on the lands originally belonging to the
            Algonquin and Anishinabewaki nations.
          </li>
        </List>
      </div>
    ),
  },
  {
    question: 'Can you tell me more about the drive?',
    Answer: () => (
      <p className={containerClassnames}>
        The drive to Highlands is a glorious ride! No matter whether you are
        taking the 2 hour drive from Ottawa, Pembroke, and Peterborough, or the
        3 hour drive from Toronto, the final 30 minutes of the journey involves
        a steady incline into the Haliburton Highlands. Nearby towns with a
        hospital and other amenities include Bancroft and Barry’s Bay but the
        area surrounding Highlands is undisturbed… free of any cell phone
        service… serene… and beautiful. We encourage Highland-goers to carpool
        together so that at least one participant has hands free to take
        pictures along the way! Toronto/Peterborough Highlanders might consider
        stopping at Kawartha Dairy on your way up. Our favs are Moose Tracks,
        Cookie Dough and Chocolate Peanut Butter. In the car, check out the{' '}
        <Anchor href="https://open.spotify.com/playlist/4e9OCp4qdmoGAyFbaSgvys?si=sDmWXKAoTNO5mtADvJf8rQ&nd=1">
          Highlands playlist
        </Anchor>{' '}
        to prep your ears for the sweet sounds of the weekend! If you have any
        concerns along the way, please feel free to call the Camp Walden office
        at 1-888-254-4274. Cell phone reception is intermittent/limited so, if
        you do need to call, it is best to do so as you’re passing through
        Bancroft or Denbigh which is about 30 minutes before you reach camp.
      </p>
    ),
  },
  {
    question: 'Can I leave the festival and come back?',
    answer:
      'Plan not to. Highlands is meant to be a brief and immersive experience. We will take care of you, provide for you, and entertain you - and we need you there to participate, cheer, and sing along! We are remote. Reentry will not be permitted and anyways, there’s nowhere to go!',
  },
  {
    question: 'When is check out?',
    answer:
      'Arrival on Thursday is between the hours of 4:00 pm - 6:30 pm. The formal program will end at 1:00 pm on Sunday, but guests will be asked to leave the site no later than 4:00 pm.',
  },
  {
    question:
      'What is the cancellation policy? Is there a ticket refund policy?',
    answer:
      'Tickets are non-refundable. Ticket-holders who wish to transfer their ticket should contact info@highlandsmusicfestival.ca.',
  },
  {
    question: 'What is the COVID philosophy?',
    answer:
      'Highlands takes place in the fresh air of the great outdoors spanning hundreds of acres! Cabins are non-insulated and well-ventilated. If hundreds of people are going to gather, this is surely one of the most healthy ways to do it. Please don’t come if you are actively positive and/or actively sick. While at Highlands, we will respect every person’s hug, mask, and personal space philosophy. Having said that, let’s all try to go a weekend without saying the word “Covid”.',
  },
  {
    question: 'Is there Wi-Fi? Will my cell phone have service?',
    answer:
      'Your cell phone might “catch a text” from intermittent cell service. We kinda hope the idea of leaving your devices in the cabin and fully immersing yourself in the great outdoors excites you. However, we understand that many of us are leaving “real life” in the city and may need to check in. An open Starlink Wi-Fi network will be available throughout the weekend.  For the sake of our office staff who field calls from the city, please let people know you’re off the grid.',
  },
  {
    question: 'Are there lockers?',
    answer:
      'There are small “laptop-sized” lockers available for wallets, devices, and passports.',
  },
  {
    question:
      'Can you tell me more about the accommodations? Are there showers?',
    answer:
      'Think of the summer camps you see in the movies! The writing on the wall… the glorious Dining Hall… that is the type of setting for the Highlands Music Festival. Individual, private, ceramic flush toilets are available all over the camp. Showers are individual stalls in guys, girls, and gender-neutral shower houses. Many will choose to bathe in the lake… and many others might not bathe at all…',
  },
  {
    question:
      'Where can I park? Is it safe to leave my car overnight? And can I drive my car into the campgrounds to drop off my stuff?',
    answer:
      'When you arrive at Highlands Music Festival, our staff will bring you to your parking spot where your car will remain for the duration of the weekend. Our staff will bring all of your belongings to your cabin so you can start to relax & enjoy!',
  },
  {
    question: 'Who are the organizers?',
    Answer: () => (
      <p className={containerClassnames}>
        At the peak of the pandemic... and at the worst possible time, Pulver
        gave Sol an idea. Sol stewed on it for too long and dreamt of putting an
        all-star team of dedicated young people together... not to work for
        Highlands but to Co-Create it! Sol texted Sammy. Sammy got really
        excited which showed Sol that Pulver wasn’t so crazy after-all. Danielle
        and Amanda who work with Sol insisted we call Orry and Brooke. Sol
        grabbed capable cousin’s Toby and Josh which made our 9-person
        co-creator team complete! We are delighted to bring you the Highlands
        Music Festival! Get to know our Co-Creators{' '}
        <Link href="/committee" className={linkClassnames}>
          here.
        </Link>
      </p>
    ),
  },
  {
    question: 'Can I drink the water?',
    answer:
      'Walden’s water source is our soft water lake in a relatively unpopulated and unpolluted part of the country. It undergoes regular testing conducted by certified water treatment operators and is subject to the strictest of standards in Canada. The taste of water varies from city to city based on the makeup of its inactive minerals. Walden’s water is clear, refreshing, and indeed tastes different from your home water. Many bottled waters, although seemingly tasteless, are unregulated, and untested. Yes, drink and enjoy Walden’s water!',
  },
  {
    question: 'What if it rains and/or is cold?',
    answer:
      'Early October is the most beautiful time in the Highlands but it does get chilly and rainy at times. We are ready with a variety of indoor music venues if we need to move the show inside. Pack for all weather conditions including rain and winter coats and heavy sleeping bags.',
  },
  {
    question: 'Can I book a cabin exclusively?',
    answer:
      'We would love for you and your group to buy all the tickets in a cabin! We have spaces with 3 beds or 12 beds.',
  },
  {
    question: 'What about the Pooch?',
    Answer: () => (
      <div className={containerClassnames}>
        <p>Yes, you may have a dog/dogs on site as long as you:</p>
        <List>
          <li>Understand you are responsible for feeding them</li>
          <li>Keep them on a leash</li>
          <li>Provide vaccination proof</li>
          <li>Pick up after them</li>
          <li>Supervise them at all times </li>
          <li>
            Are careful not to let them disturb the wildlife, damage any
            vegetation, or become a nuisance to other people or animals at the
            camp.
          </li>
        </List>
      </div>
    ),
  },

  {
    question: 'What if I have other questions?',
    answer:
      'Please reach out to us at info@highlandsmusicfestival.ca for any questions about the festival!',
  },
  {
    question: 'So… Do I dress like I’m going to Summer Camp or a Festival?',
    answer:
      'Well… Both!!  Bring your Sweatpants and your Swag… your Sparkle and your Swimsuit… your Woolies and your Wacky Clothes!  Just make sure to dress warmly!',
  },
];

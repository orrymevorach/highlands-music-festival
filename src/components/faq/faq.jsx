import React from 'react';
import './faq.scss';
import Layout from '@components/layout';
import { Link } from 'gatsby';
import { imgPath } from '@utils/constants';

const faq = [
  {
    question: 'Can you tell me more about the drive?',
    answer:
      'The drive to Highlands is a glorious ride!  No matter whether you are taking the 2 hour drive from Ottawa, Pembroke, and Peterborough, or the 3 hour drive from Toronto, the final 30 minutes of the journey involves a steady incline into the Haliburton Highlands.  Nearby towns with a hospital and other amenities include Bancroft and Barry’s Bay but the area surrounding Highlands is undisturbed… free of any cell phone service… serene… and beautiful.  We encourage Highland-goers to carpool together so that at least one participant has hands free to take pictures along the way!',
  },
  {
    question: 'Can I leave the festival and come back?',
    answer:
      'Plan not to.  Highlands is meant to be a brief and immersive experience.  We will take care of you, provide for you, and entertain you - and we need you there to participate, cheer, and sing along!  We are remote.  Reentry will not be permitted and anyways, there’s nowhere to go!',
  },
  {
    question: 'When is check in?',
    answer:
      'Arrive between the hours of .... The formal program will end at 1:00PM, and participants are asked to leave the site no later than X.',
  },
  {
    question:
      'What is the cancellation policy? Is there a ticket refund policy?',
    answer:
      'Tickets are non-refundable and non-transferable except by special permission. Ticket-holders who wish to transfer their ticket should contact XXX.',
  },
  {
    question: 'What is the COVID philosophy?',
    answer:
      'Highlands takes place in the fresh air of the great outdoors spanning hundreds of acres! Cabins are non-insulated and well-ventilated. If 500 people are going to gather, this is surely one of the most healthy ways to do it. Please take a rapid test on the morning of your journey and please don’t come if you are actively positive and/or actively sick. While at Highlands, we will respect every person’s hug, mask, and personal space philosophy. Having said that, let’s all try to go a weekend without saying the word “Covid”.',
  },
  {
    question: 'Is there Wi-Fi? Will my cell phone have service?',
    answer:
      'Your cell phone might “catch a text” from intermittent cell service. An open Starlink Wi-Fi network will be available throughout the weekend.',
  },
  {
    question: 'Are there lockers?',
    answer:
      'There are small “laptop-sized” lockers available for wallets, devices, and passports..',
  },
  {
    question: 'What is the schedule?',
    Answer: () => (
      <p className="bodyCopy answer">
        Check out our schedule{' '}
        <Link to="/lineup-and-schedule" className="bodyCopyBold link">
          here
        </Link>{' '}
        for all of the details!
      </p>
    ),
  },
  {
    question: 'What are the accommodations? Are there showers and bathrooms?',
    answer:
      'Think of the summer camps you see in the movies!  The writing on the wall… the glorious Dining Hall… that is the type of setting for the Highlands Music Festival.  Individual, private, ceramic flush toilets are available all over the camp.  Showers are individual stalls in guys, girls, and gender-neutral shower houses.  Many will choose to bathe in the lake… and many others might not bathe at all… ',
  },
  {
    question:
      'Is it all inclusive? Does my ticket come with a camping or parking pass?',
    answer:
      'Yes, all of the essentials are covered in your ticket price: room & board, meals, parking, etc. There will be additional items for sale such as food, beverages, merch, and more that will be available for additional $.',
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
      <div>
        <p className="bodyCopy answer">
          At the peak of the pandemic... and at the worst possible time, Pulver
          gave Sol an idea. Sol stewed on it for too long and dreamt of putting
          an all-star team of dedicated young people together... not to work for
          Highlands but to Co-Create it! Sol texted Sammy. Sammy got really
          excited which showed Sol that Pulver wasn’t so crazy after-all.
          Danielle and Amanda who work with Sol insisted we call Orry and
          Brooke. Sol grabbed capable cousin’s Toby and Josh which made our
          9-person co-creator team complete! We are delighted to bring you the
          Highlands Music Festival!
        </p>
        <p className="committeeHeading subheadingBold">The Committee</p>
        <ul className="committeeMembers">
          <li className="row">
            <p className="bodyCopy name">Brooke</p>
            <p className="bodyCopy">Beautiful Branding</p>
          </li>
          <li className="row">
            <p className="bodyCopy name">Sammy</p>
            <p className="bodyCopy">The Music</p>
          </li>
          <li className="row">
            <p className="bodyCopy name">Orry</p>
            <p className="bodyCopy">Food Trucks, Drugs, and Rock 'n Roll</p>
          </li>
          <li className="row">
            <p className="bodyCopy name">Sol</p>
            <p className="bodyCopy">The Money Man</p>
          </li>
          <li className="row">
            <p className="bodyCopy name">Pulver</p>
            <p className="bodyCopy">The Visionary</p>
          </li>
          <li className="row">
            <p className="bodyCopy name">Toby</p>
            <p className="bodyCopy"></p>
          </li>
          <li className="row">
            <p className="bodyCopy name">Josh</p>
            <p className="bodyCopy"></p>
          </li>
          <li className="row">
            <p className="bodyCopy name">Amanda</p>
            <p className="bodyCopy"></p>
          </li>
          <li className="row">
            <p className="bodyCopy name">Danielle</p>
            <p className="bodyCopy"></p>
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Can I drink the water?',
    answer:
      'Walden’s water source is our soft water lake in a relatively unpopulated and unpolluted part of the country. It undergoes regular testing conducted by certified water treatment operators and is subject to the strictest of standards in Canada. The taste of water varies from city to city based on the makeup of its inactive minerals. Walden’s water is clear, refreshing, and indeed tastes different than your home water. Many bottled waters, although seemingly tasteless, are unregulated, and untested. Yes, drink and enjoy Walden’s water!',
  },
  {
    question: 'What is the food situation?',
    answer:
      'Breakfast, lunch, dinner, and desserts will be provided, with additional food options available for purchase from any of our vendors/partners (details to come).  Food is camp-chic!  Think grilled cheese, poutine, and a loaded salad bar.',
  },
  {
    question: 'Do you accommodate special diets?',
    answer:
      'Yes, please include any dietary restrictions when purchasing your ticket or email us at info@highlandsmusicfestival.com to notify us of any allergies or dietary restrictions.',
  },

  {
    question: 'What kind of music?',
    answer:
      'Inspired most-of-all by the festivals of the 1960’s, Highlands sought to find young and evolving artists who had something meaningful to say and sing about. Highlands is Folk’ish in its broadest sense.',
  },
  {
    question: 'Camp activities, really?',
    answer:
      'Yes! While music is the focus of the Highlands experience, maybe between sets you will want to go for a ski (waterski!) or take out a canoe, kayak, or sailboat. Maybe you will want to go for a morning dip after Yoga on the docks. Maybe in the heat of the afternoon you’ll want to shoot down the waterslide into our glorious freshwater private lake. Make a bracelet for a friend, climb the bouldering wall, grab a friendly tennis or basketball game under the stadium lights... the site is yours to enjoy all weekend long.',
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
    question: 'Don’t see your question here?',
    answer:
      'Please reach out to us at xxx@highlands.com* for any questions about the festival!',
  },
];

export default function FAQ() {
  return (
    <Layout>
      <div className="faqWrapper">
        <h1 className="heading">FAQ</h1>
        <div className="faqContainer">
          {faq.map(({ question, Answer, answer }) => (
            <div className="questionContainer" key={question}>
              <p className="question bodyCopyBold">{question}</p>
              {answer ? (
                <p className="answer bodyCopy">{answer}</p>
              ) : (
                <Answer />
              )}
            </div>
          ))}
          <img
            src={`${imgPath}/Iconography/Iconography-02.png`}
            alt=""
            className="sunIcon"
          />
        </div>
      </div>
    </Layout>
  );
}

import React from 'react';
import Layout from '../layout';
import './committee.scss';
import { StaticImage } from 'gatsby-plugin-image';

const committeeData = [
  {
    name: 'Sammy Steiner',
    title: 'The Music',
    Img: () => (
      <StaticImage
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/sammy.jpg"
        alt=""
        placeholder="blurred"
        className="memberImage sammy"
      />
    ),
  },
  {
    name: 'Josh Gottlieb',
    title: 'Festival Vibes',
    Img: () => (
      <StaticImage
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/josh.jpg"
        alt=""
        placeholder="blurred"
        className="memberImage josh"
      />
    ),
  },
  {
    name: 'Toby Gottlieb',
    title: 'Is this mic on?',
    Img: () => (
      <StaticImage
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/toby.jpg"
        alt=""
        placeholder="blurred"
        className="memberImage toby"
      />
    ),
  },

  {
    name: 'Amanda Black',
    title: 'That Camp Feelin',
    Img: () => (
      <StaticImage
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/amanda.jpg"
        alt=""
        placeholder="blurred"
        className="memberImage"
      />
    ),
  },
  {
    name: 'Danielle Zelikovitz',
    title: 'Who needs tickets?',
    Img: () => (
      <StaticImage
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/danielle.jpg"
        alt=""
        placeholder="blurred"
        className="memberImage danielle"
      />
    ),
  },
  {
    name: 'Brooke Rudman',
    title: 'Beautiful Branding',
    Img: () => (
      <StaticImage
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/brooke.jpg"
        alt=""
        placeholder="blurred"
        className="memberImage"
      />
    ),
  },
  {
    name: 'Orry Mevorach',
    title: "Food Trucks, Drugs, and Rock 'n Roll",
    Img: () => (
      <StaticImage
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/orry.jpg"
        alt=""
        placeholder="blurred"
        className="memberImage orry"
      />
    ),
  },
  {
    name: 'Sol Birenbaum',
    title: 'The Big Talker',
    Img: () => (
      <StaticImage
        src="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/committeeMembers/sol.jpeg"
        alt=""
        placeholder="blurred"
        className="memberImage sol"
      />
    ),
  },
];

const CommitteeMember = ({ name, title, Img }) => (
  <div className="memberContainer">
    <div className="imageContainer">{Img && <Img />}</div>
    <div className="textContainer">
      <p className="subheadingHeavy">{name}</p>
      <p className="bodyCopy">{title}</p>
    </div>
  </div>
);
export default function Committee() {
  return (
    <Layout>
      <main>
        <div className="committeePage">
          <h1 className="heading">Who We Are</h1>
          <div className="committeeMembers">
            {committeeData.map(committeeMemberData => (
              <CommitteeMember
                {...committeeMemberData}
                key={committeeMemberData.name}
              />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}

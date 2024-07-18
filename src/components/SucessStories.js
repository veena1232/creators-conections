import React from 'react';
import './SuccessStories.css';

const creators = [
  {
    image: '/creator1.png',
    name: 'Elon Musk',
    about: 'They have done amazing work in their field. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin suscipit.'
  },
  {
    image: '/creator2.png',
    name: 'Jack Dorsey',
    about: 'They have successfully launched multiple projects. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin suscipit.'
  },
  {
    image: '/creator3.png',
    name: 'Mark Zuckerberg',
    about: 'They have a strong background in their industry. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin suscipit.'
  }
];

const businesses = [
  {
    image: '/business1.png',
    name: 'Tesla',
    about: 'They have partnered with multiple creators. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin suscipit.'
  },
  {
    image: '/business2.png',
    name: 'SpaceX',
    about: 'They have grown significantly through partnerships. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin suscipit.'
  },
  {
    image: '/business3.png',
    name: 'Uber',
    about: 'They are known for innovative business solutions. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin suscipit.'
  }
];

function SuccessStories() {
  return (
    <div className="success-stories">
      <h1>Success Stories</h1>
      <p className='para'>Here are some successful collaborations we've facilitated:
      Our platform has been instrumental in bringing together talented creators and forward-thinking businesses. Through our services, we've seen countless projects come to life, achieving outstanding success and impact in their respective industries.Each story is a testament to the power of collaboration and innovation. From groundbreaking products to transformative services, these partnerships highlight the incredible outcomes that can be achieved when great minds come together.We are proud to share these stories with you, showcasing the remarkable achievements of our community. Explore the profiles below to learn more about the creators and businesses who have made significant strides through our platform.</p>

      <div className="section">
        <h2>Creators</h2>
        <div className="row">
          {creators.map((creator, index) => (
            <div className="box" key={index}>
              <img src={creator.image} alt={creator.name} />
              <h3>{creator.name}</h3>
              <p className="about">{creator.about}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Businesses</h2>
        <div className="row">
          {businesses.map((business, index) => (
            <div className="box" key={index}>
              <img src={business.image} alt={business.name} />
              <h3>{business.name}</h3>
              <p className="about">{business.about}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuccessStories;

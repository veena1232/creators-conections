import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import db from '../firebase'
import SampleImage from '../assests/images/profile.png'; 


function Dashboard() {
    const [contact, setContact] = useState(null);
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const email = user.email;
  
        const usersRef = db.ref('users');
        usersRef.orderByChild('email').equalTo(email).once('value', (snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            const userKey = Object.keys(userData)[0];
            const userContact = userData[userKey];
  
            const creatorsRef = db.ref('contact/creator');
            creatorsRef.orderByChild('email').equalTo(email).once('value', (creatorSnapshot) => {
              const creatorData = creatorSnapshot.val();
              if (creatorData) {
                const creatorId = Object.keys(creatorData)[0];
                const creatorDetails = creatorData[creatorId];
                setContact({ creator: { ...userContact, ...creatorDetails } });
              } else {
                setContact({ creator: userContact }); // If no additional creator data is found
              }
            });
          } else {
            // Handle case where no user data is found
            console.error(`No user data found for email: ${email}`);
          }
        });
      }
    }, []);
  
    if (!contact) {
      return <div className='load'>Loading... <br></br> If you are not submitted the form please submit</div>;

    }
  
    let userType = '';
    if (contact?.creator && contact?.business) {
      userType = 'Creator and Founder';
    } else if (contact?.creator) {
      userType = 'Creator';
    } else if (contact?.business) {
      userType = 'Businessman or Founder';
    }
  
    return (
      <div className="dashboard">

  
        <div className="user-profile d-flex align-items-center">
          <img src={SampleImage} alt="profile" />
          <div><h1 className="h1">Welcome, {contact.creator.username}!</h1></div>
        </div>
  
        <div className="user-type">{userType}</div>
  
        {userType.includes('Creator') ? (
        <div className="user-details">
          <div className="detail">
            <p className="detail-heading">Email:</p>
            <p className="detail-value">{contact.creator.email}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Phone Number:</p>
            <p className="detail-value">{contact.creator.phoneNumber}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Location:</p>
            <div className="detail-value">{contact.creator.location}</div>
          </div>
          <div className="detail">
            <p className="detail-heading">Business Ideas:</p>
            <p className="detail-value">{contact.creator.businessIdeas}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Skills:</p>
            <p className="detail-value">{contact.creator.skills}</p>
          </div>
        </div>
      ) : (
        <div className="user-details">
          <div className="detail">
            <p className="detail-heading">Email:</p>
            <p className="detail-value">{contact.business.email}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Phone Number:</p>
            <p className="detail-value">{contact.business.phoneNumber}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Location:</p>
            <div className="detail-value">{contact.business.location}</div>
          </div>
          <div className="detail">
            <p className="detail-heading">Description:</p>
            <p className="detail-value">{contact.business.description}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Partnership Details:</p>
            <p className="detail-value">{contact.business.partnershipDetails}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Target Audience:</p>
            <p className="detail-value">{contact.business.targetAudience}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Collaboration Goals:</p>
            <p className="detail-value">{contact.business.collaborationGoals}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Headquarters Regions:</p>
            <p className="detail-value">{contact.business.headquartersRegions}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Founded Date:</p>
            <p className="detail-value">{contact.business.foundedDate}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Founders:</p>
            <p className="detail-value">{contact.business.founders}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Operating Status:</p>
            <p className="detail-value">{contact.business.operatingStatus}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Last Funding Type:</p>
            <p className="detail-value">{contact.business.lastFundingType}</p>
          </div>
          <div className="detail">
            <p className="detail-heading">Company Type:</p>
            <p className="detail-value">{contact.business.companyType}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
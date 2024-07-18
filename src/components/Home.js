import React, { useState, useEffect } from 'react';
import '../assests/styles/Home.css';
import SampleImage from '../assests/images/main-img.jpg'; 
import Contact from './Contact';
import db from '../firebase';


function Home() {
    const [creatorList, setCreatorList] = useState([]);
    const [businessList, setBusinessList] = useState([]);
    const [userType, setUserType] = useState({ creator: false, business: false });
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserType(user.userType);
      }
  
      // Fetch and update Creator List
      const creatorsRef = db.ref('creator');
      creatorsRef.on('value', (snapshot) => {
        const creator = snapshot.val();
        if (creator) {
          const creatorArray = Object.keys(creator).map((key) => ({
            id: key,
            ...creator[key],
          }));
          setCreatorList(creatorArray);
        } else {
          setCreatorList([]);
        }
      });
  
      // Fetch and update Business List
      const businessesRef = db.ref('business');
      businessesRef.on('value', (snapshot) => {
        const businesses = snapshot.val();
        if (businesses) {
          const businessArray = Object.keys(businesses).map((key) => ({
            id: key,
            ...businesses[key],
          }));
          setBusinessList(businessArray);
        } else {
          setBusinessList([]);
        }
      });
  
      return () => {
        creatorsRef.off();
        businessesRef.off();
      };
    }, []);
  
    return (
      <div className="container">
        <div className="text-container">
          <div className="text-items">
            <h1>Welcome to Creator Connection</h1>
            <h2>Empowering Creators to Become Founders</h2>
            <p className='text'>Our platform enables individuals to transition from creators to founders by connecting them with early-stage startups.</p>
          </div>
          <div className="image-container">
            <img src={SampleImage} alt="Creator Connection" />
          </div>
        </div>
  
        <div className='table-data'>
        <div className="lists">
          {(userType?.creator || (!userType?.creator && !userType?.business)) && (
            <div className="list-container">
              <h2 className='list-item'>Business List</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Business Ideas</th>
                  </tr>
                </thead>
                <tbody>
                  {businessList.map((business) => (
                    <tr key={business?.id}>
                      <td>{business?.name}</td>
                      <td>{business?.email}</td>
                      <td>{business?.description}</td>
                      <td>{business?.partnershipDetails}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
  
          {(userType?.business || (!userType?.creator && !userType?.business)) && (
            <div className="list-container">
              <h2 className='list-item'>Creator List</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Skills</th>
                    <th>Business Ideas</th>
                  </tr>
                </thead>
                <tbody>
                  {creatorList.map((creator) => (
                    <tr key={creator?.id}>
                      <td>{creator?.name}</td>
                      <td>{creator?.email}</td>
                      <td>{creator?.skills}</td>
                      <td>{creator?.businessIdeas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </div>
      </div>
    );
  }
  
  export default Home;

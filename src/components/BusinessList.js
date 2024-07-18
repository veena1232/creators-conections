// import React, { useState, useEffect } from 'react';
// import { db } from './firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

// function BusinessList() {
//   const [businesses, setBusinesses] = useState([]);

//   useEffect(() => {
//     const fetchBusinesses = async () => {
//       const querySnapshot = await getDocs(collection(db, 'businesses'));
//       setBusinesses(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
//     };
//     fetchBusinesses();
//   }, []);

//   return (
//     <div>
//       <h2>Businesses</h2>
//       <ul>
//         {businesses.map(business => (
//           <li key={business.id}>
//             <h3>{business.name}</h3>
//             <p>{business.description}</p>
//             <p>{business.interest}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default BusinessList;

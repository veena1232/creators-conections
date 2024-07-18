// import React, { useState, useEffect } from 'react';
// import { db } from './firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

// function CreatorList() {
//   const [creators, setCreators] = useState([]);

//   useEffect(() => {
//     const fetchCreators = async () => {
//       const querySnapshot = await getDocs(collection(db, 'creators'));
//       setCreators(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
//     };
//     fetchCreators();
//   }, []);

//   return (
//     <div>
//       <h2>Creators</h2>
//       <ul>
//         {creators.map(creator => (
//           <li key={creator.id}>
//             <h3>{creator.name}</h3>
//             <p>{creator.skills}</p>
//             <p>{creator.businessIdeas}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CreatorList;

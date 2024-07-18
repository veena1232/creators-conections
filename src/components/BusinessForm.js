// import React, { useState } from 'react';


// function BusinessForm() {
//   const [business, setBusiness] = useState({
//     name: '',
//     email: '',
//     description: '',
//     interest: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBusiness({
//       ...business,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newBusinessKey = uuidv4(); // Generate a unique key for each business entry
//     set(ref(db, 'businesses/' + newBusinessKey), business)
//       .then(() => {
//         alert('Business submitted successfully');
//       })
//       .catch((error) => {
//         console.error('Error adding business: ', error);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="name" value={business.name} onChange={handleChange} placeholder="Business Name" required />
//       <input type="email" name="email" value={business.email} onChange={handleChange} placeholder="Business Email" required />
//       <textarea name="description" value={business.description} onChange={handleChange} placeholder="Business Description" required />
//       <input type="text" name="interest" value={business.interest} onChange={handleChange} placeholder="Interest in Creators" required />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default BusinessForm;

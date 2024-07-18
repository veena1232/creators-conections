import React, { useState } from 'react';
import firebase from '../firebase';


function CreatorForm() {
  const [creator, setCreator] = useState({
    name: '',
    email: '',
    skills: '',
    businessIdeas: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreator({
      ...creator,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCreatorKey = uuidv4();
    set(ref(db, 'creators/' + newCreatorKey), creator)
      .then(() => {
        alert('Creator submitted successfully');
      })
      .catch((error) => {
        console.error('Error adding creator: ', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={creator.name} onChange={handleChange} placeholder="Creator Name" required />
      <input type="email" name="email" value={creator.email} onChange={handleChange} placeholder="Creator Email" required />
      <textarea name="skills" value={creator.skills} onChange={handleChange} placeholder="Skills" required />
      <textarea name="businessIdeas" value={creator.businessIdeas} onChange={handleChange} placeholder="Business Ideas" required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreatorForm;

import React, { useState, useEffect } from 'react';
import './Contact.css';
import db from '../firebase';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Modal from './Modal';
import Login from './Login';
import Registration from './Registration';


function Contact() {
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    
    const [creator, setCreator] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        skills: '',
        businessIdeas: '',
        portfolioLinks: '',
        location: '',
        pastProjects: '',
        fundingAmount: '',
        profilePicture: ''
    });

    const [business, setBusiness] = useState({
        name: '',
        email: '',
        description: '',
        partnershipDetails: '',
        targetAudience: '',
        location: '',
        collaborationGoals: '',
        headquartersRegions: '',
        foundedDate: new Date(),
        founders: '',
        operatingStatus: 'active',
        lastFundingType: '',
        companyType: '',
        logo: null,
    });

    const [userType, setUserType] = useState({ creator: false, business: false });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserType(user.userType);
        }
    }, []);

    const handleCreatorChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setCreator((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        } else {
            setCreator((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleBusinessChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setBusiness((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        } else {
            setBusiness((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const handleDateChange = (date) => {
        setBusiness((prevState) => ({
            ...prevState,
            foundedDate: date,
        }));
    };

    const handleCreatorSubmit = (e) => {
        e.preventDefault();
        db.ref('contact/creator').push(creator, (err) => {
            if (err) {
                console.log(err);
            } else {
                alert('Message sent to creator team!');
                setCreator({ name: '', email: '', phoneNumber: '', skills: '', businessIdeas: '', portfolioLinks: '', location: '', pastProjects: '', fundingAmount: '', profilePicture: '' });
            }
        });
    };

    const handleBusinessSubmit = (e) => {
        e.preventDefault();
        db.ref('contact/business').push(business, (err) => {
            if (err) {
                console.log(err);
            } else {
                alert('Message sent to business team!');
                setBusiness({ name: '', email: '', description: '', partnershipDetails: '', targetAudience: '', location: '', collaborationGoals: '', headquartersRegions: '', foundedDate: new Date(), founders: '', operatingStatus: 'active', lastFundingType: '', companyType: '', logo: null });
            }
        });
    };

    const handleClose = () => {
        setShowModal(false);
      };
    
      const handleAuthSuccess = (user) => {
        setUsername(user?.username);
        setUserType(user?.userType);
        setIsAuthenticated(true);
        setShowModal(false);
        // Save authentication state to local storage
        localStorage.setItem('user', JSON.stringify(user));
      };
    

    return (
        <div className="contact-form-container">
             {(!userType.creator && !userType.business) &&(
                <Modal show={true} handleClose={handleClose}>
                {isLogin ? <Login onSuccess={handleAuthSuccess} /> : <Registration onSuccess={handleAuthSuccess} />}
                {isLogin ? (
                  <p>New user? <span onClick={() => setIsLogin(false)} className="toggle-link">Register here</span></p>
                ) : (
                  <p>Already registered? <span onClick={() => setIsLogin(true)} className="toggle-link">Login here</span></p>
                )}
                <h1>Login</h1>
             </Modal>
            )}


            {userType.creator && (
            <form onSubmit={handleCreatorSubmit}>
                <h2 className='text'><i className="fas fa-user"></i> Creator Form</h2>
                <label>
                    Creator Name <span>*</span>
                    <input type="text" name="name" value={creator.name} onChange={handleCreatorChange} placeholder="Creator Name" required />
                </label>
                <label>
                    Creator Email <span>*</span>
                    <input type="email" name="email" value={creator.email} onChange={handleCreatorChange} placeholder="Creator Email" required />
                </label>
                <label>
                    Phone Number <span>*</span>
                    <input type="tel" name="phoneNumber" value={creator.phoneNumber} onChange={handleCreatorChange} placeholder='Creator Number' required />
                </label>
                <label>
                    Skills <span>*</span>
                    <textarea name="skills" value={creator.skills} onChange={handleCreatorChange} placeholder="Skills" required />
                </label>
                <label>
                    Business Ideas <span>*</span>
                    <textarea name="businessIdeas" value={creator.businessIdeas} onChange={handleCreatorChange} placeholder="Business Ideas" required />
                </label>
                <label>
                    Portfolio Links (e.g., website, social media)
                    <textarea name="portfolioLinks" value={creator.portfolioLinks} onChange={handleCreatorChange} placeholder="Portfolio Links (e.g., website, social media)" />
                </label>
                <label>
                    Location <span>*</span>
                    <input type="text" name="location" value={creator.location} onChange={handleCreatorChange} placeholder="Location" required />
                </label>
                <label>
                    Past Projects/Experience
                    <textarea name="pastProjects" value={creator.pastProjects} onChange={handleCreatorChange} placeholder="Past Projects/Experience" />
                </label>
                <label>
                    Funding Amount <span>*</span>
                    <input type="number" name="fundingAmount" value={creator.fundingAmount} onChange={handleCreatorChange} placeholder='Funding Amount' required />
                </label>
                <label>
                    Profile Picture
                    <br/>
                    <input type="file" name="profilePicture" onChange={handleCreatorChange} accept="image/*" />
                </label>
                <div className='d-flex justify-content-center mt-24px'>
                    <input type="submit" value="Submit" />
                </div>
            </form>
    )}

            {userType.business && (
            <form onSubmit={handleBusinessSubmit}> 
                <h2 className='text'><i className="fas fa-briefcase"></i> Business Form</h2>
                <label>
                    Business Name <span>*</span>
                    <input type="text" name="name" value={business.name} onChange={handleBusinessChange} placeholder="Business Name" required />
                </label>
                <label>
                    Business Email <span>*</span>
                    <input type="email" name="email" value={business.email} onChange={handleBusinessChange} placeholder="Business Email" required />
                </label>
                <label>
                    Description <span>*</span>
                    <textarea name="description" value={business.description} onChange={handleBusinessChange} placeholder="Description" required />
                </label>
                <label>
                    Partnership Details
                    <textarea name="partnershipDetails" value={business.partnershipDetails} onChange={handleBusinessChange} placeholder="Partnership Details" />
                </label>
                <label>
                    Target Audience <span>*</span>
                    <textarea name="targetAudience" value={business.targetAudience} onChange={handleBusinessChange} placeholder="Target Audience" required />
                </label>
                <label>
                    Location <span>*</span>
                    <input type="text" name="location" value={business.location} onChange={handleBusinessChange} placeholder="Location" required />
                </label>
                <label>
                    Collaboration Goals
                    <textarea name="collaborationGoals" value={business.collaborationGoals} onChange={handleBusinessChange} placeholder="Collaboration Goals" />
                </label>
                <label>
                    Headquarters Regions <span>*</span>
                    <input type="text" name="headquartersRegions" value={business.headquartersRegions} onChange={handleBusinessChange} placeholder="Headquarters Regions" required />
                </label>
                <label>
                    Founded Date <span>*</span>
                    <DatePicker selected={business.foundedDate} onChange={handleDateChange} required />
                </label>
                <br></br>
                <label>
                    Founders <span>*</span>
                    <textarea name="founders" value={business.founders} onChange={handleBusinessChange} placeholder="Founders" required />
                </label>

                <label className='form-label'>
                    Operating Status <span>*</span>
                    <div style={{marginTop: '20px'}}>
                        <label className='radio-btn'>
                            <input
                                type="radio"
                                name="operatingStatus"
                                value="active"
                                checked={business.operatingStatus === 'active'}
                                onChange={handleBusinessChange}
                            />
                            Active
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="operatingStatus"
                                value="inactive"
                                checked={business.operatingStatus === 'inactive'}
                                onChange={handleBusinessChange}
                            />
                            Inactive
                        </label>
                    </div>
                </label>
                <br/>
                <label>
                    Company Type <span>*</span>
                    <input type="text" name="companyType" value={business.companyType} onChange={handleBusinessChange} placeholder="Company Type" required />
                </label>
                <label>
                    Logo
                    <br/>
                    <input type="file" name="logo" onChange={handleBusinessChange} accept="image/*" />
                </label>
                <div className='d-flex justify-content-center mt-24px'>
                    <input type="submit" value="Submit" />
                </div>
            </form>
            )}
        </div>
    );
}

export default Contact;

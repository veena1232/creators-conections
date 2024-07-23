import React, { useState, useEffect } from 'react';
import './Contact.css';
import db from '../firebase';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

function Contact() {
    const navigate = useNavigate();
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
                navigate('/thankyou');
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
                navigate('/thankyou');
                setBusiness({ name: '', email: '', description: '', partnershipDetails: '', targetAudience: '', location: '', collaborationGoals: '', headquartersRegions: '', foundedDate: new Date(), founders: '', operatingStatus: 'active', lastFundingType: '', companyType: '', logo: null });
            }
        });
    };

    return (
        <div className="contact-form-container">
            <form onSubmit={handleCreatorSubmit}>
                <h2 className='text'><i className="fas fa-user"></i> Creator Form</h2>
                <label>
                    Creator Name <span className='red-mark'>*</span>
                    <input type="text" name="name" value={creator.name} onChange={handleCreatorChange} placeholder="Creator Name" required />
                </label>
                <label>
                    Creator Email <span className='red-mark'>*</span>
                    <input type="email" name="email" value={creator.email} onChange={handleCreatorChange} placeholder="Creator Email" required />
                </label>
                <label>
                    Phone Number <span className='red-mark'>*</span>
                    <input type="tel" name="phoneNumber" value={creator.phoneNumber} onChange={handleCreatorChange} placeholder='Creator Number' required />
                </label>
                <label>
                    Skills <span className='red-mark'>*</span>
                    <textarea name="skills" value={creator.skills} onChange={handleCreatorChange} placeholder="Skills" required />
                </label>
                <label>
                    Business Ideas <span className='red-mark'>*</span>
                    <textarea name="businessIdeas" value={creator.businessIdeas} onChange={handleCreatorChange} placeholder="Business Ideas" required />
                </label>
                <label>
                    Portfolio Links (e.g., website, social media)
                    <textarea name="portfolioLinks" value={creator.portfolioLinks} onChange={handleCreatorChange} placeholder="Portfolio Links (e.g., website, social media)" />
                </label>
                <label>
                    Location <span className='red-mark'>*</span>
                    <input type="text" name="location" value={creator.location} onChange={handleCreatorChange} placeholder="Location" required />
                </label>
                <label>
                    Past Projects/Experience
                    <textarea name="pastProjects" value={creator.pastProjects} onChange={handleCreatorChange} placeholder="Past Projects/Experience" />
                </label>
                <label>
                    Funding Amount <span className='red-mark'>*</span>
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

            <form onSubmit={handleBusinessSubmit}> 
                <h2 className='text'><i className="fas fa-briefcase"></i> Business Form</h2>
                <label>
                    Business Name <span className='red-mark'>*</span>
                    <input type="text" name="name" value={business.name} onChange={handleBusinessChange} placeholder="Business Name" required />
                </label>
                <label>
                    Business Email <span className='red-mark'>*</span>
                    <input type="email" name="email" value={business.email} onChange={handleBusinessChange} placeholder="Business Email" required />
                </label>
                <label>
                    Description <span className='red-mark'>*</span>
                    <textarea name="description" value={business.description} onChange={handleBusinessChange} placeholder="Description" required />
                </label>
                <label>
                    Partnership Details
                    <textarea name="partnershipDetails" value={business.partnershipDetails} onChange={handleBusinessChange} placeholder="Partnership Details" />
                </label>
                <label>
                    Target Audience <span className='red-mark'>*</span>
                    <textarea name="targetAudience" value={business.targetAudience} onChange={handleBusinessChange} placeholder="Target Audience" required />
                </label>
                <label>
                    Location <span className='red-mark'>*</span>
                    <input type="text" name="location" value={business.location} onChange={handleBusinessChange} placeholder="Location" required />
                </label>
                <label>
                    Collaboration Goals
                    <textarea name="collaborationGoals" value={business.collaborationGoals} onChange={handleBusinessChange} placeholder="Collaboration Goals" />
                </label>
                <label>
                    Headquarters Regions <span className='red-mark'>*</span>
                    <input type="text" name="headquartersRegions" value={business.headquartersRegions} onChange={handleBusinessChange} placeholder="Headquarters Regions" required />
                </label>
                <label>
                    Founded Date <span className='red-mark'>*</span>
                    <DatePicker selected={business.foundedDate} onChange={handleDateChange} required />
                </label>
                <br></br>
                <label>
                    Founders <span className='red-mark'>*</span>
                    <textarea name="founders" value={business.founders} onChange={handleBusinessChange} placeholder="Founders" required />
                </label>

                <label className='form-label'>
                    Operating Status <span className='red-mark'>*</span>
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
                    Company Type <span className='red-mark'>*</span>
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
        </div>
    );
}

export default Contact;